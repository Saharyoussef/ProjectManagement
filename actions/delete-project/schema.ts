import{z} from"zod";

export const DeleteProject=z.object({
    id:z.string(),
    //pour savoir quel projet on modifie 
});