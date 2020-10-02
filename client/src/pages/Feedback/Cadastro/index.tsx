import {
  Button,
  CircularProgress,
  Container, makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import InputPontoManter from '../../../components/PontoManter/Input';
import SelectUsuario from '../../../components/Usuario/Select';
import { RootState } from '../../../store/reducers';
import { Feedback } from '../../../types/feedback';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

interface FeedbackForm extends Feedback {

}

const initialValues: FeedbackForm = {
  pontosManter: [],
  pontosMelhorar: [],
};

const CadastroFeedback: React.FC = () => {
  const classes = useStyles();
  const loading = useSelector((state:RootState) => state.usuarioReducer.loadingSaveUsuairo);
  const erroSaveUsuario = useSelector((state:RootState) => state.usuarioReducer.erroSaveUsuario);
  return (
    <Container component="main" maxWidth="lg">
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors:any = {};
          if (!values.feedBackFinal) {
            errors.feedBackFinal = 'Feedback final é obrigatório';
          }
          if (!values.usuarioDestino) {
            errors.usuarioDestino = 'Usuario é obrigatório';
          }

          if (!values.pontosManter || values.pontosManter.length <= 0) {
            errors.pontosManter = 'Selecionar pelo menos um ponto a manter';
          }

          return errors;
        }}
        onSubmit={(values) => {
          // onSubmitLogin(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          setFieldValue,
        }) => (
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            {erroSaveUsuario && <Alert severity="error">{erroSaveUsuario}</Alert>}
            <SelectUsuario
              label="Usuário"
              variant="outlined"
              required
              fullWidth
              id="usuarioDestino"
              name="usuarioDestino"
              autoComplete="usuarioDestino"
              autoFocus
              onChange={handleChange}
              onSelect={handleChange}
              onBlur={handleBlur}
              value={values.usuarioDestino}
              error={errors.usuarioDestino ? true : false && touched.usuarioDestino}
              errorText={errors.usuarioDestino}
            />

            <InputPontoManter
              fullWidth
              onPontosManterSelecionados={(value) => {
                setFieldValue('pontosManter', value);
              }}
              errorText={errors.pontosManter}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!isValid || loading}
            >
              Entrar
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>

          </form>
        )}
      </Formik>
    </Container>
  );
};

export default CadastroFeedback;
