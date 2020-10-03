import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import Alert from "@material-ui/lab/Alert";
import { RootState } from "../../store/reducers";
import loginAction from "../../store/actions/login/loginActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();

  const loading = useSelector(
    (state: RootState) => state.loginReducer.loadingLogin
  );
  const loginSucesso = useSelector(
    (state: RootState) => state.loginReducer.login
  );
  const erroLogin = useSelector(
    (state: RootState) => state.loginReducer.erroLogin
  );

  const [mensagemErro, setMensagemErro] = useState<string>("");

  useEffect(() => {
    if (loginSucesso) {
      history.push("/home");
    }
  }, [loginSucesso]);

  useEffect(() => {
    if (location.state?.mensagemSessaoExpirou) {
      const mensagemSessaoExpirou = location.state
        .mensagemSessaoExpirou as string;
      setMensagemErro(mensagemSessaoExpirou);
    }
  }, [location]);

  useEffect(() => {
    setMensagemErro(erroLogin);
  }, [erroLogin]);

  const onSubmitLogin = async (values: { login: string; senha: string }) => {
    await dispatch(await loginAction(values.login, values.senha));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entre
        </Typography>
        <Formik
          initialValues={{ login: "", senha: "" }}
          validate={(values) => {
            const errors: any = {};
            if (!values.login) {
              errors.login = "Login é obrigatório";
            }
            if (!values.senha) {
              errors.senha = "Senha é obrigatória";
            } else if (values.senha.length < 6) {
              errors.senha = "Senha precisa ter 6 ou mais caracteres";
            }
            return errors;
          }}
          onSubmit={(values) => {
            onSubmitLogin(values);
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
              {mensagemErro && <Alert severity="error">{mensagemErro}</Alert>}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login"
                label="Login"
                name="login"
                autoComplete="login"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.login}
                error={errors.login !== undefined && touched.login}
                helperText={errors.login}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.senha}
                error={errors.senha !== undefined && touched.senha}
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
                Entrar
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/usuario/cadastro" variant="body2">
                    Não tem conta? clique aqui para criar
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
