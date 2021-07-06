require('dotenv').config();
const { readFileSync } = require('fs');
const { resolve } = require('path');
const sensusLib = require('../dist');

main();

async function main() {
  const [_node, _indexjs, fileName] = process.argv;
  if (!fileName) return console.error('text file is required');
  
  const text = readFileSync(resolve(fileName)).toString();

  const config = sensusLib.sensusConfigFactory(process.env);
  
  const sensus = sensusLib.sensusFactory(config);

  const { emotions } = await sensus.analyzeEmotions({ text });
  console.info('joy', Math.round(100 * emotions.joy), '%');
  console.info('sadness', Math.round(100 * emotions.sadness), '%');
}
