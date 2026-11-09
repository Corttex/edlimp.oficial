/**
 * Serviço de Integração com Google Gemini API
 * Utiliza o modelo gemini-3.8-flash com a chave oficial do projeto Google Cloud da ED Limp
 */

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";
const MODEL = "gemini-3.8-flash";

export async function generateAdCopyRealAI(promptSubject = "Higienização profunda de estofados no DF") {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`;
    
    const systemPrompt = `Você é o estrategista sênior de Marketing Digital da ED Limp (empresa de higienização hospitalar e impermeabilização de sofás e estofados de alto padrão em Brasília e Distrito Federal).
Sua missão é gerar um conjunto completo de anúncio de alta conversão para o Meta Ads (Instagram e WhatsApp).

Responda ESTRITAMENTE em formato JSON puro (sem crases de markdown ou qualquer outro texto antes ou depois) com os seguintes campos:
{
  "badge": "Frase curta de impacto para o badge (ex: IA Growth • Gancho Saúde Infantil)",
  "objective": "Engajamento / Mensagens (WhatsApp direto)",
  "campaignName": "[ED LIMP] [IA] - NOME DA CAMPANHA EM MAIUSCULAS",
  "locations": "Bairros e cidades do DF ideais para esse anúncio",
  "age": "Faixa etária recomendada (ex: 28 a 56 anos)",
  "budget": "Orçamento diário sugerido (ex: R$ 25,00 a R$ 40,00 / dia)",
  "headline": "Título magnético chamativo para o anúncio",
  "description": "Subtítulo rápido de 1 linha",
  "callToAction": "Enviar mensagem pelo WhatsApp",
  "primaryText": "Texto completo, envolvente e persuasivo da legenda com emojis, tópicos de benefícios e chamada final para mandar foto do estofado no WhatsApp"
}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nTema / Foco do Anúncio: ${promptSubject}` }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.85,
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("Falha na chamada Gemini API:", errText);
      return null;
    }

    const data = await res.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawContent) {
      return JSON.parse(rawContent);
    }
    return null;
  } catch (error) {
    console.error("Erro ao chamar Google Gemini API:", error);
    return null;
  }
}

/**
 * Gera Título, Subtítulo, Foco visual e sugestão de foto para o GERADOR DE ARTES
 */
export async function generateSocialPostCreativeAI(serviceTheme = "Higienização Profunda & Blindagem") {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`;

    const prompt = `Você é o Diretor Criativo da ED Limp (serviço premium de higienização hospitalar e blindagem impermeabilizadora de sofás, poltronas e colchões em Brasília DF).
Crie um design de post para Feed/Story do Instagram de alto impacto visual.

Responda ESTRITAMENTE em formato JSON puro (sem crases de markdown ou qualquer outro texto antes ou depois) com o formato:
{
  "headline": "Título curto, forte e magnético (máximo 5 a 7 palavras)",
  "subtext": "Subtítulo atraente com benefício ou chamada (máximo 8 a 10 palavras)",
  "overlayColor": "código hex de cor harmoniosa com a marca ED Limp (ex: #2b6c00, #1b4d00, #0f2900, #044343 ou #166534)",
  "bgCategory": "uma palavra entre: 'living', 'sofa', 'luxury', 'bedroom', 'clean'"
}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${prompt}\n\nTema sugerido: ${serviceTheme}` }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.9,
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawContent) {
      return JSON.parse(rawContent);
    }
    return null;
  } catch (err) {
    console.error("Erro ao gerar post criativo:", err);
    return null;
  }
}
