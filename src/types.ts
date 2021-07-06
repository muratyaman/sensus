export interface IProcessEnv {
  SENSUS_PROVIDER?: string;
  SENSUS_API_URL?: string;
  SENSUS_API_KEY?: string;
}

export interface SensusConfig {
  provider: string | 'IBM';
  baseUrl: string;
  apiKey: string;
}

export interface ISensus {
  analyzeEmotions(input: AnalyzeEmotionsInput): Promise<AnalyzeEmotionsOutput>;
}

export interface AnalyzeEmotionsInput {
  text: string;
  //emotionTargets?: string[];
}

export interface AnalyzeEmotionsOutput {
  emotions: EmotionsWeights;
}

export interface EmotionsWeights {
  //anger: number;
  //disgust: number;
  //fear: number;
  joy: number;
  sadness: number;
}
