import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
export default function HeroSection() {
  return (
    <section>
      <div className="">
        <div className="flex">
          <Badge className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to via-rose-800 animate-gradient-x group">
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p>Powered By AI</p>
          </Badge>
        </div>
        <h1>Transform PDFs into concise summaries</h1>
        <h2>Get a beautiful summary reel of the document in seconds</h2>
        <Button>Try RehashViz</Button>
      </div>
    </section>
  );
}
