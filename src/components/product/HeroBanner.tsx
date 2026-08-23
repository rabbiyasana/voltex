import {
    RotateCcw,
    Shield,
    Truck,
} from "lucide-react";

function HeroBanner() {
    return (
        <section className="hero-banner relative mb-8 overflow-hidden rounded-2xl border border-[#0057FF]/10 bg-gradient-to-br from-[#0057FF]/5 via-[#E8F0FF] to-blue-50">
            <div className="relative z-10 max-w-xl">
                <p className="hero-eyebrow mb-2 font-extrabold uppercase tracking-widest text-[#0057FF]">
                    Summer 2026 Collection
                </p>

                <h1 className="hero-title mb-3 break-words font-extrabold leading-tight text-[#1D1D1F]">
                    Electronics & Lifestyle
                    <br />
                    <span className="text-[#0057FF]">
                        Built for Modern Life
                    </span>
                </h1>

                <p className="hero-description mb-5 leading-relaxed text-gray-500">
                    Curated premium tech and lifestyle products with fast
                    shipping and hassle-free returns.
                </p>

                <div className="hero-benefits flex flex-wrap gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <Truck size={13} className="text-[#0057FF]" />
                        Free shipping over $99
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <RotateCcw size={13} className="text-[#0057FF]" />
                        30-day returns
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <Shield size={13} className="text-[#0057FF]" />
                        2-year warranty
                    </span>
                </div>
            </div>

            <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-[#0057FF]/5" />
            <div className="absolute -top-6 right-20 h-24 w-24 rounded-full bg-[#0057FF]/5" />
        </section>
    );
}

export default HeroBanner;