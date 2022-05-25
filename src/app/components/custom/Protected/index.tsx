import { Navigate } from "react-router-dom";

const Protected: React.FC<any> = (props) => {
    
    if (!props.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return props.children;
};
export default Protected;