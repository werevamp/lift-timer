import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'
import { useState, useEffect, useRef } from 'react'
import styles from './TimerView.module.scss'

export function TimerView() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setTime(0)
    setIsRunning(false)
  }

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const ms = Math.floor((milliseconds % 1000) / 10)

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-4">
      <IonCard className={styles.timerCard}>
        <IonCardHeader>
          <IonCardTitle>Workout Timer</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="text-center">
            <h1 className={styles.timerDisplay}>{formatTime(time)}</h1>
            <div className={styles.buttonGroup}>
              <IonButton onClick={handleStartStop} color={isRunning ? 'danger' : 'primary'}>
                {isRunning ? 'Stop' : 'Start'}
              </IonButton>
              <IonButton onClick={handleReset} color="medium">
                Reset
              </IonButton>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  )
}