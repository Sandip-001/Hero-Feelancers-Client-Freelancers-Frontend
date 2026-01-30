"use client";
import Link from 'next/link';


const freelancerEarningsData = {
  title: "Freelancers Earn More Here",
  subtitle:
    "Low platform fees through subscriptions — clients pay 0% commission so you keep more of what you earn.",
  image:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=75",

  intro: {
    heading: "Work freely. Earn fully.",
    description:
      "Build a strong profile, win better projects with visibility boosts, and grow long-term through rewards and learning programs.",
  },

  highlights: [
    {
      title: "Keep more earnings",
      description: "Industry-low deductions with subscription plans.",
      color: "emerald",
    },
    {
      title: "Growth program",
      description: "Learn, earn, and level up with better opportunities.",
      color: "blue",
    },
    {
      title: "Referral bonuses",
      description: "Invite other freelancers and earn together.",
      color: "purple",
    },
    {
      title: "Global reach",
      description: "Access quality projects beyond local networks.",
      color: "amber",
    },
  ],

  cards: [
    {
      icon: "₹",
      title: "Earn More",
      description:
        "Minimal platform fees mean higher take-home earnings on every project.",
      color: "emerald",
    },
    {
      icon: "↑",
      title: "Growth Program",
      description:
        "Visibility boosts, learning resources, and better matching help you grow faster.",
      color: "blue",
    },
    {
      icon: "🌍",
      title: "Global Reach",
      description:
        "Work with international clients and remote-first teams.",
      color: "purple",
    },
  ],
};


export default function FreelancerEarnMore() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            {freelancerEarningsData.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            {freelancerEarningsData.subtitle}
          </p>
        </div>

        {/* IMAGE + INTRO */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <img
              src={freelancerEarningsData.image}
              alt="Freelancers collaborating remotely"
              className="h-64 sm:h-80 w-full object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black mb-4">
              {freelancerEarningsData.intro.heading}
            </h3>
            <p className="text-slate-700 mb-6">
              {freelancerEarningsData.intro.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {freelancerEarningsData.highlights.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border border-${item.color}-200 bg-${item.color}-50 p-5`}
                >
                  <p
                    className={`text-sm font-extrabold text-${item.color}-800`}
                  >
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-700 mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {freelancerEarningsData.cards.map((card) => (
            <div
              key={card.title}
              className={`rounded-3xl border border-${card.color}-200 bg-gradient-to-br from-${card.color}-50 to-white p-8 shadow-sm hover:shadow-xl transition-all`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`h-12 w-12 rounded-2xl bg-${card.color}-600 text-white flex items-center justify-center font-black text-lg`}
                >
                  {card.icon}
                </div>
                <h3
                  className={`text-xl font-black text-${card.color}-800`}
                >
                  {card.title}
                </h3>
              </div>
              <p className="text-slate-700">{card.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/registration"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-4 text-lg font-extrabold text-slate-950 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            Join as Freelancer
          </Link>
        </div>
      </div>
    </section>
  );
}