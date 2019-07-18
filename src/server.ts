import express from 'express';
import { createServer } from '@wlchn/razzle-redux-typescript';
import rootReducer, { RootState, initialState } from './common/reducers';
import routes from './common/routes';
import Document from './common/Document';
import morgan from 'morgan';

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');

const serverConfig = createServer<RootState, any, any>({
  document: { Component: Document, props: null },
  initialState,
  razzleAssets,
  rootReducer,
  routes,
  afterCreateStore: null,
  showErrorLogs: true
});

const server = express();

server.use(morgan('common'));

server.get('/ping', (req, res) => res.send('pong'));

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', (req, res) => {
    if (
      req.path.includes('%') ||
      req.path.includes('script') ||
      req.path.includes('.js') ||
      req.path.includes('.json')
    ) {
      res.redirect('/404');
    }
    res.append('X-XSS-Protection', '1; mode=block');
    res.append('X-Frame-Options', 'DENY');
    res.append('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.append('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.append('X-Content-Type-Options', 'nosniff');
    serverConfig(req, res);
  });

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default server;
