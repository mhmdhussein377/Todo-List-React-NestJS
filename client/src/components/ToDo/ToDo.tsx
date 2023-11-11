import { FC } from "react"
import "./index.css"

import {BiSolidPencil} from "react-icons/bi"
import {BsTrashFill} from "react-icons/bs"
import {PiFlagPennantFill} from "react-icons/pi"
import { Todo } from "../../utils/types"

interface  ToDoProps {
    todo: Todo
}

const ToDo: FC<ToDoProps> = ({todo}) => {

    const {priority, description} = todo

    return (
        <div className="todo">
            <div>
                <div className="priority">{priority.toLowerCase()}</div>
                <div><PiFlagPennantFill size={25} color="black" /></div>
            </div>
            <div>
                <div className="content">{description}</div>
                <div className="icons">
                    <BiSolidPencil size={25} color="black" />
                    <BsTrashFill size={25} color="black" />
                </div>
            </div>
        </div>
    )
}

export default ToDo