export default function TechnicalManager() {
  const data = {
    badge: "Delivery supervised end-to-end",
    title: "Every Project Gets a Dedicated Technical Manager",
    highlight: "Dedicated Technical Manager",
    description:
      "Not just hiring—Hero Freelancers runs execution. Your manager coordinates talent, verifies progress, and keeps delivery on track with milestones and updates.",
    bullets: [
      "Smart project management — scope, timeline, and milestones.",
      "Quality control — reviews, testing, and checklist-based delivery.",
      "Stay updated — weekly reports + simple progress tracking.",
    ],
    metrics: [
      { label: "Communication", value: "Single point" },
      { label: "Delivery", value: "Milestones" },
      { label: "Risk", value: "Escrow-ready" },
    ],
    workflow: [
      { title: "Plan", desc: "Scope → milestones → timeline." },
      { title: "Execute", desc: "Daily progress + coordination." },
      { title: "Review", desc: "QA + checklist verification." },
      { title: "Deliver", desc: "Handover + support." },
    ],
  };

  return (
    <section
      id="managers"
      className="py-20 bg-gradient-to-br from-amber-50 to-yellow-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-white/70 px-4 py-2 text-xs font-extrabold text-yellow-700">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              {data.badge}
            </p>

            <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-5 leading-tight">
              Every Project Gets a<br />
              <span className="bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent">
                {data.highlight}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-700 mb-6 max-w-xl">
              {data.description}
            </p>

            <ul className="space-y-4 text-base sm:text-lg text-slate-700">
              {data.bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="h-2.5 w-2.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#consultation"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-950 px-6 py-3 font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Assign my manager
              </a>
              <a
                href="#how-works"
                className="inline-flex items-center justify-center rounded-2xl bg-white/70 border border-amber-200 px-6 py-3 font-extrabold text-slate-900 hover:bg-white transition-all"
              >
                See process →
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl bg-white/75 border border-amber-200 p-4"
                >
                  <p className="text-xs font-bold text-slate-500">{m.label}</p>
                  <p className="text-sm font-extrabold text-slate-900">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-amber-200 shadow-2xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=75"
                alt="Technical manager planning milestones"
                className="h-64 sm:h-80 w-full object-cover"
                loading="lazy"
              />
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-black text-slate-900 mb-4">
                  Your Vision, Our Guidance
                </h3>
                <p className="text-slate-700 mb-6">
                  From idea to delivery—your technical manager breaks scope,
                  assigns the right experts, tracks execution, and ensures
                  quality before handover.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {data.workflow.map((step) => (
                    <div
                      key={step.title}
                      className="rounded-2xl border border-amber-200 bg-amber-50 p-4"
                    >
                      <p className="font-extrabold text-slate-900">
                        {step.title}
                      </p>
                      <p className="text-sm text-slate-700 mt-1">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="#consultation"
                  className="mt-6 w-full inline-flex items-center justify-center rounded-2xl bg-slate-950 text-white px-6 py-3 font-extrabold shadow hover:opacity-95 transition-all"
                >
                  Book a consultation
                </a>
              </div>
            </div>

            <div className="absolute -z-10 -top-8 -right-6 h-40 w-40 rounded-full bg-yellow-500/25 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
