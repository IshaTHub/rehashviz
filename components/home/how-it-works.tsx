import { ReactNode } from "react";
import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={48} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description: "Simply drag and drop your PDF or click to upload",
  },
  {
    icon: <BrainCircuit size={48} strokeWidth={1.5} />,
    label: "AI Analysis",
    description:
      "Our advanced AI will analyze and processes your document instantly",
  },
  {
    icon: <FileOutput size={48} strokeWidth={1.5} />,
    label: "Get summary",
    description: "Receive a concise summary of your document in seconds",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto 
      px-4 sm:px-6 lg:px-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-0 transform-gpu overflow-hidden blur-3xl "
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%,80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.3% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.1%, 97.7% 44.1%)",
            }}
          />
        </div>
        <div className="text-center mb-16">
          <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">
            How it Works
          </h2>
          <h3 className="text-bold text-3xl max-w-2xl mx-auto">
            Transforms any PDF into an easy to digest summary in three simple
            steps
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((item, idx) => (
            <div className="relative flex items-stretch" key={idx} >
            <StepItem {...item} />
           {idx < steps.length -1 &&  ( <div className="hidden md:block top-1/2 -right-4 absolute transform -translate-y-1/2 z-10">
                <MoveRight size={32} strokeWidth={1} className="text-rose-400"></MoveRight>
            </div>
            )}
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <div className=" relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors group w-full">
      <div className="flex flex-c0l gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from rose-500/10 transition-colors">
          <div className="text-rose-500">{icon} </div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
        <h4 className="text-center font-bold text-xl">{label}</h4>
        <p className="text-center text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
