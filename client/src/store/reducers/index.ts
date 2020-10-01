import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import usuarioReducer from './usuarioReducer';

const rootReducer = combineReducers({
  loginReducer,
  usuarioReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
