import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").notNull().default("draft"), // draft, in_progress, completed
  storyBoard: json("story_board"), // Optional storyboard data
  mulmoScript: text("mulmo_script"), // Generated or user-created script
  chatHistory: json("chat_history").array(), // AI chat messages
  mediaAssets: json("media_assets"), // Audio, images, translations for each beat
  finalOutputs: json("final_outputs"), // Podcast, video, slideshow, PDF
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
