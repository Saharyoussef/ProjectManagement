import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    console.log("Logo component rendered"); // Debug log
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden lg:flex">
                <Image 
                    src="/logos.svg"
                    alt="logo"
                    height={30}
                    width={30}
                />
                <p className="text-lg text-neutral-700 pb-1">
                    CollabPro
                </p>
            </div>
        </Link>
    );
};
