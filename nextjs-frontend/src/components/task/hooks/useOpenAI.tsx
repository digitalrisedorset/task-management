import {config} from "@/config";

export const improveText = async (text: string) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${config.openai.apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "o3-mini",
            messages: [
                { role: "system", content: "You are an AI that improves text for clarity and conciseness." },
                { role: "user", content: `Improve this text: "${text}"` }
            ],
            max_tokens: 100
        })
    });

    const data = await response.json();
    return data.choices[0].message.content; // Improved text
};