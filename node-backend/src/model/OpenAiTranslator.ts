import { config } from "../config";

export class OpenAiTranslator {
    getImprovedText = async (text: string) => {
        const response = await fetch(`${config.openai.apiUrl}/chat/completions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${config.openai.apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: config.openai.model,
                messages: [
                    { role: "system", content: "You are an AI that improves text for clarity and conciseness." },
                    { role: "user", content: `Improve this text: "${text}"` }
                ],
                max_tokens: 100
            })
        });

        const data = await response.json();
        return data.choices[0].message.content; // Improved text
    }
}