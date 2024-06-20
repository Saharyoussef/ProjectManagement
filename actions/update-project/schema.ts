import{z} from"zod";

export const UpdateProject=z.object({
    title:z.string({
        required_error:"Title is required",
        invalid_type_error:"Title is required",
    }).min(3,{
        message:"Title is too short",
    }),
    id:z.string(),
    //pour savoir quel projet on modifie 
});