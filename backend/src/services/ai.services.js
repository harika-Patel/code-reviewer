const Groq=require('groq-sdk');
require('dotenv').config()
const groq=new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getResponse(prompt,query) {
        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: prompt,
            },
            {
              role:"system",
              content:query
            }
          ],
        });
        return completion.choices[0].message.content;
}

module.exports = getResponse