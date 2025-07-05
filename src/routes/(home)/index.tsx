import { createFileRoute } from '@tanstack/react-router'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'

export const Route = createFileRoute('/(home)/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Welcome to LiftTimer!</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Your workout timing companion built with Ionic React and Capacitor.</p>
          <p className="mt-4">Select Timer from the navigation to start tracking your workout.</p>
        </IonCardContent>
      </IonCard>
    </div>
  )
}