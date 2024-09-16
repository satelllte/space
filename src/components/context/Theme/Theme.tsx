import {createContext, useContext, useEffect, useState} from 'react';

type TTheme = 'dark' | 'light' | undefined; // "undefined" means it's not loaded yet
type TThemeContext = [TTheme, React.Dispatch<React.SetStateAction<TTheme>>];

const ThemeContext = createContext<TThemeContext | undefined>(undefined);

type ThemeProps = {children: React.ReactNode};

export function Theme({children}: ThemeProps) {
  const state = useState<TTheme>(undefined);
  const [theme, setTheme] = state;

  useEffect(() => {
    const _theme = window.localStorage.getItem('theme');
    const theme = _theme === 'dark' ? 'dark' : 'light';
    setTheme(theme);
  }, []);

  useEffect(() => {
    if (!theme) return;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage) return;
      if (event.key !== 'theme') return;

      const themeNew = event.newValue;
      if (themeNew !== 'dark' && themeNew !== 'light') return;

      setTheme(themeNew);
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  );
}

export const useThemeState = (): TThemeContext => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error(
      'Can\'t access "useTheme" outside of "Theme" component tree',
    );
  return ctx;
};

export const useTheme = (): TTheme => {
  const [theme] = useThemeState();
  return theme;
};
