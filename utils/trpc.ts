import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@router';

export const trpc = createReactQueryHooks<AppRouter>();
