// App.tsx
import React, { useState } from "react";
import { GeneratedContent, AssetDefinitions } from "./types";
import { generateScript } from "./services/geminiService";
import { ProcessIngredients, ProblemIngredients } from "./data/pools";
import InputForm from "./components/InputForm";
import OutputDisplay from "./components/OutputDisplay";
import Card from "./components/ui/Card";
import Spinner from "./components/ui/Spinner";
import "./App.css";

const fullChuChuProfile = `Chu-Chu is a small, agile 3D animated monkey, about 5 years old, 60 cm tall and 8 kg, with light brown fur, big curious eyes, and a long tail. He wears blue denim overalls with no shirt and no shoes. He usually moves energetically, hopping and darting with nimble, lively gestures, but his movements adapt naturally to the mood of the moment — becoming slower or more cautious when focused, and quicker when excited or playful. His voice is fast-paced, rhythmic, and playful, full of musical tone and expressive energy, but its intensity adjusts to the situation — softer in quiet moments, brighter when thrilled. He often uses cheerful interjections or nonsense syllables when excited, but these vary naturally depending on the situation. He is a problem-solver who approaches challenges with boundless energy and optimism.`;

const AssetDefinitions: AssetDefinitions = {
    "HERO_TRACTOR": "a classic 1970s red Massey Ferguson tractor, slightly rusty",
    "HERO_TRUCK": "a blue Ford F-150 pickup truck",
    "HERO_EXCAVATOR": "a yellow CAT 330 excavator with 'XMonkeyFarm' logo",
    "HERO_HARVESTER": "a large green John Deere S700 combine harvester",
    "HERO_WATER_TRUCK": "a white tanker truck with a water hose",
    "HERO_CATTLE_TRAILER": "a silver metal cattle trailer",
    "HERO_LUMBER_TRUCK": "a large flatbed truck for logs",
    "HERO_POTATO_DIGGER": "a specialized green tractor attachment for digging potatoes",
    "HERO_STEAMROLLER": "a heavy, single-drum road roller",
};

function App() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [episodeHistory, setEpisodeHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      // The new service function takes the raw ingredients and history
      const result = await generateScript(
        ProblemIngredients,
        ProcessIngredients,
        AssetDefinitions,
        episodeHistory
      );

      // Post-processing to ensure Chu-Chu's profile is always correctly inserted
      result.videoPrompts.forEach(scene => {
        const isMentionedInAudio = scene.audioScript.includes("Chu-Chu");
        const isMentionedInPrompt = scene.prompt.includes("Chu-Chu");

        if (isMentionedInAudio || isMentionedInPrompt) {
            if (scene.prompt.includes(fullChuChuProfile)) {
                return;
            }
            if (isMentionedInPrompt) {
                scene.prompt = scene.prompt.replace("Chu-Chu", fullChuChuProfile);
            } 
            else if (isMentionedInAudio) {
                const charAnchor = '[CHARACTER ANCHOR]\n' + fullChuChuProfile;
                if(scene.prompt.includes('[CHARACTER ANCHOR]')){
                   scene.prompt = scene.prompt.replace('[CHARACTER ANCHOR]', charAnchor);
                } else {
                   scene.prompt = `${charAnchor}\n${scene.prompt}`;
                }
            }
        }
      });
      
      setGeneratedContent(result);
      // Add the newly generated title to history to avoid duplicates
      setEpisodeHistory(prev => [...prev, result.title]);

    } catch (err) {
      setError("Failed to generate script. The AI may be experiencing high demand or an error occurred. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>XMonkeyFarm Story Generator (V19)</h1>
        <p>Your Generative Logic Engine for endless on-brand episodes.</p>
      </header>
      <div className="main-content">
        <div className="input-column">
          <InputForm 
            onGenerate={handleGenerate} 
            isLoading={isLoading}
          />
        </div>
        <div className="output-column">
          {isLoading ? (
            <Card>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px'}}>
                <Spinner />
                <p style={{marginTop: '1rem', color: '#ccc'}}>Generating... The AI is now thinking...</p>
                <p style={{color: '#999', fontSize: '0.9em'}}>(Creating title -> Deducing logic -> Expanding scenes)</p>
              </div>
            </Card>
          ) : error ? (
            <Card><p style={{ color: "#ff8a8a", textAlign: "center" }}>{error}</p></Card>
          ) : (
            <OutputDisplay result={generatedContent} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
