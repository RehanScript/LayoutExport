export type ThemePreset = 'linear' | 'neubrutalism' | 'glassmorphism';

export interface ColorPalette {
  id: string;
  name: string;
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  cardBg: string;
  borderColor: string;
  glowColor?: string;
  isDark: boolean;
}

export interface ButtonConfig {
  text: string;
  link: string;
}

export interface HeroContent {
  badge?: string;
  headline: string;
  subheadline: string;
  primaryBtn: ButtonConfig;
  secondaryBtn: ButtonConfig;
}

export interface WhatYouGetContent {
  title: string;
  subtitle: string;
  items: { text: string; description?: string }[];
}

export interface ComparisonRow {
  feature: string;
  usValue: string | boolean;
  themValue: string | boolean;
}

export interface WhyChooseUsContent {
  title: string;
  subtitle: string;
  comparisonType: 'table' | 'cards' | 'both';
  rows: ComparisonRow[];
  cards: { title: string; description: string; icon: string }[];
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesContent {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isPopular: boolean;
}

export interface PricingContent {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
}

export interface CtaContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  feedback: string;
  rating: number;
}

export interface TestimonialsContent {
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqsContent {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  brandName: string;
  description: string;
  links: FooterLink[];
  copyrightText: string;
}

export interface AboutMeContent {
  title: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  twitterUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

// Union of all section content types
export type SectionContent =
  | { type: 'hero'; data: HeroContent }
  | { type: 'what-you-get'; data: WhatYouGetContent }
  | { type: 'why-choose-us'; data: WhyChooseUsContent }
  | { type: 'features'; data: FeaturesContent }
  | { type: 'pricing'; data: PricingContent }
  | { type: 'cta'; data: CtaContent }
  | { type: 'testimonials'; data: TestimonialsContent }
  | { type: 'faqs'; data: FaqsContent }
  | { type: 'footer'; data: FooterContent }
  | { type: 'about-me'; data: AboutMeContent };

export interface LandingPageSection {
  id: string;
  type: SectionContent['type'];
  data: any; // Keep it flexible for active modifications, butcast it as needed
}

export interface LandingPageConfig {
  theme: ThemePreset;
  paletteId: string;
  sections: LandingPageSection[];
}
