import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params}:{params:{cardId:string}}
){
    try{
        const {userId,orgId}=auth();

        if(!userId||!orgId){
            return new NextResponse("Unauthorized",{status:401});
        }

        const card=await db.card.findUnique({
            where:{
                id:params.cardId,
                list:{
                    project:{
                        //orgId,
                    },
                },
            },
            include:{
                list:{
                    select:{
                        title:true,
                    }
                }
            }
        })
    
    return NextResponse.json(card);
    
    }catch(error){
        return new NextResponse("Internal Error",{status:500});
    }
}
//cardId should be the same as the name of the folder otherwise it won't work
//api router is used to fetch a specific card