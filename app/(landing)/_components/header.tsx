import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const textFont = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
});

export const Header = () => {
  return (
    <div>
      <div className="flex items-center justify-center flex-col">
      <div className="mb-4 flex items-center border border-neutral-400 shadow-inner p-4 bg-gradient-to-br from-[#f3eff8] to-[#e3d8ee] text-gray-500 rounded-full uppercase">
        <Medal className="h-6 w-6 mr-6 text-gray-500" />
        Your Partner in Project Success
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Welcome To CollabPro
        </h1>

        {/* New Styled Button */}
        <div className="bg-[#e3d8ee] rounded-2xl shadow-sm shadow-[#b1aeb5] outline outline-slate-400 -outline-offset-8">
          <div className="group overflow-hidden relative after:duration-500 before:duration-500 duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 hover:duration-500 after:absolute after:w-24 after:h-24 after:bg-[#e3d8ee] after:rounded-full after:blur-xl after:bottom-32 after:right-16 before:absolute before:w-20 before:h-20 before:bg-[#f3eff8] before:rounded-full before:blur-xl before:top-20 before:right-16 hover:rotate-12 flex justify-center items-center h-40 w-96 bg-gradient-to-r from-[#e3d8ee] to-[#c1a8d8] rounded-2xl outline outline-slate-400 -outline-offset-8">
            <div className="z-10 flex flex-col items-center gap-2">
              <span className="text-white text-6xl font-bold">CollabPro</span>
              <p className="text-gray-500">Collaborate & Conquer</p>
            </div>
          </div>
        </div>
      </div>

      <div className={cn("text-sm md:text-xl text-gray-500 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
        textFont.className,
      )}>
        CollabPro is your go-to tool for managing tasks and projects effortlessly. With a focus on collaboration and productivity, CollabPro ensures that your team can achieve more, together.
      </div>
    </div>
  )
}

export default Header;
