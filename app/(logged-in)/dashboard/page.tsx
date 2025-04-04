import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summaries";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();  //clerk user
  const userId = user?.id;
  if (!userId) {
    redirect("/sign-in");
  }

  const uploadLimit = 5;
  const summaries = await getSummaries(userId);

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emrald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-800">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise summaries with ease.
              </p>
            </div>

            <Button
              variant={"link"}
              className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600
           hover:to-rose-800 text-white hover:scale-105 transition-all duration-300 group hover:no-underline"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="bg-rose-50 boreder border-rose-200 rounded-lg p-4 text-rose-800">
            <div className="mb-6">
              <p className="text-sm">
                You have reached a limit of {uploadLimit} summaries on the basic
                plan{" "}
                <Link
                  href="/#pricing"
                  className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center gap-1"
                >
                  Upgrade to Pro <ArrowRight className="w-4 h-4 inline-block" />{" "}
                  for unlimited uploads{" "}
                </Link>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary, index) => (
              <SummaryCard key={index} summary={summary} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
