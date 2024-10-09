import PropTypes from 'prop-types'
import UserService from "./UserService";
// import NotAllowed from "../Page/Error/Error";
// import NotAllowed from '../Components/NotAllowed/NotAllowed';

const RenderOnRole = ({ roles, showNotAllowed, children }) => (
  UserService.hasRole(roles)) ? children : showNotAllowed ? "NotAllowed" : null;

RenderOnRole.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default RenderOnRole