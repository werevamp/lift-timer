import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from '@/features/theme'

// Create a new router instance
const router = createRouter({ routeTree })

function App() {
  return <div>hello jess</div>
}

export default App
