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
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="flex flex-col space-y-4">
                <label htmlFor="title" className="font-semibold text-gray-700">Title:</label>
                <FormInput
                    id="title"
                    required
                    placeholder="Enter a project title"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-700"
                />

                <label htmlFor="description" className="font-semibold text-gray-700">Description:</label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter a project description"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-700"
                />

                <label htmlFor="dateEch" className="font-semibold text-gray-700">Due Date:</label>
                <FormInput
                    id="dateEch"
                    type="date"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-700"
                />
                
                <FormPicker
                    id="image"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-700"
                ></FormPicker>
                
                <button
                    type="submit"
                    className="relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
                >
                    <span className="relative text-white font-bold px-8 py-8"> Create Project </span>
                </button>
            </div>
        </form>
    )
}
