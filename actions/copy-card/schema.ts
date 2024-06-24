import{z} from"zod";

export const CopyCard=z.object({
    id:z.string(),
    //pour savoir quel projet on modifie 
    projectId:z.string(),
}); 