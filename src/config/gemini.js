// src/config/gemini.js
import { GoogleAuth } from "google-auth-library";

const MODEL = "gemini-2.0-flash";
const keyFile = "C:/Users/ROHAN/Downloads/Gemini.json";

const auth = new GoogleAuth({
  keyFile,
  scopes: ["https://www.googleapis.com/auth/generative-language"],
});

// Create client once, reuse for all requests
let cachedClient = null;

async function getClient() {
  if (!cachedClient) cachedClient = await auth.getClient();
  return cachedClient;
}

export default async function run(prompt) {
  try {
    const client = await getClient();
    const token = await client.getAccessToken();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from model."
    );
  } catch (err) {
    console.error("Error in gemini run():", err);
    throw err;
  }
}
