"use client";
import { useUploadThing } from "@/utils/uploadthings";
//import { Button } from "@/components/ui/button";
import UploadFormInput from "./upload-form-input";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { z } from "zod";
import { toast } from "sonner"; 
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  const formRef = useRef<HTMLFormElement>(null); //null here means that the formRef is not yet initialized
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
    onUploadBegin: (data) => {
      console.log("upload has begun for", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //handle the form submission
    e.preventDefault(); // prevent the default form submission behavior

    try {
      setIsLoading(true); //when the form is submitted, the loading state is set to true

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
        setIsLoading(false); //when the file is not valid, we set the loading state to false
        return;
      }

      toast.info("📄 Uploading your PDF...", {
        description: "We are uploading your PDF!",
      });

      const uploadResponse = await startUpload([file]);
      if (!uploadResponse) {
        toast.error("❌ Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      toast.info("📄 Processing your PDF", {
        description: "Hang tight, our AI is reading through your file ✨",
      });
      // validating the fields
      //schema with zod
      //upload the file to uploadthing

      const uploadFileUrl = uploadResponse[0].serverData.fileUrl;

      //parse the pdf using langchain
      const result = await generatePdfSummary({
        fileUrl: uploadResponse[0].serverData.fileUrl,
        fileName: file.name
      });

      const { data = null, message = null } = result || {};

      if (data) {
        toast.info("📄 Saving your PDF..", {
          description: "Hang tight, we are saving your summary! ✨",
        });

        if (data.summary) {
          const storedResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: uploadFileUrl,
            title: data.title,
            fileName: file.name,
          });

          if (storedResult?.data?.id) {
            //save the summary to the database
            toast.success("📄 Summary generated!", {
              description:
                "Your summary has been saved and summarized successfully!",
            });

            formRef.current?.reset(); //reset the form

            //redirect to the [id] summary page
            router.push(`/summaries/${storedResult.data.id}`);
          } else {
            toast.error("❌ Failed to save summary", {
              description: storedResult?.message || "Unknown error",
            });
          }
        }
      }

      //summarize the pdf using AI

      
    } catch (error) {
      setIsLoading(false);
      console.error("error occured", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        onSubmit={handleSubmit}
        ref={formRef}
      />
    </div>
  );
}
