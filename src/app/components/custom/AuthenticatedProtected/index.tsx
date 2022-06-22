import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../../../services/LoginService";

const AuthenticatedProtected: React.FC<any> = (props) => {
    
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return props.children;
};
export default AuthenticatedProtected;