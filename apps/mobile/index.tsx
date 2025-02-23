import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { Text, View } from "react-native";


export function App() {
  const ctx = require.context("./app", true, /\.(tsx|ts)$/);
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);