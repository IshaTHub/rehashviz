"use server";
import { fetchAndExtractdfText } from "@/lib/langchain";
// Anytime you want to expose a specific funtion in nextjs, as a public http endpoint without having
// to use an API folder , you would need to create a new file and add "use server" directive on top,
// that get exported in the specific file , are infact server actions

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

  try{    
    const pdfText = await fetchAndExtractdfText(pdfUrl);  
    console.log(pdfText);     
  } catch(err){
    return {
        success: false,
        message: "File upload failed",
        data: null,
      };
  }

}

