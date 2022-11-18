import React, { createContext, useContext } from 'react';

interface ContextType {
  locale?: any;
  children?: React.ReactNode;
}

export const LocaleContext = createContext<ContextType>({});

export const LocaleProvider = ({ children, locale }: ContextType) => (
  <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>
);

/**
 * 获取当前地区配置
 */
export const useLocale = () => useContext(LocaleContext);