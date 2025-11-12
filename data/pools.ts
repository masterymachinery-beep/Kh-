// data/pools.ts
// FIX: Use `import type` to prevent name collision between the imported type and the exported constant.
import type { ProblemIngredients, ProcessIngredients } from '../types';

// ======================================================
// 🧩 XMonkeyFarm Auto Story Generator – Level 19 (Generative Logic Engine)
// ======================================================
// We no longer define scenarios. We define the INGREDIENTS to create scenarios.

// 1️⃣ INGREDIENT POOLS (FOR DIVERSIFICATION)
// The AI will freely combine these ingredients to generate a unique problem.

export const ProblemIngredients: ProblemIngredients = {
  // FIX: Replaced non-breaking space characters with regular spaces for valid syntax and formatting.
  Targets: ["Farm Road", "Cornfield", "River", "Barn Roof", "Tractor", "Fence", "Water Well", "Cows", "Sheep", "Chickens"],
  Conditions: ["is broken", "is flooded", "is on fire", "is infested", "is empty", "are lost", "are sick", "is dirty", "is blocked"]
};

export const ProcessIngredients: ProcessIngredients = {
  // FIX: Replaced non-breaking space characters with regular spaces for valid syntax and formatting.
  Tasks: ["Harvesting", "Planting", "Cooking", "Building", "Producing"],
  Foods: ["Pizza", "Bread", "Popcorn", "French Fries", "Salad", "Apple Pie"],
  Products: ["Milk", "Wool", "Eggs", "Honey"]
};
