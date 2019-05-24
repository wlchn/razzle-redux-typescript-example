import express from 'express';
import { createServer } from '@wlchn/razzle-redux-typescript';
import rootReducer, { RootState, initialState } from './common/reducers';
import routes from './common/routes';
import Document, { DocumentExtraProps } from './common/Document';
import morgan from 'morgan';
import { SheetsRegistry } from 'react-jss';

const styleSheets = new SheetsRegistry();

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');

const serverConfig = createServer<RootState, any, DocumentExtraProps>({
  document: { Component: Document, props: { styleSheets } },
  initialState,
  razzleAssets,
  rootReducer,
  routes
});

const server = express();

server.use(morgan('common'));

server.get('/ping', (req, res) => res.send('pong'));

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', serverConfig);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default server;
