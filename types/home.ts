export type HeroSlide = {
  key: string;
  theme: "amber" | "purple";
  bgImage: string;
  badge: string;
  title: string;
  highlight: string;
  value: number;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  stats: {
    title: string;
    desc: string;
  }[];
  card: {
    label: string;
    title: string;
    subtitle: string;
    leftLabel: string;
    leftValue: string;
    rightLabel: string;
    rightValue: string;
    footer: string[];
  };
};
