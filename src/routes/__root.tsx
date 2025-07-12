import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeSwitcher } from '@/features/theme'
import Header from '@/components/layout/header/Header'

/* Import our custom styles */
import '../index.scss'

export const Route = createRootRoute({
  component: () => (
    <div className="app-container">
      <Header />
      <header className="app-header">
        <ThemeSwitcher />
      </header>
      <main className="app-content">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
})
