"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import{ DragDropContext, Droppable} from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
import { toast } from "sonner";

interface ListContainerProps{
    data:ListWithCards[];
    projectId: string;
};

function reorder<T>(list:T[],startIndex:number,endIndex:number){
    const result=Array.from(list);
    const [removed]=result.splice(startIndex,1);
    result.splice(endIndex,0,removed);
    return result;
}



export const ListContainer=({
    data,
    projectId,
}:ListContainerProps)=>{
    
    const[orderedData,setOrderedData]=useState(data);
    //to store the data inside a state

    const{execute:executeUpdateListOrder}=useAction(updateListOrder,{
        onSuccess:()=>{
            toast.success("List Reordered");
        },
        onError:(error)=>{
            toast.error(error);
        },
    });

    const{execute:executeUpdateCardOrder}=useAction(updateCardOrder,{
        onSuccess:()=>{
            toast.success("Task Reordered");
        },
        onError:(error)=>{
            toast.error(error);
        },
    });

    useEffect(()=>{
        setOrderedData(data);
    },[data])

    //with drag and drop we should have a good optimistic mutation
    // so that's why we used optimistic update
    //when the data updates we will change the setOrderedData

    const onDragEnd=(result:any)=>{
        const{destination,source,type}=result;

        if(!destination){
            return;
        }

        //if dropped in the same position
        if(
            destination.droppableId===source.droppableId &&
            destination.index===source.index
        ){
            return;
        }

        //User moves a list
        if(type==="list"){
            const items=reorder(
                orderedData,
                source.index,
                destination.index,
            ).map((item,index)=>({...item,order:index}));
            setOrderedData(items);
            executeUpdateListOrder({items,projectId});
            //user peut déplacer liste mais quand on rafraichit page elle retourne à sa position initiale
            //on doit intégrer coté serveur
            //do:trigger server action 
        }

        //User moves a card
        if(type==="card"){
            let newOrderedData=[...orderedData];

            //source and destination list
            const sourceList=newOrderedData.find(list=>list.id===source.droppableId)
            const destList=newOrderedData.find(list=>list.id===destination.droppableId);

            if(!sourceList||!destList){
                return;
            }

            //Check if cards exists on the sourceList
            if(!sourceList.cards){
                sourceList.cards=[];
            }

            //check if cards exists on the destList
            if(!destList.cards){
                destList.cards=[];
            }

            //Moving the card in the same list
            if(source.droppableId===destination.droppableId){
                const reorderedCards=reorder(
                    sourceList.cards,
                    source.index,
                    destination.index,
                );

                reorderedCards.forEach((card,idx)=>{
                    card.order=idx;
                });

                sourceList.cards=reorderedCards;
                setOrderedData(newOrderedData);
                //do:trigger Server action
                executeUpdateCardOrder ({
                    projectId:projectId,
                    items:reorderedCards,
                })

                //User moves the card to another list

            }else{
                //remove card from the source list
                const[movedCard]=sourceList.cards.splice(source.index,1);

                //assign the new listId to the moved card
                movedCard.listId=destination.droppableId;

                //add card to the destination list
                destList.cards.splice(destination.index,0,movedCard);

                sourceList.cards.forEach((card,idx)=>{
                    card.order=idx;
                });

                //update the order for each card in the destination list
                destList.cards.forEach((card,idx)=>{
                    card.order=idx;
                });

                setOrderedData(newOrderedData);
                //do:trigger server action
                executeUpdateCardOrder({
                    projectId:projectId,
                    items:destList.cards,
                })
            }       
        }
    }
    return(

        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided)=>(
                    <ol 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full">
                        {orderedData.map((list,index)=>{
                            return(
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    data={list}>
                                </ListItem>
                            )
                        })}
                        {provided.placeholder}
                        <ListForm></ListForm>
                        <div className="flex-shrink-0 w-1"></div>
                    </ol>   
                )}
            </Droppable>       
        </DragDropContext>
    )
}