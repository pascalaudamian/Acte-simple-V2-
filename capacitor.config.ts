import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ro.actesimple.app',
  appName: 'ActeSimple',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: false
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#0f172a',
      sound: 'beep.wav'
    },
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#0f172a',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP'
    }
  }
};

export default config;
