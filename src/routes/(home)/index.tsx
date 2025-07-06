import { createFileRoute } from '@tanstack/react-router'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel } from '@ionic/react'
import { ThemeSelector, useTheme } from '@/features/theme'

export const Route = createFileRoute('/(home)/')({
  component: Index,
})

function Index() {
  const { theme, resolvedTheme } = useTheme()
  
  return (
    <div>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Welcome to LiftTimer!</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Your workout timing companion built with Ionic React and Capacitor.</p>
          <p className="mt-4">Select Timer from the navigation to start tracking your workout.</p>
          
          <IonItem className="mt-4">
            <IonLabel>Theme</IonLabel>
            <ThemeSelector />
          </IonItem>
          
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--color-text-inverse)',
            borderRadius: 'var(--radius-md)'
          }}>
            Test: This should change color with theme
          </div>
          
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            Current theme: {theme} (resolved: {resolvedTheme})
          </p>
        </IonCardContent>
      </IonCard>
    </div>
  )
}