import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  jobTitle: z.string().min(1, "Job title is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional()
});


export const summarySchema = z.object({
  summery: z.string().optional()
})

export const skillsSchema = z.object({
  skills: z.array(z.string().min(1,{ message: "Each skills must be had at least one character"})).min(3, {message: "Minimun 3 skills are required"})
})


export const ProjectsSchema = z.object({
  project: z.array(
    z.object({
    name: z.string().min(1, "Project name is required"),
    techStack: z.string().min(1, "Tech stack is required"),
    demo: z.string().optional(),
    repository: z.string().optional(),
    listDescription: z.array(z.string())
  }))
})

export const workSchema = z.object({
  works: z.array(
    z.object({
    position: z.string().min(1),
    workCompany: z.string().min(1),
    start: z.string().min(1),
    end: z.string().min(1),
    summery: z.string().min(1)
  }))
})

export const educationSchema = z.object({
  education: z.array(
    z.object({
      universityName: z.string().min(1),
      degree: z.string(),
      major: z.string(),
      start: z.string().min(1),
      end: z.string().min(1)
    })
  )
})