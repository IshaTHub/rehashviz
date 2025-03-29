"use client";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
interface UploadFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const UploadFormInput = forwardRef<HTMLFormElement, UploadFormProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <form ref={ref} className="flex flex-col gap-6 " onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            required
            disabled={isLoading}
            className={cn(isLoading && "opacity-50 cursor-not-allowed")}
          />
          <Button disabled={isLoading}>
            {isLoading ? (
              <>
                {" "}
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />Processing...
              </>
            ) : (
              "Upload your PDF"
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput"; // used it so to

export default UploadFormInput;
