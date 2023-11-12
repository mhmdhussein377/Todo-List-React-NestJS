import {FC, useState} from "react"
import "./index.css"

import {BiSolidPencil} from "react-icons/bi"
import {BsTrashFill} from "react-icons/bs"
import {BsCheckSquare} from "react-icons/bs"
import {BsCheckSquareFill} from "react-icons/bs"
import {Todo} from "../../utils/types"
import {updateRequest} from "../../utils/requests"

type ToDoProps = {
    todo: Todo;
    setIsDeleteTodoModalOpened: (value : boolean) => void;
    setDeleteTodoId: (id : number) => void;
    setIsUpdateTodoModalOpened: (value : boolean) => void;
    setUpdatedTodo: (todo : Todo) => void;
}

const ToDo : FC < ToDoProps > = ({todo, setIsDeleteTodoModalOpened, setDeleteTodoId, setIsUpdateTodoModalOpened, setUpdatedTodo}) => {

    const {priority, description, id} = todo
    const [isCompleted, setIsCompleted] = useState < boolean > (todo.completed)

    const handleCompleted = async() => {
        setIsCompleted(prev => !prev)
        try {
            await updateRequest(`/todos/${id}/update`, {
                completed: !isCompleted
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditIconClick = () => {
        setIsUpdateTodoModalOpened(true);
        setUpdatedTodo(todo)
    }

    const handleDeleteIconClick = () => {
        setIsDeleteTodoModalOpened(true);
        setDeleteTodoId(id)
    }

    return (
        <div className="todo">
            <div>
                <div className="priority">{priority.toLowerCase()}</div>
                <div>
                    <div onClick={handleCompleted}>
                        {isCompleted
                            ? <BsCheckSquareFill size={28} color="black"/>
                            : <BsCheckSquare size={28} color="black"/>}
                    </div>
                </div>
            </div>
            <div>
                <div className="content">{description}</div>
                <div className="icons">
                    <div
                        onClick={handleEditIconClick}>
                        <BiSolidPencil size={25} color="black"/>
                    </div>
                    <div
                        onClick={handleDeleteIconClick}>
                        <BsTrashFill size={25} color="black"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDo