import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const routes = [
    {
        path: "/register",
        element: <Register/>
    }, {
        path: "/login",
        element: <Login/>
    }
];