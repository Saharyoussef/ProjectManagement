import{z} from"zod";

export const CopyList=z.object({
    id:z.string(),
    //pour savoir quel projet on modifie 
    projectId:z.string(),
}); 