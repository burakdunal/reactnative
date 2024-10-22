// import { EXPO_PROJECT_ID } from "react-native-dotenv";

// const projectId = EXPO_PROJECT_ID
//   ? EXPO_PROJECT_ID
//   : process.env.EXPO_PROJECT_ID;

export default {
  expo: {
    name: "Push Me App",
    slug: "section15_app1",
    version: "1.0.1",
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
      package: "com.burakdunal.pushmeapp",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/icon.png",
          color: "#ffffff",
          defaultChannel: "default",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "920cba0e-8371-4694-8688-76abb7eb3683",
      },
    },
  },
};
