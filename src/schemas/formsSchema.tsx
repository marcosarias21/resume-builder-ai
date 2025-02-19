import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string(),
  address: z.string().optional()
})


export const summarySchema = z.object({
  summery: z.string()
})