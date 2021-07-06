// @see https://cloud.ibm.com/apidocs/natural-language-understanding#emotion

import { AnalyzeEmotionsInput, AnalyzeEmotionsOutput } from '../types';
import { Sensus } from '../Sensus';

const version = '2021-03-25';

const pathAnalyze = '/v1/analyze';

export class IBM extends Sensus {

  init() {
    //this.client.defaults.headers = {};
  }

  async analyzeEmotions(input: AnalyzeEmotionsInput): Promise<AnalyzeEmotionsOutput> {
    let errMsg = '';
    try {
      const auth = {
        username: 'apikey',
        password: this.config.apiKey,
      };
      const params = { // query params
        version,
      };
      const data = convertFromAnalyzeEmotionsInput(input);
      const response = await this.client.post<AnalyzeEmotionsResponseBody>(pathAnalyze, data, { auth, params });
      console.info('result', JSON.stringify(response.data, null, '  '));
      return convertToAnalyzeEmotionsOutput(response.data);
    } catch (err) {
      console.error(err);
      errMsg = err.message;
    }
    throw new Error(errMsg ?? 'failed to analyze emotions');
  }

}

export function convertFromAnalyzeEmotionsInput(input: AnalyzeEmotionsInput): AnalyzeEmotionsRequestBody {
  const text = input.text.trim();
  const firstWord = text.split(' ')[0].trim();
  return {
    text,
    features: {
      emotion: {
        targets: [ firstWord ], // we need at least one target
        document: true, // false := hide document level emotions
      },
    },
  }
}

export interface AnalyzeEmotionsRequestBody {
  features: AnalyzeEmotionsFeatures;
  text?: string;
  html?: string;
  //url?: string;
  //clean?: boolean;
  //returnAnalyzedText?: boolean;
  //limitTextCharacters?: number;
  //headers?: OutgoingHttpHeaders;
}

export interface AnalyzeEmotionsFeatures {
  emotion?: AnalyzeEmotionOptions;
}

export interface AnalyzeEmotionOptions {
  document?: boolean;
  targets?: string[];
}

export function convertToAnalyzeEmotionsOutput(responseBody: AnalyzeEmotionsResponseBody): AnalyzeEmotionsOutput {
  if (responseBody?.emotion?.document?.emotion) {
    const { emotion } = responseBody.emotion.document;
    const output: AnalyzeEmotionsOutput = {
      emotions: {
        joy: emotion.joy ?? 0,
        sadness: emotion.sadness ?? 0,
      },
    };
    return output;
  }
  throw new Error('failed to analyze emotions');
}

export interface AnalyzeEmotionsResponseBody {
  emotion?: AnalyzeEmotionResult;
  //language?: string;
  //analyzed_text?: string;
}

export interface AnalyzeEmotionResult {
  document?: DocumentEmotionResults;
  //targets?: TargetedEmotionResults[];
}

export interface DocumentEmotionResults {
  emotion?: EmotionScores;
}
 
export interface EmotionScores {
  //anger?: number;
  //disgust?: number;
  //fear?: number;
  joy?: number;
  sadness?: number;
}
