import { FC } from "react"
import ToDo from "../ToDo/ToDo"
import "./index.css"
import { ToDosProps } from "../../utils/types"

const ToDos: FC<ToDosProps> = ({date, todos}) => {

    return (
        <div className="todos">
            <h2>{date}</h2>
            {todos.map((todo, index) => (
                <ToDo key={index} todo={todo} />
            ))}
        </div>
    )
}

export default ToDos