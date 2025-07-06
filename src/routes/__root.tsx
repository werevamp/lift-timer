import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  setupIonicReact,
} from '@ionic/react'
import { Link } from '@tanstack/react-router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Import our custom styles AFTER Ionic's styles */
import '../index.scss'

setupIonicReact()

export const Route = createRootRoute({
  component: () => (
    <IonApp className="ion-page">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>LiftTimer</IonTitle>
            <IonButtons slot="end">
              <Link to="/">
                <IonButton>Home</IonButton>
              </Link>
              <Link to="/timer">
                <IonButton>Timer</IonButton>
              </Link>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <Outlet />
        </IonContent>
      </IonPage>
      <TanStackRouterDevtools />
    </IonApp>
  ),
})

