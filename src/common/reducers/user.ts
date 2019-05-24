import { Map } from 'immutable';
import { ImmutableMap } from '../../../typings';

export type State = ImmutableMap<{
  user: ImmutableMap<any>;
}>;

export const initialState: State = Map({
  user: Map({})
});

export default (state: State = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return state.setIn(['user'], Map(action.payload.user));
    default:
      return state;
  }
};
