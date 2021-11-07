/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

export default {
  github: 'https://github.com/QuiiBz/particule',
  docsRepositoryBase: 'https://github.com/QuiiBz/particule/blob/main/site',
  titleSuffix: ' – Particule',
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">Particule</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Fine-grained atomic React state management library
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Fine-grained atomic React state management library" />
      <meta name="og:description" content="Fine-grained atomic React state management library" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:image" content="https://nextra.vercel.app/og.png" />
      <meta name="twitter:site:domain" content="nextra.vercel.app" />
      <meta name="twitter:url" content="https://nextra.vercel.app" /> */}
      <meta name="og:title" content="Fine-grained atomic React state management library" />
      {/* <meta name="og:image" content="https://nextra.vercel.app/og.png" /> */}
      <meta name="apple-mobile-web-app-title" content="Particule" />
      {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" /> */}
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: 'Edit this page on GitHub',
  footerText: <>MIT {new Date().getFullYear()} © Tom Lienard. Deployed on Vercel</>,
};
