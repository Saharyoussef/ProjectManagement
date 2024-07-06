"use client";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field can't be empty"
  }),
});

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;
    if (selectionStart !== null) {
      form.setValue("content", value);
    }
  };

  const handleSubmit = (data: z.infer<typeof chatMessageSchema>) => {
    onSendMessage(data.content);
    form.reset();
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-end w-full gap-2"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <TextareaAutosize
                    onKeyDown={async (e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        await form.handleSubmit(handleSubmit)();
                      }
                    }}
                    rows={1}
                    maxRows={3}
                    {...field}
                    onChange={handleInputChange}
                    onClick={handleInputChange}
                    placeholder="Type a message..."
                    className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="icon" type="submit" className="ml-auto">
            <SendHorizonal />
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default ChatInput;
