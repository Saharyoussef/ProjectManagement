"use client"

import { useRouter } from 'next/navigation'; // Make sure to import from 'next/navigation'
import { create } from "@/actions/createProject"
import { FormInput } from "@/components/form/form-input"
import { FormPicker } from "@/components/form/form-picker"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export const Form = () => {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const project = await create(formData);
        router.push(`/project/${project.id}`);
        //pour lorsque je clique sur submit d'un projet il me dérige vers url de ce projet
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
                <label htmlFor="title">Title:</label>
                <FormInput
                    id="title"
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
                <FormInput
                    id="dateEch"
                    type="date"
                    className="border-black border p-1"
                />
                <FormPicker
                    id="image"
                ></FormPicker>
                <Button type="submit">Create Project</Button>
            </div>
        </form>
    )
}
