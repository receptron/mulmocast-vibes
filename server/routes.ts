import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema } from "@shared/schema";
import multer from "multer";
import { Client } from "@replit/object-storage";

const upload = multer({ storage: multer.memoryStorage() });

// Check if running in Replit environment
const isReplitEnvironment = process.env.REPLIT_DB_URL || process.env.REPL_ID;
let objectStorage: Client | null = null;

// Only initialize object storage in Replit environment
if (isReplitEnvironment) {
  try {
    objectStorage = new Client();
  } catch (error) {
    console.warn('Failed to initialize Replit Object Storage:', error);
    objectStorage = null;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Get all projects for a user (for now, we'll use userId = 1 as default)
  app.get("/api/projects", async (req, res) => {
    try {
      const userId = 1; // In a real app, this would come from authentication
      const projects = await storage.getProjectsByUser(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get a specific project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Create a new project
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  // Update a project
  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const updateData = req.body;
      const updatedProject = await storage.updateProject(projectId, updateData);
      
      if (!updatedProject) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  // File upload endpoint
  app.post("/api/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const file = req.file;
      const projectId = req.body.projectId;

      // Check if object storage is available
      if (!objectStorage) {
        // In local development, return a mock response
        const asset = {
          name: file.originalname,
          url: `/uploads/${Date.now()}-${file.originalname}`, // Local file path
          type: file.mimetype,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        
        console.log('Object storage not available (local development mode)');
        return res.json(asset);
      }

      const fileName = `${projectId}/${Date.now()}-${file.originalname}`;

      // Upload to Object Storage (Replit environment only)
      await objectStorage.uploadFromBytes(fileName, file.buffer);
      
      // Get the URL for the uploaded file
      const url = `https://storage.replit.com/${fileName}`;

      const asset = {
        name: file.originalname,
        url: url,
        type: file.mimetype,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      res.json(asset);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
