import{z} from"zod";

export const UpdateCardOrder=z.object({
    items:z.array(
        z.object({
            id:z.string(),
            title:z.string(),
            order:z.number(),
            listId:z.string(),
            createdAt:z.date(),
            updatetAt:z.date(),
        }),
    ),
    projectId:z.string(),
    //pour savoir quel projet on modifie 
});