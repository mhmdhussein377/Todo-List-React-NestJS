import { FC } from "react"
import ToDo from "../ToDo/ToDo"
import "./index.css"
import { ToDosProps } from "../../utils/types"

const ToDos: FC<ToDosProps> = ({date, todos, setIsDeleteTodoModalOpened, setDeleteTodoId}) => {

    return (
        <div className="todos">
            <h2>{date}</h2>
            {todos.map((todo, index) => (
                <ToDo key={index} todo={todo} setIsDeleteTodoModalOpened={setIsDeleteTodoModalOpened} setDeleteTodoId={setDeleteTodoId} />
            ))}
        </div>
    )
}

export default ToDos