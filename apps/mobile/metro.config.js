const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Ensure Metro can find modules inside the monorepo
config.resolver.nodeModulesPaths = [
  //   "../../node_modules", // Root dependencies
  "./node_modules", // Mobile dependencies
];

config.watchFolders = [path.resolve(__dirname, "../../packages")];

// Fix for resolving `expo-router`
config.resolver.extraNodeModules = {
  "expo-router": path.resolve(__dirname, "../../node_modules/expo-router"),
};

module.exports = config;
