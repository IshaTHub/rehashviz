// Anytime you want to expose a specific funtion in nextjs, as a public http endpoint without having
// to use an API folder , you would need to create a new file and add "use server" directive on top,
// that get exported in the specific file , are infact server actions

"use server";
import { fetchAndExtractdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(
  uploadResponse: [
    {
      // uploadResponse is of type serverData
      serverData: {
        userId: string;
        file: {
          url: string; //needed so that we can show to the user
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    //error handling
    return {
      success: false,
      message: "File upload failed",
      data: null, //data is of type serverData or it can be text, array, object, etc.
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0]; //retrieving the data from the serverData

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractdfText(pdfUrl);
    console.log(pdfText);

    let summary;

    try {
      const summary = await generateSummaryFromOpenAI(pdfText);
      console.log(summary);
    } catch (error) {
      console.log(error);
      //call gemini code
    }

    if (!summary) {
      return {
        success: false,
        message: "failed to generate summary",
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}
