/**
 * elevenLabsTts.ts
 *
 * Browser-side ElevenLabs Text-to-Speech integration.
 * Calls the ElevenLabs REST API directly via fetch (no Node.js SDK needed).
 * The API key is loaded from the VITE_ELEVENLABS_API_KEY env variable,
 * which must be set in your .env file as:
 *   VITE_ELEVENLABS_API_KEY=your_key_here
 *   VITE_ELEVENLABS_VOICE_ID=cjVigY5qzO86Huf0OWal
 */

const ELEVEN_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY as string | undefined;
const ELEVEN_VOICE_ID = (import.meta.env.VITE_ELEVENLABS_VOICE_ID as string | undefined) || 'cjVigY5qzO86Huf0OWal';
const ELEVEN_API_BASE = 'https://api.elevenlabs.io/v1';

let currentAudio: HTMLAudioElement | null = null;
// AbortController to cancel in-flight fetch requests and stop credit consumption
let currentAbortController: AbortController | null = null;

/** Returns true if the ElevenLabs API key is configured. */
export function isElevenLabsConfigured(): boolean {
  return Boolean(ELEVEN_API_KEY && ELEVEN_API_KEY.trim().length > 0);
}

/**
 * Immediately stops all ElevenLabs activity:
 * 1. Aborts any in-flight HTTP request to the ElevenLabs API (stops credit usage).
 * 2. Pauses and releases any currently playing audio.
 */
export function stopElevenLabsAudio() {
  // Abort in-flight API request — this is the key call to stop credit consumption
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }

  // Stop and release the audio element
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
}

/**
 * Converts text to speech using ElevenLabs and plays the resulting audio.
 * Falls back to browser Web Speech API if not configured or on error.
 */
export async function elevenLabsSpeakText(
  text: string,
  fallback?: (text: string) => void
): Promise<void> {
  if (!isElevenLabsConfigured()) {
    fallback?.(text);
    return;
  }

  // Strip role tags like [ACTOR]: for cleaner narration
  const cleanText = text.replace(/\[([^\]]+)\]:/g, '$1:').trim();
  if (!cleanText) return;

  // Stop any currently playing audio and abort any previous request
  stopElevenLabsAudio();

  // Create a new AbortController for this request
  const abortController = new AbortController();
  currentAbortController = abortController;

  try {
    const response = await fetch(
      `${ELEVEN_API_BASE}/text-to-speech/${ELEVEN_VOICE_ID}/stream`,
      {
        method: 'POST',
        signal: abortController.signal,
        headers: {
          'xi-api-key': ELEVEN_API_KEY!,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`ElevenLabs TTS error ${response.status}:`, errBody);
      currentAbortController = null;
      fallback?.(cleanText);
      return;
    }

    const audioBlob = await response.blob();
    currentAbortController = null; // Request completed — no longer needed

    // If we were aborted while waiting for the blob, bail out
    if (abortController.signal.aborted) return;

    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    currentAudio = audio;

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
    };
    audio.onerror = () => {
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
      fallback?.(cleanText);
    };

    await audio.play();
  } catch (err: any) {
    currentAbortController = null;
    // AbortError is expected when we cancel intentionally — don't log it as an error
    if (err?.name === 'AbortError') return;
    console.error('ElevenLabs TTS fetch failed:', err);
    fallback?.(cleanText);
  }
}
