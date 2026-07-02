import fs from 'node:fs';
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function streamToBuffer(readableStream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const reader = readableStream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
    }
  }
  return Buffer.concat(chunks);
}

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error('ERROR: ELEVENLABS_API_KEY is not defined in your environment or .env file.');
    process.exit(1);
  }

  const client = new ElevenLabsClient({
    apiKey: apiKey,
  });

  console.log('Requesting Text-To-Speech from ElevenLabs...');
  const response = await client.textToSpeech.convert(
    "cjVigY5qzO86Huf0OWal",
    { text: "Hola, bienvenido a la arena de litigio de LexTrial." }
  );

  const buffer = await streamToBuffer(response);
  fs.writeFileSync('output.bin', buffer);
  console.log('Saved output.bin successfully!');
}

main().catch(err => {
  console.error('An error occurred during execution:', err);
});
