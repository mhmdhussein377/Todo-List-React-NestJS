import "./index.css"
import { FC } from "react"
import ToDos from "../../components/ToDos/ToDos"
import {AiOutlinePlus} from "react-icons/ai"
import {GiBackwardTime} from "react-icons/gi"
import CreateToDo from "../../components/CreateToDo/CreateToDo"
import CircularButton from "../../components/UI/CircularButton/CircularButton"

const Home: FC = () => {

    return (
        <div className="home-screen">
            <div className="todos-section">
                <ToDos/>
                <ToDos/>
            </div>
            <div className="action-buttons">
                <CircularButton icon={<GiBackwardTime size={25} color="white"/>} />
                <CircularButton icon={<AiOutlinePlus size={25} color="white" />} />
            </div>
            <CreateToDo />
        </div>
    )
}

export default Home