import {FC} from "react"
import "./index.css"

import {BiSolidPencil} from "react-icons/bi"
import {BsTrashFill} from "react-icons/bs"
import {BsCheckSquare} from "react-icons/bs"
import {BsCheckSquareFill} from "react-icons/bs"
import {Todo} from "../../utils/types"

type ToDoProps = {
    todo: Todo;
    setIsDeleteTodoModalOpened: (value : boolean) => void;
    setDeleteTodoId: () => void;
}

const ToDo : FC < ToDoProps > = ({todo, setIsDeleteTodoModalOpened, setDeleteTodoId}) => {

    const {priority, description, completed, id} = todo

    return (
        <div className="todo">
            <div>
                <div className="priority">{priority.toLowerCase()}</div>
                <div>{completed
                        ? <BsCheckSquareFill size={28} color="black"/>
                        : <BsCheckSquare size={28} color="black"/>}</div>
            </div>
            <div>
                <div className="content">{description}</div>
                <div className="icons">
                    <BiSolidPencil size={25} color="black"/>
                    <div onClick={() => {setIsDeleteTodoModalOpened(true); setDeleteTodoId(id)}}>
                        <BsTrashFill size={25} color="black"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDo