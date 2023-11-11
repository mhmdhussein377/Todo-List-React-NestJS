import "./index.css"
import {FC, useEffect, useState} from "react"
import ToDos from "../../components/ToDos/ToDos"
import {AiOutlinePlus} from "react-icons/ai"
import {GiBackwardTime} from "react-icons/gi"
import CreateToDo from "../../components/CreateToDo/CreateToDo"
import CircularButton from "../../components/UI/CircularButton/CircularButton"
import {getRequest} from "../../utils/requests"
import { Todo } from "../../utils/types"

const Home : FC = () => {

    const [isCreateTodoModalOpened,
        setIsCreateTodoModalOpened] = useState(false)
    const [todos,
        setTodos] = useState({})

    useEffect(() => {
        const getTodos = async() => {
            try {
                const response = await getRequest("/todos/all")

                const groupedTasks = response.reduce((groups, task) => {
                    const date = new Date(task.date).toLocaleDateString();
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(task);
                    return groups;
                }, {});

                for (const date in groupedTasks) {
                    groupedTasks[date].sort((a, b) => {
                        const priorityOrder = {
                            HIGH: 1,
                            MEDIUM: 2,
                            LOW: 3
                        };
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                    });
                }

                console.log(groupedTasks)

                setTodos(groupedTasks)

            } catch (error) {
                console.log(error)
            }
        }
        getTodos()
    }, [])

    const handleOpenCreateTodoModal = () : void => {
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
                {Object.entries(todos).map(([date, tasksForDate]) => (
                    <ToDos key={date} date={date} todos={tasksForDate as Todo[]} />
                )).reverse()}
            </div>
            <div className="action-buttons">
                {circularButtons.map(({id, icon, handleClick}) => (<CircularButton key={id} onClick={handleClick} icon={icon}/>))}
            </div>
            {isCreateTodoModalOpened && <CreateToDo setIsCreateTodoModalOpened={setIsCreateTodoModalOpened}/>}
        </div>
    )
}

export default Home