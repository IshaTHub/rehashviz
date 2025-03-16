import NavLink from "./nav-link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Header() {
  const isLoggedIn = false;

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
        {isLoggedIn && <Link href={"/#dashboard"}>Your Summaries</Link>}
      </div>

      <div className="flex lg:flex-1 lg:justify-end">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href={"/#upload"}>Upload a PDF</NavLink>
            <div>Pro</div>
            <Button>User</Button>
          </div>
        ) : (
          <div>
            <NavLink href={"/#Sign-in"}>Sign in</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
