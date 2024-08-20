import { Navigate } from "react-router-dom";

import { isAdmin } from "../../../services/LoginService";

const AdminProtected: React.FC<any> = (props) => {
    
    if (!isAdmin()) {
        return <Navigate to="/home" replace />;
    }

    return props.children;
};
export default AdminProtected;