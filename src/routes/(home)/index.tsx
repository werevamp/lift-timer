import { createFileRoute } from '@tanstack/react-router'
import { HomeView } from '@/features/home'

export const Route = createFileRoute('/(home)/')({
  component: HomePage,
})

function HomePage() {
  return <HomeView />
}
