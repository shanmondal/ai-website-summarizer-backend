import axios from 'axios';
import * as cheerio from 'cheerio';

export const extractTextFromUrl = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AI-Summarizer/1.0',
    },
  });

  const $ = cheerio.load(data);

  $('script, style, nav, footer, header').remove();

  let text = '';
  $('p, h1, h2, h3').each((_, el) => {
    text += $(el).text() + ' ';
  });

  return text.slice(0, 3000); // limit text size
};
