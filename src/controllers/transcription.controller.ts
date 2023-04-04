/**
 * Transcribe controller
 * @author Yousuf Kalim
 */
import { Request, Response } from 'express';
import fs from 'fs';
import { Deepgram } from '@deepgram/sdk';
import { DEEPGRAM_SECRET } from '@config';

// Initialize the Deepgram SDK
const deepgram = new Deepgram(DEEPGRAM_SECRET);

/**
 * Transcribe pre recorded audio
 * @param {object} req
 * @param {object} res
 */
export const transcribePreRecorded = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.file?.path || req.body.audio_url) {
      return res.status(400).json({ success: false, message: 'File or URL not provided' });
    }

    let source;

    if (req.body.audio_url) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      source = {
        url: req.body.audio_url,
      } as { url: string };
    } else {
      // File is local
      // Open the audio file
      const audio = fs.readFileSync(req.file.path);

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      source = {
        buffer: audio,
        mimetype: req.file?.mimetype,
      } as { buffer: Buffer; mimetype: string };
    }

    // Send the audio to Deepgram and get the response
    const response = await deepgram.transcription.preRecorded(source, {
      punctuate: true,
      paragraphs: true,
      summarize: true,
    });

    // Done
    return res.json({
      success: true,
      summaries: response.results?.channels[0]?.alternatives[0]?.summaries,
      transcript: response.results?.channels[0]?.alternatives[0]?.transcript,
    });
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
