import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/backend/trpc/app-router';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser should use relative path
    return '';
  }
  
  // For development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8081';
  }
  
  // For production
  return 'https://your-production-url.com';
};

// Create the tRPC React hooks
export const trpc = createTRPCReact<AppRouter>();

// Create the tRPC client for non-React usage
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      fetch: async (input, init) => {
        try {
          const response = await fetch(input, init);
          return response;
        } catch (error) {
          console.error('tRPC fetch error:', error);
          throw error;
        }
      },
    }),
  ],
});