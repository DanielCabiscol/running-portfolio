import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, context } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API not configured' });
  }

  try {
    const systemPrompt = `Eres un entrenador de running experto y analista de datos de entrenamiento. Tienes acceso a los datos de entrenamiento del usuario de Strava.

DATOS DEL USUARIO:
${JSON.stringify(context, null, 2)}

Tu rol es:
1. Analizar los datos de entrenamiento y dar insights personalizados
2. Responder preguntas sobre el historial de entrenamientos
3. Dar recomendaciones de entrenamiento basadas en los datos
4. Predecir tiempos de carrera basados en el rendimiento actual
5. Sugerir ajustes en el volumen, intensidad o recuperacion

Responde siempre en espanol de forma amigable pero profesional. Se conciso pero informativo.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return res.status(response.status).json({ error: 'Failed to get AI response' });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'No response generated';

    res.json({ response: aiResponse });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
