import Keycloak from 'keycloak-js';

const config = {
    base_server: "http://192.168.0.142:8080",
    base_server1: "http://localhost:8080",
  };
  

const keycloakConfig = {
    url: config.base_server1,
    realm: 'development',
    clientId: 'hrms-react',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;