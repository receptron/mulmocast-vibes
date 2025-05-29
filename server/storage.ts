import { users, type User, type InsertUser, type Project, type InsertProject } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByUser(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private currentUserId: number;
  private currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    
    // Add sample projects for demonstration
    this.initializeSampleProjects();
  }

  private initializeSampleProjects() {
    const sampleProjects: Project[] = [
      {
        id: 1,
        title: 'AI in Healthcare',
        description: 'Exploring the impact of AI on modern healthcare',
        thumbnail: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3',
        userId: 1,
        createdAt: new Date('2024-05-20'),
        status: 'in_progress',
        storyBoard: null,
        mulmoScript: 'Introduction to AI in Healthcare...',
        chatHistory: [],
        mediaAssets: null,
        finalOutputs: null
      },
      {
        id: 2,
        title: 'Climate Change Solutions',
        description: 'Innovative approaches to addressing climate change',
        thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3',
        userId: 1,
        createdAt: new Date('2024-05-19'),
        status: 'draft',
        storyBoard: null,
        mulmoScript: null,
        chatHistory: [],
        mediaAssets: null,
        finalOutputs: null
      }
    ];
    
    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
    });
    this.currentProjectId = 3;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByUser(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.userId === userId,
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      id,
      title: insertProject.title,
      description: insertProject.description || null,
      thumbnail: insertProject.thumbnail || null,
      userId: insertProject.userId || null,
      status: insertProject.status || "draft",
      storyBoard: insertProject.storyBoard || null,
      mulmoScript: insertProject.mulmoScript || null,
      chatHistory: insertProject.chatHistory || [],
      mediaAssets: insertProject.mediaAssets || null,
      finalOutputs: insertProject.finalOutputs || null,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      return undefined;
    }
    
    const updatedProject: Project = { ...existingProject, ...updateData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
}

export const storage = new MemStorage();
