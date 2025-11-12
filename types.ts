// types.ts

export interface VideoScene {
  prompt: string;
  sound: string;
  audioScript: string;
}

export interface KeyPhase {
  Phase: string;
  Action: string;
}

export interface ExpanderToken {
  tokenName: string;
  description: string;
}

export interface GeneratedContent {
  title: string;
  summary: string;
  logicChain: KeyPhase[];
  expanderBlock: ExpanderToken[];
  videoPrompts: VideoScene[];
}

export interface ProblemIngredients {
  Targets: string[];
  Conditions: string[];
}

export interface ProcessIngredients {
  Tasks: string[];
  Foods: string[];
  Products: string[];
}

export interface AssetDefinitions {
  [key: string]: string;
}

// --- DEPRECATED ---
// ThematicPacks and older template/skeleton types are no longer needed
// as the AI now generates the entire concept from scratch.
export interface ThematicPack {
  title: string;
  description: string;
}
export interface ThematicPacks {
  hero: ThematicPack;
  activity: ThematicPack;
  tools: ThematicPack;
  location: ThematicPack;
}
