import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client. It will automatically use the OPENAI_API_KEY from your .env.local file.
const openai = new OpenAI();

const systemPrompt = `
You are an expert technical interview analyst. Your task is to analyze an interview transcript and provide a comprehensive, detailed analysis by breaking it down into multiple specific sections. The transcript will be provided as a flat array of dialogue entries.

IMPORTANT: Create a COMPREHENSIVE timeline with MANY sections (typically 8-15 sections for a full interview). Do not group large portions of the interview into just 2-3 broad sections. Instead, identify natural topic transitions and create detailed, granular sections that capture the flow of the conversation.

For each natural topic shift or thematic change in the conversation, create a separate section. Examples of sections might include:
- "Opening & Introductions"
- "Background & Journey Discussion" 
- "Technology Stack Assessment"
- "Testing & Quality Practices"
- "Version Control & Collaboration"
- "Project Deep Dive - State Management"
- "React Fundamentals Knowledge"
- "Performance Optimization Discussion"
- "CSS & Styling Approach"
- "Cross-browser Compatibility"
- "Accessibility Awareness"
- "Debugging & Problem Solving"
- "Technical Problem Solving Exercise"
- "Team Collaboration & Communication"
- "Learning & Development Approach"
- "Behavioral Scenarios"
- "Candidate Questions & Role Discussion"
- "Wrap-up & Next Steps"

Please return a JSON object with an "analysis" property containing an array where each object represents a section of the interview and has the following structure:
{
  "analysis": [
    {
      "timeline": "The timeline of the section based on timestamps, e.g., 00:00:00 - 00:05:00",
      "section": "A specific, descriptive name for this section of the interview",
      "summary": "A concise summary of the section's content and interaction.",
      "highlights": ["A list of 2-3 key strengths or positive points demonstrated by the candidate in this section."],
      "lowlights": ["A list of 1-2 potential weaknesses, areas for improvement, or red flags in this section. If none, return an empty array."],
      "keyNamedEntities": ["A list of key technologies, methodologies, or proper nouns mentioned in this section, e.g., React, Next.js, CI/CD."]
    }
  ]
}

Guidelines:
1. Create 8-15 sections minimum for a comprehensive analysis
2. Each section should cover 3-8 minutes of conversation typically
3. Look for natural topic transitions and thematic shifts
4. Use descriptive, specific section names that reflect the actual content discussed
5. Ensure each section has meaningful highlights and lowlights specific to that topic area
6. Be objective and professional in your analysis
7. Pay attention to timestamps to create accurate timeline ranges
8. Identify both technical and soft skill demonstrations in each section
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transcript } = body;

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Please analyze the following transcript:\n\n${transcript}` }
      ],
    });

    const result = completion.choices[0].message.content;

    if (!result) {
        return NextResponse.json({ error: 'Failed to get a valid response from AI' }, { status: 500 });
    }

    // The response from the LLM should be a JSON string that we need to parse.
    // The prompt asks for a JSON object with an "analysis" property containing the array.
    const analysisResponse = JSON.parse(result);
    
    console.log('LLM Response:', analysisResponse);

    // We expect the response to have an "analysis" property with the array
    const analysisData = analysisResponse.analysis || analysisResponse;

    if (!Array.isArray(analysisData)) {
      console.error('Invalid response format - expected array:', analysisData);
      return NextResponse.json({ error: 'Invalid response format from AI - expected array' }, { status: 500 });
    }

    return NextResponse.json(analysisData);

  } catch (error) {
    console.error('Error in analyze API:', error);
    if (error instanceof OpenAI.APIError) {
        return NextResponse.json({ error: `OpenAI Error: ${error.message}` }, { status: error.status });
    }
    return NextResponse.json({ error: 'Failed to analyze transcript' }, { status: 500 });
  }
} 