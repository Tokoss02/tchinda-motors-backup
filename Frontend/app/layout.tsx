import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import BackToTop from "@/components/elements/BackToTop";
import "@/node_modules/react-modal-video/css/modal-video.css"
import "/public/assets/css/main.css"
import { Toaster } from 'react-hot-toast';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ComingSoon from "./coming-soon";
import Script from 'next/script';

const urbanist = Urbanist({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: "--urbanist",
  display: 'swap',
})

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: "Used & Brand New Cars for Sale in Dubai | Car Export Worldwide | Tchinda Motors",

  description:
    "Buy used and brand new cars in Dubai from Tchinda Motors. Explore luxury SUVs, sedans and sports cars with worldwide export to Africa, Europe, Asia and reliable international shipping.",

  applicationName: "Tchinda Motors",

  authors: [
    {
      name: "Tchinda Motors",
      url: "http://localhost:3000",
    },
  ],

  creator: "Tchinda Motors",
  category: "Automotive",
  publisher: "Tchinda Motors",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "http://localhost:3000",
    siteName: "Tchinda Motors",
    title: "Used & Brand New Cars for Sale in Dubai | Export Worldwide",
    description:
      "Luxury cars, SUVs and commercial vehicles exported worldwide from Dubai.",

    images: [
      {
        url: "http://localhost:3000/assets/imgs/template/Tchinda-motors-Logo-web.jpg",
        width: 1200,
        height: 630,
        alt: "Tchinda Motors",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tchinda Motors Dubai",
    description:
      "Trusted Dubai dealership exporting used and new cars to Africa and worldwide.",
    images: [
      "http://localhost:3000/assets/imgs/template/Tchinda-motors-Logo-web.jpg",
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

        {/* GEO SEO */}
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />


        {/* Social Profiles */}
        <link rel="me" href="https://www.facebook.com/TchindaMotorsFze" />
        <link rel="me" href="https://www.youtube.com/@TchindaMotors" />
        <link rel="me" href="https://www.tiktok.com/@tchindamotors" />
        <link rel="me" href="https://www.instagram.com/tchindamotors" />
        <link rel="me" href="https://x.com/tchindamotors" />

        {/* Business Schema */}
        <Script
          id="autodealer-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({

              "@context": "https://schema.org",
              "@type": "AutoDealer",
              "name": "Tchinda Motors",
              "url": "http://localhost:3000",
              "telephone": "+971523117757",
              "email": "info@tchindamotors.com",
              "logo": "http://localhost:3000/assets/imgs/template/Tchinda-motors-Logo-web.jpg",
              "description":
                "Used and brand new cars dealership in Dubai exporting worldwide.",
              "currenciesAccepted": "AED, USD",
              "paymentAccepted": "Cash, Bank Transfer",

              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dubai",
                "addressCountry": "AE"
              },

              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "25.2048",
                "longitude": "55.2708"
              },

              "areaServed": [
                "United Arab Emirates",
                "Africa",
                "Europe",
                "Asia"
              ],


              "sameAs": [
                "https://www.facebook.com/tchindaMotors",
                "https://www.youtube.com/@tchindaMotors",
                "https://www.tiktok.com/@tchindamotors",
                "https://www.instagram.com/tchindamotors",
                "https://x.com/tchindamotors",
                "https://www.linkedin.com/company/tchindamotors"
              ]
            })
          }}
        />

              {/* Website Schema */}
              <Script
                id="website-schema"
                strategy="afterInteractive"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      "url": "http://localhost:3000",
                      "name": "Tchinda Motors",
                      "potentialAction": {
                        "@type": "SearchAction",
                        "target": "http://localhost:3000/cars?search={search_term_string}",
                        "query-input": "required name=search_term_string"
                      }

                  })
                }}
              />

              <Script
                id="organization-schema"
                strategy="afterInteractive"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      "name": "Tchinda Motors",
                      "url": "http://localhost:3000",
                      "logo": "http://localhost:3000/assets/imgs/template/Tchinda-motors-Logo-web.jpg",

                      "sameAs": [
                        "https://www.facebook.com/tchindaMotors",
                        "https://www.youtube.com/@tchindaMotors",
                        "https://www.tiktok.com/@tchindamotors",
                        "https://www.instagram.com/tchindamotors",
                        "https://x.com/tchindamotors",
                        "https://www.linkedin.com/company/tchindamotors"
                      ]
                  })
                }}
              />


              {/* Facebook Pixel */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}
                    (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '758171490078971');
                    fbq('track', 'PageView');
                    `
                }}
              />

              {/* Google Analytics */}
              <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-EC6VB11EY5"
              />

              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-EC6VB11EY5', {
      page_path: window.location.pathname,
      });
      `
                }}
              />

              {/* Google Tag Manager */}
              <Script
                id="gtm-head"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-NVMKF5TL');
      `
                }}
              />



      </head>

      <body className={urbanist.variable}>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NVMKF5TL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {isMaintenance ? (
          <ComingSoon />
        ) : (
          <>
            {children}
            <BackToTop />
            <Toaster position="top-right" reverseOrder={false} />
          </>
        )}
      </body>
    </html>
  )
}
