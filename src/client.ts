import './common/styles/global.scss';

import { hydrateClient } from '@wlchn/razzle-redux-typescript';
import rootReducer, { RootState } from './common/reducers';
import routes from './common/routes';
import transit from 'transit-immutable-js';

hydrateClient<RootState, any>(rootReducer, routes, transit.fromJSON, null).catch((error: Error) => {
  console.error(error.message);
});
