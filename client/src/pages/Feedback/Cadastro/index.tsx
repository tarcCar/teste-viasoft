import {
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import InputPontoManter from '../../../components/PontoManter/Input';
import InputPontoMelhorar from '../../../components/PontoMelhorar/Input';
import SelectUsuario from '../../../components/Usuario/Select';
import { saveFeedbacksAction } from '../../../store/actions/feedback/feedbackActions';
import { RootState } from '../../../store/reducers';
import { Feedback } from '../../../types/feedback';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
  field: {
    marginBottom: theme.spacing(1),
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
  const loading = useSelector((state:RootState) => state.feedbackReducer.loadingSaveFeedback);
  const erroSaveUsuario = useSelector((state:RootState) => state.feedbackReducer.erroSaveFeedback);
  const feedback = useSelector((state:RootState) => state.feedbackReducer.feedback);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (feedback) {
      history.push('/home');
    }
  }, [feedback]);

  const onSubmitCadastro = async (values:Feedback) => {
    if (values) {
      dispatch(saveFeedbacksAction(values));
    }
  };

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
          if (!values.pontosMelhorar || values.pontosMelhorar.length <= 0) {
            errors.pontosMelhorar = 'Selecionar pelo menos um ponto a melhorar';
          }

          return errors;
        }}
        onSubmit={(values) => {
          onSubmitCadastro(values);
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
            <Paper variant="outlined" className={classes.paper}>

              {erroSaveUsuario && <Alert severity="error">{erroSaveUsuario}</Alert>}
              <SelectUsuario
                className={classes.field}
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
              <InputPontoMelhorar
                fullWidth
                onPontosMelhorarSelecionados={(value) => {
                  setFieldValue('pontosMelhorar', value);
                }}
                errorText={errors.pontosMelhorar}
              />
              <TextField
                className={classes.field}
                label="Sugestões"
                variant="outlined"
                fullWidth
                id="sugestoes"
                name="sugestoes"
                autoComplete="sugestoes"
                placeholder="Digite alguma sugestão"
                onChange={handleChange}
                onSelect={handleChange}
                onBlur={handleBlur}
                value={values.sugestoes}
                error={errors.sugestoes ? true : false && touched.sugestoes}
                helperText={errors.sugestoes}
                multiline
                rows={4}
              />
              <TextField
                className={classes.field}
                label="Feedback"
                variant="outlined"
                placeholder="Digite o feedback final"
                fullWidth
                id="feedBackFinal"
                name="feedBackFinal"
                autoComplete="feedBackFinal"
                onChange={handleChange}
                onSelect={handleChange}
                onBlur={handleBlur}
                value={values.feedBackFinal}
                error={errors.feedBackFinal ? true : false && touched.feedBackFinal}
                helperText={errors.feedBackFinal}
                multiline
                rows={4}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!isValid || loading}
              >
                Salvar
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Button>
            </Paper>

          </form>
        )}
      </Formik>
    </Container>
  );
};

export default CadastroFeedback;
