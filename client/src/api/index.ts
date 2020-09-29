import axios from "axios"

export default function setUpAxios(history:any) {
    setUpBaseURl();
    setUpInterceptors(history);
  }
  
  function setUpBaseURl() {
    axios.defaults.baseURL = process.env.REACT_APP_API
      ? process.env.REACT_APP_API
      : 'http://localhost:3001/';
  }
  
  function setUpInterceptors(history:any) {
    axios.interceptors.request.use(
      function(config) {
        let token = localStorage.getItem('token');
        token = token ? 'Bearer ' + token : null;
        config.headers = {
          Authorization: `${token}`,
        };
        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
  
    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        if (error.response.status === 401 && history.location !== '/login') {
          history.push({
            pathname: '/login',
            state: {
              mensagemSessaoExpirou:
                'Sua sessão expirou! por favor faça login novamente!',
            },
          });
        } else if (error.status === 403) {
          if (history.location !== '/' && history.location !== '/dashboard')
            history.go(-1);
        }
  
        return Promise.reject(error);
      }
    );
  }