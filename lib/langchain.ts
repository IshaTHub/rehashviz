import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractdfText(fileUrl: string) {
  const response = await fetch(fileUrl); //typically we get json but we can also get blob
  const blob = await response.blob(); //blob is a binary data

  const arrayBuffer = await blob.arrayBuffer(); //arrayBuffer is a binary data which is a buffer of the pdf file. it is used to load the pdf file.

  const loader = new PDFLoader(new Blob([arrayBuffer])); //loader is a pdf loader. what it does is it loads the pdf file and returns a list of documents. As we have remote file, we need to convert it to blob first.

  const docs = await loader.load(); //loads all the documents from the pdf file.

  //combine all pages
  return docs.map((doc) => doc.pageContent).join("\n");
}

//text needed for the summary