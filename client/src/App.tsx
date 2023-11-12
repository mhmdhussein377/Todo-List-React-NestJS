import {Route, Routes} from "react-router-dom"
import { routes } from "./utils/Route"
import { useAuth } from "./Context/AuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"
import Home from "./pages/Home/Home"

function App() {

    const {user} = useAuth()

    return (
        <Routes>
            {routes.map(({path, element}, index) => (<Route key={index} path={path} element={element}/>))}
            {/* Protected Routes */}
            <Route element={<ProtectedRoute user={user} />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    )
}

export default App