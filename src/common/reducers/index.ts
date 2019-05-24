import user, { State as userState, initialState as userInit } from './user';

export interface RootState {
  user: userState;
}

export const initialState = {
  user: userInit
};

const rootReducer = {
  user
};

export default rootReducer;
