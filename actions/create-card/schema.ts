import{z} from"zod";

export const CreateCard=z.object({
    title:z.string({
        required_error:"Title is required",
        invalid_type_error:"Title is required",
    }).min(3,{
        message:"Title is too short",
    }),
    projectId:z.string(),
    listId:z.string(),
    //pour savoir quel projet on modifie 
});