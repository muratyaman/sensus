import axios, { AxiosInstance } from 'axios';
import { ISensus, AnalyzeEmotionsInput, AnalyzeEmotionsOutput, SensusConfig } from './types';

export class Sensus implements ISensus {

  protected client: AxiosInstance;

  constructor(protected config: SensusConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
    });
    this.init();
  }

  init() {
    // do something
  }

  async analyzeEmotions(input: AnalyzeEmotionsInput): Promise<AnalyzeEmotionsOutput> {
    throw new Error('analyzeEmotions() not implemented');
  }

}
