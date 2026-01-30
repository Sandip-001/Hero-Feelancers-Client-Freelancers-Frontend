import Link from "next/link";

export default function WhyClientsChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Built for serious delivery
            </span>

            <h2 className="text-4xl sm:text-5xl font-black mb-5 leading-tight">
              Why clients
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                choose us
              </span>
            </h2>

            <p className="text-lg text-slate-600 mb-8 max-w-xl">
              Managed freelancers — not random profiles. Faster turnaround,
              predictable pricing, and a dedicated technical relationship
              manager for every project.
            </p>

            {/* FEATURE GRID */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Managed execution",
                  desc: "We handle coordination, delivery, and follow-ups — not you.",
                },
                {
                  title: "Single point of contact",
                  desc: "One manager for communication, scope, and progress.",
                },
                {
                  title: "Scales with you",
                  desc: "From quick fixes to long-term product partnerships.",
                },
                {
                  title: "Secure by default",
                  desc: "Verified talent and escrow-ready payment flow.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5"
                >
                  <h4 className="font-extrabold text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-700">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#consultation"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 font-extrabold text-slate-950 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Book a consultation
              </Link>

              <Link
                href="#faq"
                className="inline-flex items-center justify-center rounded-2xl border border-amber-200 bg-white px-6 py-3 font-extrabold text-slate-900 hover:bg-amber-50 transition-all"
              >
                Read FAQ →
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-amber-200 shadow-2xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=70"
                alt="Business team collaboration"
                className="h-64 sm:h-80 w-full object-cover"
                loading="lazy"
              />
              <div className="p-7 sm:p-8">
                <h3 className="font-black text-xl mb-2">
                  Accountability built-in
                </h3>
                <p className="text-sm text-slate-700">
                  Technical managers ensure every deliverable is reviewed,
                  aligned with scope, and ready before handover — so projects
                  move forward without hiring stress.
                </p>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -z-10 -top-6 -left-6 h-40 w-40 rounded-full bg-amber-400/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
