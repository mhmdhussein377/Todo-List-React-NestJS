import "./index.css"
import {FC, useState} from "react"
import ToDos from "../../components/ToDos/ToDos"
import {AiOutlinePlus} from "react-icons/ai"
import {GiBackwardTime} from "react-icons/gi"
import CreateToDo from "../../components/CreateToDo/CreateToDo"
import CircularButton from "../../components/UI/CircularButton/CircularButton"

const Home : FC = () => {

    const [isCreateTodoModalOpened,
        setIsCreateTodoModalOpened] = useState(false)

    const handleOpenCreateTodoModal = (): void => {
        setIsCreateTodoModalOpened(true)
    }

    const handleSortByTime = () => {}

    const circularButtons = [
        {
            id: 1,
            icon: <GiBackwardTime size={25} color="white"/>,
            handleClick: handleSortByTime
        }, {
            id: 2,
            icon: <AiOutlinePlus size={25} color="white"/>,
            handleClick: handleOpenCreateTodoModal
        }
    ];

    return (
        <div className="home-screen">
            <div className="todos-section">
                <ToDos/>
                <ToDos/>
            </div>
            <div className="action-buttons">
                {circularButtons.map(({id, icon, handleClick}) => (<CircularButton key={id} onClick={handleClick} icon={icon}/>))}
            </div>
            {isCreateTodoModalOpened && <CreateToDo setIsCreateTodoModalOpened={setIsCreateTodoModalOpened}/>}
        </div>
    )
}

export default Home