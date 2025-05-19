import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();
export interface SonarRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  [key: string]: any;
}

export interface SonarResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }>;
  usage?: any;
  [key: string]: any;
}

export class SonarClient {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl = "https://api.perplexity.ai") {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async createChatCompletion(payload: SonarRequest): Promise<SonarResponse> {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Sonar API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }
}

export default SonarClient;