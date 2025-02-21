import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { View, Text } from "react-native";

console.log("🚀 index.tsx is running...");

export function App() {
  console.log("🚀 App component is rendering...");
  
  const ctx = require.context("./app", true, /\.(tsx|ts)$/);
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);