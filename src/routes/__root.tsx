import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Link } from '@tanstack/react-router'

/* Import our custom styles */
import '../index.scss'

export const Route = createRootRoute({
  component: () => (
    <div className="app-container">
      <main className="app-content">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
})

