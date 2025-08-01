import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeSwitcher } from '@/features/theme'
import Header from '@/components/layout/header/Header'
import { TimerSessionProvider } from '@/contexts/timer-session'

/* Import our custom styles */
import '../index.scss'

export const Route = createRootRoute({
  component: () => (
    <TimerSessionProvider>
      <div className="app-container">
        <Header />
        <main className="app-content">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </TimerSessionProvider>
  ),
})
