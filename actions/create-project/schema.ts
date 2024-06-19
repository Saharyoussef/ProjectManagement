import { z } from "zod";

export const CreateProject = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(3, {
        message: "Title is too short.",
    }),
    
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
    }).min(3, {
        message: "Description is too short.",
    }),
    
    dateEch: z.string({
        required_error: "Due date is required",
        invalid_type_error: "Due date is required",
    }).regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Due date must be in the format YYYY-MM-DD",
    }), 
});
