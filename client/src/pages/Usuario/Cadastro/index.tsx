import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Formik, FormikProps } from "formik";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { saveUsuarioAction } from "../../../store/actions/usuario/usuarioActions";
import { RootState } from "../../../store/reducers";
import { Usuario } from "../../../types/usuario";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  field: {
    marginBottom: theme.spacing(1),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

interface UsuarioForm extends Usuario {}

const initialValues: UsuarioForm = {};

const CadastroUsuario: React.FC = () => {
  const formRef = useRef<FormikProps<UsuarioForm> | null>(null);
  const classes = useStyles();
  const loading = useSelector(
    (state: RootState) => state.usuarioReducer.loadingSaveUsuario
  );
  const erroSaveUsuario = useSelector(
    (state: RootState) => state.usuarioReducer.erroSaveUsuario
  );
  const usuarioSalvo = useSelector(
    (state: RootState) => state.usuarioReducer.usuarioSalvo
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (usuarioSalvo) {
      history.goBack();
    }
  }, [usuarioSalvo]);

  const onSubmitCadastro = async (values: Usuario) => {
    if (values) {
      dispatch(saveUsuarioAction(values));
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Card style={{ marginTop: 20 }}>
        <CardHeader title="Cadastro de Usuário" />
        <CardContent>
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validate={(values) => {
              const errors: any = {};
              if (!values.login) {
                errors.login = "Login é obrigatório";
              }
              if (!values.nome) {
                errors.nome = "Nome é obrigatório";
              }

              if (!values.senha) {
                errors.senha = "Senha é obrigatória";
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
            }) => (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Paper className={classes.paper}>
                  {erroSaveUsuario && (
                    <Alert severity="error">{erroSaveUsuario}</Alert>
                  )}

                  <TextField
                    className={classes.field}
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    id="nome"
                    name="nome"
                    autoComplete="nome"
                    placeholder="Digite o nome do usuário"
                    onChange={handleChange}
                    onSelect={handleChange}
                    onBlur={handleBlur}
                    value={values.nome}
                    error={errors.nome ? true : false && touched.nome}
                    helperText={errors.nome}
                  />
                  <TextField
                    className={classes.field}
                    label="Login"
                    variant="outlined"
                    placeholder="Digite o login"
                    fullWidth
                    id="login"
                    name="login"
                    autoComplete="login"
                    onChange={handleChange}
                    onSelect={handleChange}
                    onBlur={handleBlur}
                    value={values.login}
                    error={errors.login ? true : false && touched.login}
                    helperText={errors.login}
                  />
                  <TextField
                    className={classes.field}
                    label="Senha"
                    variant="outlined"
                    placeholder="Digite a senha"
                    fullWidth
                    id="senha"
                    name="senha"
                    autoComplete="senha"
                    type="password"
                    onChange={handleChange}
                    onSelect={handleChange}
                    onBlur={handleBlur}
                    value={values.senha}
                    error={errors.senha ? true : false && touched.senha}
                    helperText={errors.senha}
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
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </Button>
                </Paper>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CadastroUsuario;
