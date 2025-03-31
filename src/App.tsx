import Chat from '@/components/Chat/Chat';
import Settings from '@/components/Settings/Settings';
import { SettingsProvider } from '@/contexts/settings.context';
import { CssVarsProvider } from '@mui/joy';
import styles from './App.module.css';

function App() {
  return (
    <CssVarsProvider defaultMode='dark'>
      <SettingsProvider>
        <div className={styles.app}>
          <Settings />
          <Chat />
        </div>
      </SettingsProvider>
    </CssVarsProvider>
  );
}

export default App;
