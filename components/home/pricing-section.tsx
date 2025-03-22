import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckIcon, IndianRupee, ArrowRight } from "lucide-react";
type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
};

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 299,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard Processing Speed",
      "Email support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    description: "For professionals and teams",

    items: [
      "Unlimited PDF summaries",

      "Priority processing",

      "24/7 priority support",

      "Markdown Export",
    ],
    paymentLink: "",

    priceId: "",
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
      <div
        className={cn(
          "flex flex-col gap-4 h-full lg-gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-xl lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <div className="text-xs uppercase font-semibold">Rs</div>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} className="" />
              <span>{item}</span>
            </li>
          ))}
        </div>
        <div className="space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink}
            className={cn('w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2',
            id === "pro" ? 'border-rose-900' : 'border-rose-500 from-rose-400 to-rose-500')}
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div
        className="py-12 lg:py-24 max-w-5x1 mx-auto px-4 sm:px-6
           lg:px-8 lg:pt-12"
      >
        <div className="flex text-center justify-center w-full pb-2">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">Pricing</h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
