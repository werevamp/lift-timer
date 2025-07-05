import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lifttimer.app',
  appName: 'LiftTimer',
  webDir: 'dist',
  ios: {
    minVersion: '14.0'
  }
};

export default config;
