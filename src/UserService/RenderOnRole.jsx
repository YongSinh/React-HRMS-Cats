import PropTypes from "prop-types";
import UserService from "./UserService";
// import NotAllowed from "../Page/Error/Error";
// import NotAllowed from '../Components/NotAllowed/NotAllowed';
import NotAllowed from "./NotAllowed";
// const RenderOnRole = ({ roles, showNotAllowed, children }) =>
//   UserService.hasRole(roles) ? (
//     children
//   ) : showNotAllowed ? (
//     <NotAllowed />
//   ) : null;

// RenderOnRole.propTypes = {
//   roles: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// export default RenderOnRole;


const RenderOnRole = ({ roles = [], showNotAllowed, disabled, children }) => {
  if (disabled) {
    return null;
  }

  const matchedRole = roles.find(role => UserService.hasRole([role]));

  if (matchedRole) {
    console.log("Matched Role:", matchedRole); // Check if the role is matched correctly

    // Call `children` as a function with the matched role
    return typeof children === 'function' ? children({ role: matchedRole }) : children;
  }

  return showNotAllowed ? <NotAllowed /> : null;
};

RenderOnRole.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  showNotAllowed: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
};

RenderOnRole.defaultProps = {
  showNotAllowed: false,
  disabled: false,
};

export default RenderOnRole;
