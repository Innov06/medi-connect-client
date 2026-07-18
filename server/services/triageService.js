const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_API_KEY);

async function analyzeSymptoms(symptoms) {
  try {
    const prompt = `
Patient symptoms:
${symptoms}

Provide:
1. Urgency Level
2. Triage Advice
3. Stepwise Guidance
4. Warning Signs
`;

    const response = await client.chatCompletion({
      model: "Qwen/Qwen2.5-7B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 600,
    });

    return {
      result: response.choices[0].message.content,
    };
  } catch (error) {
    return {
      result: "Unable to process symptoms.",
      error: error.message,
    };
  }
}

module.exports = {
  analyzeSymptoms,
};