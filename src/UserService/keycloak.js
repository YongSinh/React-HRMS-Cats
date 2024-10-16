import Keycloak from 'keycloak-js';

const config = {
    base_server: "http://192.168.100.100:8080",
    base_server1: "https://localhost:8080",
    image_path: "",
    version: 1,
  };
  

const keycloakConfig = {
    url: config.base_server,
    realm: 'development',
    clientId: 'hrms-react',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;