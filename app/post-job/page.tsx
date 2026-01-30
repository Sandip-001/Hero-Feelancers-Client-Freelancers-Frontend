import { Metadata } from "next";
import PostJobClient from "./PostJobClient";

export const metadata: Metadata = {
  title: "Post a Job | Hire Top Freelancers with 0% Client Commission",
  description:
    "Post your job on Hero Freelancers and hire verified experts faster. No client commission, transparent pricing, and managed delivery from start to finish.",
  keywords: [
    "post job",
    "hire freelancers",
    "freelance hiring platform",
    "hire developers india",
    "hire designers",
    "hire remote freelancers",
    "freelance marketplace",
    "project outsourcing",
    "it freelancers",
    "hero freelancers post job",
  ],
  openGraph: {
    title: "Post a Job on Hero Freelancers – Hire Faster",
    description:
      "Share your project requirements and get matched with top freelancers. Zero client commission and dedicated support.",
    url: "https://herofreelancers.com/post-job",
    siteName: "Hero Freelancers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post a Job | Hero Freelancers",
    description:
      "Post your project and hire top freelance talent without paying commission.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PostJobClient />;
}