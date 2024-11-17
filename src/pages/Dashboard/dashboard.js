import './dashboard.css';
const picture = require("../../asset/image/welcome.png");

const DashboardPage = () => {
    return (
        <div className="image-container">
            <img  className="welcome-img" src={picture} alt="Dashboard" />
        </div>
    );
};

export default DashboardPage;
