import NavLink from "./nav-link";
import { FileText } from "lucide-react";
//import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export default function Header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText
            className="w-6 h-6 lg:w-8 lg:h-8
        text-gray-900 hover:rotate-12 transform transition-all duration-200 ease-in-out"
          />
          <span className="font-extrabold text-xl lg:text-2xl text-gray-900">
            RehashViz
          </span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center lg:gap-12 lg:item-center gap-4">
        <NavLink href={"/#pricing"}>Pricing</NavLink>
        <SignedIn>
          <NavLink href={"/dashboard"}>Your Summaries</NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:flex-1 lg:justify-end">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href={"/upload"}>Upload a PDF</NavLink>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href={"/sign-in"}>Sign in</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
