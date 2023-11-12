import {Route, Routes} from "react-router-dom"
import { routes } from "./utils/Route"

function App() {

    return (
        <Routes>
            {routes.map(({path, element}, index) => (<Route key={index} path={path} element={element}/>))}
        </Routes>
    )
}

export default App