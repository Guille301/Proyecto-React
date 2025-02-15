import { Navigate } from "react-router-dom";

const PrivateRoute = ({userData, children}) => {
    if (!userData) {
        return <Navigate to={"/login"} replace={true}/>;
    }
    return children;
}


export default PrivateRoute;