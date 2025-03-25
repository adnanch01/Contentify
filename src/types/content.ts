
export type ToneOption = {
  value: 'professional' | 'casual' | 'persuasive' | 'informative' | 'creative';
  label: string;
};

export type ContentType = {
  value: 'blog' | 'essay' | 'social' | 'marketing' | 'creative';
  label: string;
};

export type OutputSettings = {
  tone: ToneOption['value'];
  contentType: ContentType['value'];
  wordCount: number;
};
