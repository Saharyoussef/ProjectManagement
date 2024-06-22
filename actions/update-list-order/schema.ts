import{z} from"zod";

export const UpdateListOrder=z.object({
    items:z.array(
        z.object({
            id:z.string(),
            title:z.string(),
            order:z.number(),
            createdAt:z.date(),
            updatetAt:z.date(),
        }),
    ),
    projectId:z.string(),
    //pour savoir quel projet on modifie 
});