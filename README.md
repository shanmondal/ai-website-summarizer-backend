AI-Driven Website Summarizer Web App

A full-stack web application that summarizes the content of any public website URL using an AI language model.
Users provide a URL, the backend extracts visible text from the webpage, sends it to an AI model, and returns a concise summary.


🚀 Live Demo

Frontend (GitHub Pages):
https://shanmondal.github.io/ai-website-summarizer/

Backend (Render):
https://ai-website-summarizer-backend.onrender.com

🛠 Tech Stack
Frontend ----- React, Vite, Fetch API

Backend ----- Node.js, Express.js, Axios, Cheerio (HTML parsing), Groq SDK, AI Model, Groq API

Model: llama-3.1-8b-instant

📌 Features

Input any public website URL

Fetch and extract visible webpage text

Generate AI-powered summary

Clean UI with loading indicator

Backend-based AI processing (API key protected)





🧠 How AI Is Used (Core Explanation)

The AI is used only on the backend to generate summaries from extracted webpage text.
This ensures security, scalability, and clean separation of concerns.

Step-by-Step AI Workflow
1. User Input

The user enters a public website URL in the frontend UI.

{
  "url": "https://example.com"
}

2. Backend Receives Request

The frontend sends a POST request to the backend endpoint:

POST /api/summarize

3. Webpage Content Extraction (Non-AI Step)

The backend fetches the raw HTML of the provided URL using Axios.

const { data } = await axios.get(url);


Then Cheerio is used to parse the HTML and extract only meaningful, visible text:

Removes non-content elements:



Extracts text from: HTML tags 



To control token size and cost, the extracted text is limited:

return text.slice(0, 3000);


This step ensures the AI receives clean and relevant content, not raw HTML.

4. AI Summarization Using Groq API

The extracted text is sent to the Groq AI API, which runs a large language model.

const completion = await groq.chat.completions.create({
  model: 'llama-3.1-8b-instant',
  messages: [
    {
      role: 'user',
      content: `Summarize the following webpage content in 5 lines:\n\n${content}`,
    },
  ],
});


The AI model:

Reads the webpage text

Understands the context

Generates a concise summary in natural language

Limits the output to 5 lines, as instructed

5. Response to Frontend

The backend sends only the AI-generated summary back to the frontend:

{
  "summary": "AI-generated summary text..."
}


No webpage data or user input is stored.

🔐 Security & Privacy

API keys are stored securely using environment variables

AI requests are handled server-side only

No user data is saved or logged

Only publicly accessible webpages are processed

📂 Project Structure (Backend)
backend/
├── controllers/
│   └── summarizeController.js
├── routes/
│   └── summarizeRoute.js
├── utils/
│   └── extractText.js
├── index.js
├── package.json

⚙️ API Endpoint
POST /api/summarize

Request Body

{
  "url": "https://example.com"
}


Response

{
  "summary": "Short AI-generated summary..."
}
