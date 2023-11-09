import ToDos from "../../components/ToDos/ToDos"
import {AiOutlinePlus} from "react-icons/ai"
import {GiBackwardTime} from "react-icons/gi"

const Home = () => {
    return (
        <div className="home-screen">
            <div className="todos-section">
                <ToDos/>
                <ToDos/>
            </div>
            <div className="buttons">
                <div className="circular-button">
                    <AiOutlinePlus size={25} />
                </div>
                <div className="circular-button">
                    <GiBackwardTime size={25} />
                </div>
            </div>
        </div>
    )
}

export default Home