import React from 'react';
import { useTheme } from '../hooks/use-theme';
import { IonButton, IonIcon, IonSelect, IonSelectOption } from '@ionic/react';
import { moon, sunny, colorPalette } from 'ionicons/icons';

export function ThemeSwitcher() {
  const { theme, setTheme, themes, isDark } = useTheme();

  return (
    <div className="theme-switcher">
      <IonButton
        fill="clear"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label="Toggle theme"
      >
        <IonIcon icon={isDark ? sunny : moon} />
      </IonButton>
    </div>
  );
}

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <IonSelect
      value={theme}
      onIonChange={(e) => setTheme(e.detail.value)}
      interface="popover"
      placeholder="Select theme"
    >
      <IonSelectOption value="system">System</IonSelectOption>
      {themes.map((t) => (
        <IonSelectOption key={t.name} value={t.name}>
          {t.displayName}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
}