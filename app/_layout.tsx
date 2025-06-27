import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { colors, getColors } from "@/constants/colors";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { trpc, trpcClient } from "@/lib/trpc";
import { useSettingsStore } from "@/store/settings-store";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Initialize QueryClient outside of component to ensure single instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error("Font loading error:", error);
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RootLayoutNav />
        </QueryClientProvider>
      </trpc.Provider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const { settings, isHydrated } = useSettingsStore();
  const themeColors = getColors(settings.darkMode);

  // Show a loading screen while settings are being rehydrated
  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <StatusBar 
        style={settings.darkMode ? "light" : "dark"} 
        backgroundColor={themeColors.background} 
      />
      <Stack
        screenOptions={{
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: themeColors.background,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "600",
            color: themeColors.text,
          },
          headerTintColor: themeColors.text,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}