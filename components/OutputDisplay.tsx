import React from "react";
import { GeneratedContent } from "../types";
import Tabs from "./ui/Tabs";
import Card from "./ui/Card";

interface OutputDisplayProps {
  result: GeneratedContent | null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ result }) => {
  if (result) {
    const tabs = [
      {
        label: "Summary & Logic",
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>{result.title}</h3>
            <p>{result.summary}</p>
            <h4 style={{ marginTop: '2rem', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>
              AI-Deduced Logic Chain
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {result.logicChain.map((phase, index) => (
                <div key={index} style={{ backgroundColor: '#1e1e1e', padding: '0.75rem', borderRadius: '4px' }}>
                  <strong style={{ color: '#4CAF50' }}>{phase.Phase}:</strong>
                  <span style={{ marginLeft: '0.5rem', color: '#ddd' }}>{phase.Action}</span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: "Expander Block",
        content: (
          <div>
            <p style={{ color: '#ccc', marginTop: 0 }}>
              This is the source of truth for all dynamic elements in the story.
            </p>
            {result.expanderBlock.map((item, index) => (
              <Card key={index} className="token-card" style={{ marginBottom: "1rem", backgroundColor: '#1e1e1e' }}>
                <strong style={{ color: '#4CAF50' }}>{item.tokenName}</strong>
                <p style={{ whiteSpace: 'pre-wrap', margin: '0.5rem 0 0', color: '#ddd' }}>{item.description}</p>
              </Card>
            ))}
          </div>
        ),
      },
      {
        label: "Video Prompts",
        content: (
          <div>
            {result.videoPrompts.map((scene, index) => {
              return (
                <Card key={index} style={{ marginBottom: "1rem", backgroundColor: '#1e1e1e' }}>
                   <p style={{ margin: '0 0 0.75rem 0', fontWeight: 'bold', color: '#ccc', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>
                      Scene {index + 1}
                    </p>
                  <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9em', lineHeight: '1.6' }}>
                    <p style={{ margin: 0, color: '#e0e0e0' }}>{scene.prompt}</p>
                    <p style={{ color: '#a9e5a9', margin: '0.75rem 0 0' }}><strong style={{color: '#6eaf6e'}}>SOUND:</strong> {scene.sound}</p>
                    <p style={{ color: '#f0c674', margin: '0.5rem 0 0' }}><strong style={{color: '#d1a842'}}>AUDIO-SCRIPT:</strong> {scene.audioScript}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        ),
      },
       {
        label: "Raw JSON",
        content: (
          <pre style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            backgroundColor: '#1e1e1e',
            padding: '1rem',
            borderRadius: '4px',
            maxHeight: '60vh',
            overflowY: 'auto'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )
      }
    ];
    return (
      <Card>
        <h2 style={{ marginTop: 0 }}>Generated Script</h2>
        <Tabs tabs={tabs} />
      </Card>
    );
  }

  // Initial state before any generation
  return (
    <Card>
       <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', textAlign: 'center'}}>
        <h2 style={{marginTop: 0}}>Ready to create?</h2>
        <p style={{color: '#ccc'}}>Click "✨ Generate New Episode" to have the AI invent, outline, and write a complete story from scratch!</p>
      </div>
    </Card>
  );
};

export default OutputDisplay;
