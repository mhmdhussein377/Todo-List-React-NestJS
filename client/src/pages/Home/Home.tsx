import "./index.css"
import { FC } from "react"

import ToDos from "../../components/ToDos/ToDos"
import {AiOutlinePlus} from "react-icons/ai"
import {GiBackwardTime} from "react-icons/gi"
import CreateToDo from "../../components/CreateToDo/CreateToDo"

const Home: FC = () => {
    return (
        <div className="home-screen">
            <div className="todos-section">
                <ToDos/>
                <ToDos/>
            </div>
            <div className="buttons">
                <div className="circular-button">
                    <GiBackwardTime size={25} color="white"  />
                </div>
                <div className="circular-button">
                    <AiOutlinePlus size={25} color="white" />
                </div>
            </div>
            {/* <CreateToDo /> */}
        </div>
    )
}

export default Home