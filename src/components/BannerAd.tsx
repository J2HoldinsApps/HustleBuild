import { Platform } from 'react-native';

let BannerAd: React.ComponentType<any> = () => null;

if (Platform.OS === 'web') {
  BannerAd = require('./BannerAd.web').BannerAd;
} else {
  BannerAd = require('./BannerAd.native').BannerAd;
}

export { BannerAd };
