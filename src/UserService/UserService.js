import _kc from './keycloak.js'

const doLogin = _kc.login;

const doLogout = _kc.logout;


const account = _kc.accountManagement;


const getToken = () => _kc.token;

const getrole = () => JSON.stringify(_kc.tokenParsed?.realm_access.roles);

const refreshToken = () => _kc.refreshToken;

const isLoggedIn = () => !!_kc.token;
const LoggedIn = () => _kc.token;
const updateToken = (successCallback) =>
  _kc.updateToken(60)
    .then(successCallback)
    .catch(doLogin());


const getUsername = () => _kc.tokenParsed?.preferred_username;
const getLastname = () => _kc.tokenParsed?.family_name;
const getEmail = () => _kc.tokenParsed?.email;
const authenticated = () => _kc.authenticated;
const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));



const UserService = {
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  refreshToken,
  getLastname,
  LoggedIn,
  getEmail,
  authenticated,
  account,
  getrole
};

export default UserService;