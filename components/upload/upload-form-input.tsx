"use client"
import { Button } from "../ui/button";
interface UploadFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function UploadFormInput({onSubmit}: UploadFormProps) {
    
  return (
    <div>
     <form action="" className="flex flex-col gap-6 " onSubmit={onSubmit}>
            <input type="file" />
            <Button>Upload your PDF</Button>
        </form>
    </div>
  );
}