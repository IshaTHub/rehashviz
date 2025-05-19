"use server";
import { fetchAndExtractdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  summary: string;
  fileUrl: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary({fileUrl, fileName}: {fileUrl: string, fileName: string}
) {
  if (!fileUrl) {
    //error handling
    return {
      success: false,
      message: "File upload failed",
      data: null, //data is of type serverData or it can be text, array, object, etc.
    };
  }


  if (!fileUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractdfText(fileUrl);
    console.log(pdfText);

    let summary: string | undefined;
    try {
      const openAISummary = await generateSummaryFromOpenAI(pdfText);
      summary = openAISummary === null ? undefined : openAISummary;
      console.log({summary});
    } catch (error) {
      console.log("OpenAI Failed:", error);
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log("Generated Summary (Gemini):", summary);
        } catch (geminiError) {
          console.error("Gemini API also failed", geminiError);
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      //returning data for openai
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType): Promise<{ id: number; summary_text: string }> {
  // sql inserting pdf summary
  try {
    const sql = await getDbConnection(); //get db connection
    console.log("Attempting to save PDF summary to DB");
    console.log("Data:", { userId, fileUrl, summary, title, fileName });
    const [savedSummary] =
      await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name) 
    VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) RETURNING id, summary_text`;
    return savedSummary as { id: number; summary_text: string }; //returning the saved summary
  } catch (error) {
    console.error("Failed to save PDF summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  summary,
  fileUrl,
  title,
  fileName,
}: PdfSummaryType) {
  //user is logged in, has a user id
  //savePdfSummary
  //savePdfSummary()
  let savedSummary: { id: number; summary_text: string } | undefined;
  try {
    const { userId } = await auth(); //whenever we want to get the user id from server side ,clerk, we need to use auth()
    console.log("Store PDF Summary Action called with:", {
      summary,
      fileUrl,
      title,
      fileName,
    });
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to store PDF summary. Please try again...",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary.",
    };
  }

  //revalidate our cache
  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "PDF summary stored successfully",
    data: {
      id: savedSummary.id,
    },
  };
}

// Anytime you want to expose a specific funtion in nextjs, as a public http endpoint without having
// to use an API folder , you would need to create a new file and add "use server" directive on top,
// that get exported in the specific file , are infact server actions
