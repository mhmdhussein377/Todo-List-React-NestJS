import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({user, redirectPath = "/login"}) => {
    if(!user || typeof user !== "object" || !user.id) {
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}

export default ProtectedRoute
