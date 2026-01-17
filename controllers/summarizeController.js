import Groq from 'groq-sdk';
import { extractTextFromUrl } from '../utils/extractText.js';

let groq;

export const summarizeWebsite = async (req, res) => {
  try {
    // ✅ FIX: properly define url
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL required' });
    }

    if (!groq) {
      groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
      });
    }

    const content = await extractTextFromUrl(url);

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `Summarize the following webpage content in 5 lines:\n\n${content}`,
        },
      ],
    });

    res.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('REAL ERROR 👉', error.message);
    res.status(500).json({ error: 'Failed to summarize' });
  }
};
