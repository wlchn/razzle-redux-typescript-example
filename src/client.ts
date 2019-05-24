import './client.scss';

import { hydrateClient } from '@wlchn/razzle-redux-typescript';
import rootReducer, { RootState } from './common/reducers';
import routes from './common/routes';
import transit from 'transit-immutable-js';

hydrateClient<RootState, any>(rootReducer, routes, transit.fromJSON)
  .then(() => {
    const jssStyles = document.getElementById('server-side-styles');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  })
  .catch((error: Error) => {
    console.error(error.message);
  });
