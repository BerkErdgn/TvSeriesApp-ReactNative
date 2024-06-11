import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, router, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getItem } from './utils/asyncStorage.js'
import { AuthContextProvider, useAuth } from "../context/authContext.js";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MainLayout = ({ colorScheme, showOnboarding }) => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    //check if user is authenticated or not 
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(tabs)";
    if (isAuthenticated && !inApp) {
      router.replace("homeScreen");
    } else if (isAuthenticated == false) {
      router.replace("sign-in");
    }
  }, [isAuthenticated])

  if (showOnboarding) {
    return (

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="detail/[id]" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>

    );
  } else {
    return (

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="detail/[id]" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>

    );
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, error] = useFonts({
    //! we write here for use fonts all over the app
    "SpaceMono": require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const [showOnboarding, setShowOnboarding] = useState(null);


  useEffect(() => {
    const checkIdAlreadyOnBoarded = async () => {
      let onboarded = await getItem("onboarded");
      if (onboarded == 1) {
        setShowOnboarding(false);
      } else {
        setShowOnboarding(true);
      }
    };

    checkIdAlreadyOnBoarded();
  }, []);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    };
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error && showOnboarding == null) return null;

  return (
    <AuthContextProvider>
      <MainLayout colorScheme={colorScheme} showOnboarding={showOnboarding} />
    </AuthContextProvider>
  );


}
