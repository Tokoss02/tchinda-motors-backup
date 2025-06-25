declare module 'next-i18next.config' {
  const config: {
    i18n: {
      defaultLocale: string;
      locales: string[];
      localeDetection: boolean;
    };
    localePath: string;
  };
  export default config;
}
