import { DocumentProps } from 'razzle-redux-typescript';
import React from 'react';
import { _env } from './lib/env';
import { Helmet } from 'react-helmet';
import transit from 'transit-immutable-js';

const helmet = Helmet.renderStatic();

class Document extends React.Component<DocumentProps> {
  public render() {
    const { assets, html, initialState } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>razzle-redux-typescript-example</title>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
            rel="stylesheet"
          />
          {assets.client.css ? <link rel="stylesheet" href={assets.client.css} /> : ''}

          {helmet.link.toComponent()}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/reconnecting-websocket/1.0.0/reconnecting-websocket.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js" />
        </head>
        <body {...bodyAttrs}>
          <div
            id="root"
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
          <script
            id="server-app-state"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: transit.toJSON({ initialState })
            }}
          />
          <script type="text/javascript" src={assets.client.js} defer={true} crossOrigin="anonymous" />
          <script
            id="window-env"
            dangerouslySetInnerHTML={{
              __html: 'window.env = ' + JSON.stringify(_env)
            }}
          />
        </body>
      </html>
    );
  }
}

export default Document;
