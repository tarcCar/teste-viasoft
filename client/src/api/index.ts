import axios from 'axios';

export default function setUpAxios(history:any) {
  setUpBaseURl();
  setUpInterceptors(history);
}

function setUpBaseURl() {
  axios.defaults.baseURL = process.env.REACT_APP_API
    ? process.env.REACT_APP_API
    : 'http://localhost:3001/';
}

/**
   * Configura um inteceptor que toda requisição feita para api
   * o axios automaticamente vai colocar o token to header Authorization
   * onde o servidor vai buscar o token para fazer a validação
   * @param history
   */
function setUpInterceptors(history:any) {
  axios.interceptors.request.use(
    (config) => {
      const newConfig = config;
      let token = localStorage.getItem('token');
      token = token ? `Bearer ${token}` : null;
      newConfig.headers = {
        Authorization: `${token}`,
      };
      return newConfig;
    },
    (error) => Promise.reject(error),
  );

  // Configura um inteceptor para todas as respostas da api do servidor
  // caso o erro seja do 401(Unauthorized) quer dizer que o token não é mais valido
  // e tela atual não seja o login, faz que volte pra tela de login
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401 && history.location !== '/login') {
        history.push({
          pathname: '/login',
          state: {
            mensagemSessaoExpirou:
                'Sua sessão expirou! por favor faça login novamente!',
          },
        });
      }

      return Promise.reject(error);
    },
  );
}
