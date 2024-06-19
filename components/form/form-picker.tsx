"use client";
import {unsplash} from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Loader2 , Check} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface FormPickerProps{
    id:string;
};

export const FormPicker=({
    id,
}:FormPickerProps)=>{
    const {pending}=useFormStatus();
    const [images, setImages]=useState<Array<Record<string,any>>>([]);
    const [isLoading, setIsLoading]=useState(true);
    const [selectedImageId,setSelectedImageId]=useState(null);

    useEffect(()=>{
        const fetchImages=async()=>{
            try{
                const result=await unsplash.photos.getRandom({
                    collectionIds:["317099"],
                    //it's the id of the official collection of unsplash that is used in trello and it's wallpapers.
                    count:9,
                });

            if(result && result.response){
                const newImages=(result.response as Array<Record<string,any>>);
                setImages(newImages);
            }else{
                console.error("Failed to get images from Unsplash");
            }

            }catch(error){
                console.log(error);
                setImages([]);
            }finally{
                setIsLoading(false);
            }
        };

        fetchImages();
    },[])

    if(isLoading){
        return (
        <div className="p-6 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-sky-700 animate-spin"></Loader2>
        </div>
        );
    }

    return(
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image)=>(
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                            pending && "opacity-50 hover:opacity-50 cursor-auto"
                        )}
                        onClick={()=>{
                            if(pending)return;
                            setSelectedImageId(image.id);
                        }}>

                            {/*<input
                                type="radio"
                                id={id}
                                name={id}
                                className="hidden"
                                checked={selectedImageId===image.id}
                                disabled={pending}
                                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}>
                            </input>*/}
                            {/*on a ajouté input pour que lorsqu'on ajoute un projet on aura l'accées au l'image dans form */}

                            <Image
                                src={image.urls.thumb}
                                alt="Unsplash image"
                                className="object-cover rounded-sm"
                                fill
                            ></Image>
                            
                            {selectedImageId===image.id &&(
                                <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white"></Check>
                                </div>
                            )}
                            {/* cela pour lorsque je clique sur un image elle sera selected */}

                            <Link
                                href={image.links.html}
                                target="_blank"
                                className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underlinep-1 bg-black/50">
                                {image.user.name}
                            </Link>
                             {/*this link is to show the author name of the picture */}
                    </div>
                ))}

            </div>   
        </div>
    )
}