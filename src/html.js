import React from 'react'

const HTML = ({
  htmlAttributes = {},
  headComponents,
  bodyAttributes = {},
  preBodyComponents,
  body,
  postBodyComponents
}) => (
  <html lang="en" {...htmlAttributes}>
    <head>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line quotes
          __html: `window.dataLayer = window.dataLayer || [];window.dataLayer.push((() => ({ 'ze-snippet-key': 'c73ce1ed-aa7e-441c-8183-962c81c04dcf' }))()); (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl+'';f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer', 'GTM-KZS6Z55');`,
        }}
      />
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <noscript key="noscript" id="gatsby-noscript">
        This app works best with JavaScript enabled.
      </noscript>
      <div
        key="body"
        id="___gatsby"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {postBodyComponents}
    </body>
  </html>
)

export default HTML
