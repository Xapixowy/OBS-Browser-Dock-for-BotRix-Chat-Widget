import { getContrastColorByHexColor } from '@/functions/getContrastColorByHexColor.function';
import { StorageService } from '@/services/storage.service';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type ChatLinkType = string;
export type BackgroundColorType = string;

export type SettingsContextType = {
  chatLink: ChatLinkType;
  backgroundColor: BackgroundColorType;
};

export type SettingsContextSettersType = {
  setChatLink: (link: ChatLinkType) => void;
  setBackgroundColor: (color: BackgroundColorType) => void;
};

export const SettingsContext = createContext<(SettingsContextType & SettingsContextSettersType) | undefined>(undefined);

export const useSettingsContext = (): SettingsContextType & SettingsContextSettersType => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }

  return context;
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const storage = StorageService.instance;

  const [chatLink, setChatLink] = useState<ChatLinkType>(storage.chatLink ?? '');
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColorType>(storage.backgroundColor ?? '#09090b');

  const chatLinkSetter = (link: ChatLinkType): void => {
    setChatLink(link);
    storage.chatLink = link;
  };

  const backgroundColorSetter = (color: BackgroundColorType): void => {
    setBackgroundColor(color);
    storage.backgroundColor = color;
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-background', backgroundColor);
    root.style.setProperty(
      '--color-font',
      getContrastColorByHexColor(backgroundColor, 'var(--color-dark)', 'var(--color-light)'),
    );
  }, [backgroundColor]);

  return (
    <SettingsContext.Provider
      value={{
        chatLink,
        setChatLink: chatLinkSetter,
        backgroundColor,
        setBackgroundColor: backgroundColorSetter,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
