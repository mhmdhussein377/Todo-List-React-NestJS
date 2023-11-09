import { FC } from "react"
import ToDo from "../ToDo/ToDo"
import "./index.css"

const ToDos: FC = () => {
    return (
        <div className="todos">
            <h2>Today</h2>
            <ToDo />
            <ToDo />
            <ToDo />
            <ToDo />
            <ToDo />
        </div>
    )
}

export default ToDos