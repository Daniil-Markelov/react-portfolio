import { useLocation } from "react-router-dom";

const PageNotFound = () => {
    let location= useLocation();
    return (
        <div>
            <h1>Page Not Found</h1>
        </div>
    );
};

export default PageNotFound;