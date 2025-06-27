import { createTRPCReact } from "@trpc/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "@/backend/trpc/app-router";
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  if (Platform.OS === 'web') {
    // For web, use relative URL
    return '';
  }
  
  // For native development
  if (__DEV__) {
    // Get the IP address from the Expo development server
    const localhost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
    return `http://${localhost}:3000`;
  }
  
  // For production, use environment variable or fallback
  return process.env.EXPO_PUBLIC_API_URL || 'https://api.onehealth.com';
};

// Create links with proper error handling
const createLinks = () => {
  return [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      async headers() {
        return {};
      },
      fetch: async (url, options) => {
        try {
          // Check network connectivity
          const netInfo = await NetInfo.fetch();
          if (!netInfo.isConnected) {
            throw new Error('No internet connection');
          }

          const response = await fetch(url, {
            ...options,
            // Add timeout
            signal: AbortSignal.timeout(30000), // 30 second timeout
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return response;
        } catch (error: any) {
          console.warn('tRPC fetch error:', error);
          
          if (error.name === 'AbortError') {
            throw new Error('Request timeout');
          }
          
          if (!navigator.onLine) {
            throw new Error('No internet connection');
          }
          
          // Return a mock response to prevent app crashes
          return new Response(JSON.stringify({ 
            error: {
              message: error.message || 'Network error',
              code: 'NETWORK_ERROR'
            }
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },
    }),
  ];
};

export const trpcClient = createTRPCClient<AppRouter>({
  links: createLinks(),
});