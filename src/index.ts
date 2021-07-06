import { IProcessEnv, ISensus, SensusConfig } from './types';
import { IBM } from './adapters/IBM';

export * from './adapters';
export * from './Sensus';
export * from './types';

export function sensusConfigFactory(env: IProcessEnv = process.env): SensusConfig {
  return {
    provider: env.SENSUS_PROVIDER ?? 'IBM',
    baseUrl: env.SENSUS_API_URL ?? 'http://localhost',
    apiKey: env.SENSUS_API_KEY ?? '',
  };
}

export function sensusFactory(config: SensusConfig): ISensus {
  switch (config.provider) {
    case 'IBM': return new IBM(config);
  }
  throw new Error('unknown sensus provider: ' + config.provider);
}
