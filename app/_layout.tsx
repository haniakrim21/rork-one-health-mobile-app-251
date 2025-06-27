import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getColors } from "@/constants/colors";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { trpc, trpcClient } from "@/lib/trpc";
import { useSettingsStore } from "@/store/settings-store";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  const { isHydrated } = useSettingsStore();

  // Memoize QueryClient to prevent re-renders
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  }), []);

  const onLayoutRootView = useCallback(async () => {
    if (error) throw error;
    if (loaded && isHydrated) {
      await SplashScreen.hideAsync();
    }
  }, [loaded, isHydrated, error]);

  if (!loaded || !isHydrated) {
    return null;
  }

  return (
    <ErrorBoundary>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RootLayoutNav onLayout={onLayoutRootView} />
        </QueryClientProvider>
      </trpc.Provider>
    </ErrorBoundary>
  );
}

function RootLayoutNav({ onLayout }: { onLayout: () => Promise<void> }) {
  const { settings } = useSettingsStore();
  const themeColors = useMemo(() => getColors(settings.darkMode), [settings.darkMode]);

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
        onLayout={onLayout}
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