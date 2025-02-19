import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({children}) => {
    const userData = useSelector((state) => state.userSlice.userData);
    if (!userData) {
        return <Navigate to={"/login"} replace={true}/>;
    }
    return children;
}


export default PrivateRoute;