import {useThemeState} from '../../../context/Theme';
import {Button} from '../../../ui/Button';

export function ThemeToggle() {
  const [theme, setTheme] = useThemeState();

  const toggleTheme = () => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark' : 'light';
    });
  };

  if (!theme) return null;

  return (
    <Button
      size='xs'
      onClick={toggleTheme}
      aria-label={
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      }
    >
      {theme === 'light' ? 'Light' : 'Dark'}
    </Button>
  );
}
