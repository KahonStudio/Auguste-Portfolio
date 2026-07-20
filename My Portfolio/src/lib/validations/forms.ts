import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(3, "Please add a subject."),
  message: z.string().min(20, "Please include a bit more detail."),
  type: z.literal("contact"),
});

export const commissionSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  projectType: z.enum(["game", "software", "art", "other"], {
    message: "Select a project type.",
  }),
  budgetRange: z.enum(
    ["under-1k", "1k-5k", "5k-15k", "15k-plus", "undecided"],
    { message: "Select a budget range." },
  ),
  deadline: z.string().optional(),
  brief: z.string().min(40, "Please describe the project in more detail."),
  type: z.literal("commission"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type CommissionInput = z.infer<typeof commissionSchema>;
