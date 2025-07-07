import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ThemeSelector, useTheme } from '@/features/theme'
import styles from './home.module.scss'

export const Route = createFileRoute('/(home)/')({
  component: Index,
})

function Index() {
  const { theme, resolvedTheme } = useTheme()
  
  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to LiftTimer!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your workout timing companion built with React and Capacitor.</p>
          <p className={styles.highlight}>Select Timer from the navigation to start tracking your workout.</p>
          
          <div className={styles.themeSection}>
            <label htmlFor="theme-select" className={styles.label}>Theme</label>
            <ThemeSelector />
          </div>
          
          <div className={styles.themeTest}>
            Test: This should change color with theme
          </div>
          
          <p className={styles.themeInfo}>
            Current theme: {theme} (resolved: {resolvedTheme})
          </p>
        </CardContent>
      </Card>
    </div>
  )
}