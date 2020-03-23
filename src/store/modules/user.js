import router from '../../router'
import {HOME_PATH, LOGIN_PATH} from '../../shared/const'

const actions = {
  login({commit },{username, password})  { // eslint-disable-line no-unused-vars
    if (username && password) {
      localStorage.setItem('token', '123456');
      router.push({path: HOME_PATH}) ;
    }
  },
  logout() {
    localStorage.removeItem('token');
    router.push({path: LOGIN_PATH});
  },
}

export default {
  actions
};
