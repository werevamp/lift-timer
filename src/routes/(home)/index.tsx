import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import styles from './home.module.scss'

export const Route = createFileRoute('/(home)/')({
  component: Index,
})

function Index() {
  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to LiftTimer!</CardTitle>
        </CardHeader>
        <CardContent>this should be the eventual timer page.</CardContent>
      </Card>
    </div>
  )
}
