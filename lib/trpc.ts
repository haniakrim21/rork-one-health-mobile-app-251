import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '@/backend/trpc/app-router';

// Create the tRPC react hooks
export const trpc = createTRPCReact<AppRouter>();

// Create a standalone client for non-react usage
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: __DEV__ 
        ? "http://localhost:3000/api/trpc" 
        : `${process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000"}/api/trpc`,
      transformer: superjson,
    }),
  ],
});