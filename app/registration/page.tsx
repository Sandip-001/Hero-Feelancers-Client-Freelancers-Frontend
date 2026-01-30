import { Metadata } from "next";
import RegistrationClient from "./RegistrationClient";

export const metadata: Metadata = {
  title: "Register on Hero Freelancers | Hire Talent or Find Work",
  description:
    "Create your free account on Hero Freelancers. Clients can hire verified freelancers, and professionals can find high-paying freelance projects easily.",
  keywords: [
    "hero freelancers registration",
    "freelancer signup",
    "client registration",
    "freelancer registration",
    "hire freelancers india",
    "freelance jobs india",
    "post project",
    "remote work platform",
    "it freelancers",
    "freelancer marketplace",
  ],
  openGraph: {
    title: "Join Hero Freelancers – Clients & Freelancers",
    description:
      "Sign up as a client to hire top talent or as a freelancer to get premium projects.",
    url: "https://herofreelancers.com/registration",
    siteName: "Hero Freelancers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register on Hero Freelancers",
    description:
      "Join Hero Freelancers to hire experts or find freelance work faster.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegistrationPage() {
  return <RegistrationClient />;
}