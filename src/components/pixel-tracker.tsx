"use client";

import Image from "next/image";
import Script from "next/script";

import { env } from "@/lib/env/client";

export function PixelTracker() {
  return (
    <>
      {/* Meta Pixel Script */}
      <Script
        strategy="afterInteractive"
        id="facebook-pixel"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
fbq('track', 'PageView');`,
        }}
      />
      <Script
        strategy="afterInteractive"
        id="facebook-pixel-track-15s"
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function() {
    fbq('trackCustom', 'TimeOnSite15s');
  }, 15000);`,
        }}
      />
      <noscript>
        <Image
          alt="facebook-pixel"
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
