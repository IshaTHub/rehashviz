"use client";
import { useUploadThing } from "@/utils/uploadthings";
//import { Button } from "@/components/ui/button";
import UploadFormInput from "./upload-form-input";
import { generatePdfSummary } from "@/actions/upload-actions";
import { z } from "zod";
import { Toaster, toast } from "sonner";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Please upload a valid PDF file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "Please upload a valid PDF file"
    ),
});

export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.log("error occurred while uploading", err);
      toast.error("Error occurred while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: ({ data }) => {
      console.log("upload has begun for", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //handle the form submission
    e.preventDefault(); // prevent the default form submission behavior
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File; // so that typescript knows it's a file.
    //console.log(file);

    const validateFields = schema.safeParse({ file }); //it gives us the success or failure
    if (!validateFields.success) {
      //if the file is not valid, we return
      toast.error("❌ Something went wrong", {
        description:
          validateFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file",
      });
      return;
    }

    toast.info("📄 Uploading your PDF...", {
      description: "We are uploading your PDF!",
    });

    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("❌ Something went wrong", {
        description: "Please use a different file",
      });
      return;
    }

    toast.info("📄 Processing your PDF", {
      description: "Hang tight, our AI is reading through your file ✨",
    });
    // validating the fields
    //schema with zod
    //upload the file to uploadthing


    //parse the pdf using langchain
const summary = await generatePdfSummary(resp);
console.log({summary});

    //summarize the pdf using AI
    //save the summary to the database
    //redirect to the [id] summary page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
