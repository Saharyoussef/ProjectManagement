"use client";

type Message = {
  id: string;
  sender: "me" | "receiver";
  content: string;
};

type BodyProps = {
  messages: Message[];
};

const Body = ({ messages }: BodyProps) => {
  return (
    <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages.map((message) => (
        <div key={message.id} className={`p-2 rounded-lg ${message.sender === "me" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default Body;
