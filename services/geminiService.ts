// services/geminiService.ts
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent, AssetDefinitions, ProblemIngredients, ProcessIngredients } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateScriptPrompt = (
  problemIngredients: ProblemIngredients,
  processIngredients: ProcessIngredients,
  assetDefinitions: AssetDefinitions,
  episodeHistory: string[]
): string => {
  const assetDefinitionsString = JSON.stringify(assetDefinitions, null, 2);
  const ingredientsString = JSON.stringify({ problem: problemIngredients, process: processIngredients }, null, 2);
  const historyString = episodeHistory.join(', ');

  return `
    You are an expert scriptwriter for a children's 3D animated series called "XMonkeyFarm". Your task is to act as a **Generative Logic Engine**. You will perform a three-step creative process to generate a complete, production-ready script. The output MUST be a valid JSON object that adheres to the provided schema.

    **--- STEP 1: GENERATE A UNIQUE EPISODE TITLE ---**
    First, using the provided \`Ingredients Pool\`, randomly combine elements to create a short, unique episode title. Avoid any titles from the \`Episode History\`.
    *   **Ingredients Pool:** ${ingredientsString}
    *   **Episode History (Do Not Repeat):** ${historyString}
    *   **Examples of Good Titles:** "The Cornfield is Infested", "The Tractor is Broken", "The Great Milk Mission", "The Cabbage Harvest".

    **--- STEP 2: DEDUCE THE LOGICAL PHASES (THE SKELETON) ---**
    Second, based on the title you just generated, think like a human writer and deduce a logical, closed-loop sequence of **KeyPhases** to tell the story. This is the most critical step. DO NOT SKIP logical steps.
    *   **Example:** If your title is "The Barn Roof is Broken", your deduced logic chain MUST be something like:
    *   [
    *     {"Phase": "1. Hook (Discovery)", "Action": "Sees rain leaking into the Barn"},
    *     {"Phase": "2. Return to Base", "Action": "Go to Warehouse"},
    *     {"Phase": "3. Get Tools & Materials", "Action": "Get **Ladder**, **Hammer**, **New Shingles**"},
    *     {"Phase": "4. Go to Site", "Action": "Carry materials to the **Barn**"},
    *     {"Phase": "5. Execute Fix (Step 1)", "Action": "Climb **Ladder** to roof; remove old shingles"},
    *     {"Phase": "6. Execute Fix (Step 2)", "Action": "Lay new shingles and hammer them down"},
    *     {"Phase": "7. Wrap-up (Test)", "Action": "Use a hose to spray the roof; confirm no leaks"}
    *   ]

    **--- STEP 3: EXPAND PHASES INTO 18-25 DETAILED SCENES ---**
    Finally, take the \`KeyPhases\` you deduced in Step 2 and expand them into 18-25 detailed, visual, professional action scenes. You must follow these 4 rules:

    - **RULE 1 (ASSET LOCKING):** You MUST use the *exact IDs* from the provided \`AssetDefinitions\` (e.g., "HERO_TRACTOR") in every scene. The full descriptions will be used to populate the 'expanderBlock'.
    - **RULE 2 (LOCKED SEQUENCE):** You MUST follow the \`KeyPhases\` you generated in Step 2 in the exact order.
    - **RULE 3 (ONE ACTION PER SCENE):** Each scene is ONE distinct, professional action. Expand each Phase into 2-4 "micro-action" scenes.
    - **RULE 4 ("EXPLICIT VISUALS"):** Write every scene as a *clear, undeniable visual action*. SHOW the action, don't state information. Use the detailed examples from previous levels as a guide for quality.

    **This Episode's Asset Definitions (FOR ASSET LOCKING):**
    This object defines the specific, named assets for this episode. You MUST use the KEY (e.g., "HERO_TRACTOR") as the token in your scene prompts. You MUST use the VALUE (the full description) to populate the 'expanderBlock' in your JSON output.
    ${assetDefinitionsString}

    **Mandatory Scene Prompt Framework:**
    Every scene must use the full prompt structure, including the [CHARACTER ANCHOR] for Chu-Chu. The full, verbatim description of Chu-Chu MUST be in every single scene's prompt.
    [CHARACTER ANCHOR]
    Chu-Chu is a small, agile 3D animated monkey, about 5 years old, 60 cm tall and 8 kg, with light brown fur, big curious eyes, and a long tail. He wears blue denim overalls with no shirt and no shoes. He usually moves energetically, hopping and darting with nimble, lively gestures, but his movements adapt naturally to the mood of the moment — becoming slower or more cautious when focused, and quicker when excited or playful. His voice is fast-paced, rhythmic, and playful, full of musical tone and expressive energy, but its intensity adjusts to the situation — softer in quiet moments, brighter when thrilled. He often uses cheerful interjections or nonsense syllables when excited, but these vary naturally depending on the situation. He is a problem-solver who approaches challenges with boundless energy and optimism.
    [SCENE (Number): (Title)]
    Setting: ...
    Character: ...
    Action / Continuity: ...
    Camera / Transition: ...
    Sound: ...
    Audio-script: ...

    Now, perform all three steps and generate the complete JSON output. Adhere to all rules strictly.
    `;
};

const generatedContentSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        summary: { type: Type.STRING },
        logicChain: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    Phase: { type: Type.STRING },
                    Action: { type: Type.STRING },
                },
                required: ["Phase", "Action"],
            },
        },
        expanderBlock: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    tokenName: { type: Type.STRING },
                    description: { type: Type.STRING },
                },
                required: ["tokenName", "description"],
            },
        },
        videoPrompts: {
            type: Type.ARRAY,
            minItems: 18,
            items: {
                type: Type.OBJECT,
                properties: {
                    prompt: { type: Type.STRING },
                    sound: { type: Type.STRING },
                    audioScript: { type: Type.STRING },
                },
                required: ["prompt", "sound", "audioScript"],
            },
        },
    },
    required: ["title", "summary", "logicChain", "expanderBlock", "videoPrompts"],
};

export const generateScript = async (
    problemIngredients: ProblemIngredients,
    processIngredients: ProcessIngredients,
    assetDefinitions: AssetDefinitions,
    episodeHistory: string[]
): Promise<GeneratedContent> => {
    const prompt = generateScriptPrompt(problemIngredients, processIngredients, assetDefinitions, episodeHistory);
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: generatedContentSchema,
        },
    });

    const text = response.text;
    
    try {
        const result = JSON.parse(text);
        // The expander block is generated dynamically by the AI now, based on the assets it chose to use.
        // We need to ensure the hero is always in it.
        if (!result.expanderBlock.some((token: { tokenName: string; }) => token.tokenName === "Chu-Chu the Monkey")) {
            result.expanderBlock.unshift({
                tokenName: "Chu-Chu the Monkey",
                description: `Chu-Chu is a small, agile 3D animated monkey, about 5 years old, 60 cm tall and 8 kg, with light brown fur, big curious eyes, and a long tail. He wears blue denim overalls with no shirt and no shoes. He usually moves energetically, hopping and darting with nimble, lively gestures, but his movements adapt naturally to the mood of the moment — becoming slower or more cautious when focused, and quicker when excited or playful. His voice is fast-paced, rhythmic, and playful, full of musical tone and expressive energy, but its intensity adjusts to the situation — softer in quiet moments, brighter when thrilled. He often uses cheerful interjections or nonsense syllables when excited, but these vary naturally depending on the situation. He is a problem-solver who approaches challenges with boundless energy and optimism.`
            });
        }
        return result as GeneratedContent;
    } catch (e) {
        console.error("Failed to parse Gemini response as JSON:", text);
        throw new Error("Invalid JSON response from AI.");
    }
};
