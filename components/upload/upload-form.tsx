"use client"
//import { Button } from "@/components/ui/button";
import UploadFormInput from "./upload-form-input";



export default function UploadForm({onSubmit}: UploadFormProps)  {
  const handleSubmit = () => {
    console.log("submit");
  }
  return (
    <div>
        <UploadFormInput onSubmit={handleSubmit}/>
    </div>
  );
}