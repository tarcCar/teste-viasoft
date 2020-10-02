import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import usuarioReducer from './usuarioReducer';
import pontoManterReducer from './pontoManterReducer';
import pontoMelhorarReducer from './pontoMelhorarReducer';

const rootReducer = combineReducers({
  loginReducer,
  usuarioReducer,
  pontoManterReducer,
  pontoMelhorarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
