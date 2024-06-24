import{z} from"zod";

export const DeleteCard=z.object({
    id:z.string(),
    //pour savoir quel projet on modifie 
    projectId:z.string(),
}); 