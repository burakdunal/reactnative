import {GOOGLE_API_KEY} from 'react-native-dotenv';

const GOOGLE_KEY = GOOGLE_API_KEY;

export default {
  expo: {
    name: "section12_app1",
    slug: "section12_app1",
    version: "1.1.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: ["android.permission.RECORD_AUDIO"],
      config: {
        googleMaps: {
          apiKey: GOOGLE_KEY ? GOOGLE_KEY : process.env.GOOGLE_API_KEY, // Burada .env dosyasından gelen API anahtarı okunuyor.
        },
      },
      package: "com.burakdunal.section12_app1",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-image-picker",
        {
          cameraPermission:
            "The app needs access to your camera in the order to take photos of your favorite places.",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "7d1f3a02-d3e3-455e-ae51-8712cf2267e7",
      },
    },
  },
};
