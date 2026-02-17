
export interface LandingPageContent {
  headline: string;
  subheadline: string;
  buttonText: string;
  buttonLink: string;
  benefits: string[];
  socialProof: {
    quote: string;
    author: string;
  }[];
}

export interface DesignConfig {
  bgColor: string;
  buttonColor: string;
  textColor: string;
  buttonTextColor: string;
}

export interface AppState {
  content: LandingPageContent;
  design: DesignConfig;
  isGenerating: boolean;
  viewMode: 'desktop' | 'mobile';
}
