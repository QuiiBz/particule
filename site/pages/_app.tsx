import React, { FC } from 'react';
import type { AppProps } from 'next/app';
import 'nextra-theme-docs/style.css';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
