import {FC, useState} from "react"
import "./index.css"

import {BiSolidPencil} from "react-icons/bi"
import {BsTrashFill} from "react-icons/bs"
import {BsCheckSquare} from "react-icons/bs"
import {BsCheckSquareFill} from "react-icons/bs"
import {Todo} from "../../utils/types"
import { updateRequest } from "../../utils/requests"

type ToDoProps = {
    todo: Todo;
    setIsDeleteTodoModalOpened: (value : boolean) => void;
    setDeleteTodoId: (id: number) => void;
}

const ToDo : FC < ToDoProps > = ({todo, setIsDeleteTodoModalOpened, setDeleteTodoId}) => {

    const {priority, description, id} = todo
    const [isCompleted, setIsCompleted] = useState<boolean>(todo.completed)

    const handleCompleted = async () => {
        setIsCompleted(prev => !prev)
        try {
            await updateRequest(`/todos/${id}/update`, {completed: !isCompleted})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="todo">
            <div>
                <div className="priority">{priority.toLowerCase()}</div>
                <div>{isCompleted
                        ? <div onClick={handleCompleted}>
                                <BsCheckSquareFill size={28} color="black"/>
                            </div>
                        : <div onClick={handleCompleted}>
                            <BsCheckSquare size={28} color="black"/>
                        </div>}
                </div>
            </div>
            <div>
                <div className="content">{description}</div>
                <div className="icons">
                    <BiSolidPencil size={25} color="black"/>
                    <div
                        onClick={() => {
                        setIsDeleteTodoModalOpened(true);
                        setDeleteTodoId(id)
                    }}>
                        <BsTrashFill size={25} color="black"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDo