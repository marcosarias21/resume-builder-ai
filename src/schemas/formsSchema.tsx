import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  jobTitle: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string(),
  address: z.string().optional()
})


export const summarySchema = z.object({
  summery: z.string()
})

export const skillsSchema = z.object({
  skills: z.array(z.string())
})


export const ProjectsSchema = z.object({
  project: z.array(
    z.object({
    name: z.string(),
    techStack: z.string(),
    listDescription: z.array(z.string())
  }))
})