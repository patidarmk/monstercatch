import * as React from 'react'
import { 
  createRouter, 
  RouterProvider, 
  createRootRoute, 
  createRoute as createTanStackRoute, 
  Outlet 
} from '@tanstack/react-router'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Explore from "./pages/Explore";
import Monsters from "./pages/Monsters";
import MonsterDetail from "./pages/MonsterDetail";
import Battles from "./pages/Battles";
import Training from "./pages/Training";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { MadeWithApplaa } from "@/components/made-with-applaa";

const queryClient = new QueryClient();

// Create root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Outlet />
          </main>
          <MadeWithApplaa />
        </div>
        <Toaster />
        <SonnerToaster />
      </TooltipProvider>
    </QueryClientProvider>
  ),
})

// Create routes
const indexRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Explore,
})

const monstersRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/monsters',
  component: Monsters,
})

const monsterDetailRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/monsters/$id',
  component: MonsterDetail,
  parseParams: (params) => ({
    id: parseInt(params.id, 10),
  }),
})

const battlesRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/battles',
  component: Battles,
  validateSearch: (search: Record<string, unknown>) => ({
    enemyId: search.enemyId ? parseInt(search.enemyId as string, 10) : undefined,
  } as { enemyId?: number }),
})

const trainingRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/training',
  component: Training,
})

const profileRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
})

const notFoundRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
})

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  monstersRoute,
  monsterDetailRoute,
  battlesRoute,
  trainingRoute,
  profileRoute,
  notFoundRoute,
])

// Create router
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent' as const,
  defaultPreloadStaleTime: 0,
})

// Register for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => <RouterProvider router={router} />

export default App;