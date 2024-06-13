"use client"

import { create } from "@/actions/createProject"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const Form =()=>{
    return (
        <form action={create}>
            <div className="flex flex-col space-y-2">
                <label htmlFor="title">Title:</label>
                <Input
                    id="title"
                    name="title"
                    required
                    placeholder="Enter a project title"
                    className="border-black border p-1"
                />

                <label htmlFor="description">Description:</label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter a project description"
                    className="border-black border p-1"
                />

                <label htmlFor="dateEch">Due Date:</label>
                <Input
                    id="dateEch"
                    name="dateEch"
                    type="date"
                    className="border-black border p-1"
                />
                <Button type="submit">Create Project</Button>    
            </div>
    </form>
    )
}