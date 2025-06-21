import { createTRPCReact } from "@trpc/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "@/backend/trpc/app-router";

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  // For development, use localhost
  if (__DEV__) {
    return "http://localhost:3000";
  }
  
  // For production, use environment variable or fallback
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  
  return "http://localhost:3000";
};

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      // Add error handling
      fetch: async (url, options) => {
        try {
          const response = await fetch(url, options);
          return response;
        } catch (error) {
          console.warn('tRPC fetch error:', error);
          // Return a mock response to prevent app crashes
          return new Response(JSON.stringify({ error: 'Network error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },
    }),
  ],
});