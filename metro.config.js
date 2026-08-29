const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.platformExtensions = ['.native', '.ios', '.android', '.web', '.ts', '.tsx'];

module.exports = config;
