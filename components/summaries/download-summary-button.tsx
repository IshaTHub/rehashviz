'use client'
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function DownloadSummaryButton({
    title,
    summaryText,
    fileName,
    createdAt,
}: {
    title: string;
    summaryText: string;
    fileName: string;
    createdAt: string;
}) {
    const handleDownload = () => {
        const summaryContent = `# ${title}
 Geneated Summary 
Generated on: ${new Date(createdAt).toLocaleDateString()}
${summaryText}
Orignal File: ${fileName}
Generated by RehashViz
`; 


        const blob = new Blob([summaryContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `Summary-${title.replace(/[^a-zA-Z0-9]/gi, "_")}.txt`;
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    };
 
    return <Button size="sm" className="h-8 px-3 bg-rose-100 text-rose-600 hover:text-red-700
     hover:bg-rose-50"
     onClick={handleDownload}
    
    >
        <Download className="h-4 w-4 mr-1" />
        Download Summary</Button>
    };  