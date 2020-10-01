import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import usuarioReducer from './usuarioReducer';
import pontoManterReducer from './pontoManterReducer';

const rootReducer = combineReducers({
  loginReducer,
  usuarioReducer,
  pontoManterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
