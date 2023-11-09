import {BiSolidPencil} from "react-icons/bi"
import {BsTrashFill} from "react-icons/bs"
import {PiFlagPennantFill} from "react-icons/pi"

const ToDo = () => {
    return (
        <div className="todo">
            <div>
                <div className="priority">Low</div>
                <div><PiFlagPennantFill /></div>
            </div>
            <div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet odio corporis inventore doloribus assumenda voluptas esse blanditiis unde molestias placeat, eaque dolore libero nisi pariatur non praesentium repellat. Ex, non?</div>
                <div className="icons">
                    <BiSolidPencil />
                    <BsTrashFill />
                </div>
            </div>
        </div>
    )
}

export default ToDo