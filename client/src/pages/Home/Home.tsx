import "./index.css"
import {FC, useEffect, useState} from "react"
import ToDos from "../../components/ToDos/ToDos"
import {AiOutlinePlus} from "react-icons/ai"
import {GiBackwardTime} from "react-icons/gi"
import CreateToDo from "../../components/CreateToDo/CreateToDo"
import CircularButton from "../../components/UI/CircularButton/CircularButton"
import {getRequest} from "../../utils/requests"
import {Todo} from "../../utils/types"
import DeleteTodoModal from "../../components/DeleteTodoModal/DeleteTodoModal"
import UpdateTodoModal from "../../components/UpdateTodoModal/UpdateTodoModal"

const Home : FC = () => {

    const [isCreateTodoModalOpened,
        setIsCreateTodoModalOpened] = useState < boolean > (false)
    const [isDeleteTodoModalOpened,
        setIsDeleteTodoModalOpened] = useState < boolean > (false)
    const [isUpdateTodoModalOpened, setIsUpdateTodoModalOpened] = useState<boolean>(false)
    const [todos,
        setTodos] = useState({})
    const [deleteTodoId, setDeleteTodoId] = useState < string | null > (null);
    const [udpatedTodo, setUpdatedTodo] = useState<Todo | null>(null)
    const [shouldFetchTodos, setShouldFetchTodos] = useState(true);
    const [showCompleted, setShowCompleted] = useState(false)

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

                const filteredTodos = showCompleted ? filterCompletedTasks(groupedTasks) : groupedTasks

                setTodos(filteredTodos)

            } catch (error) {
                console.log(error)
            }
        }
        if(shouldFetchTodos) {
            getTodos()
            setShouldFetchTodos(false)
        }
    }, [shouldFetchTodos, showCompleted])

    const handleOpenCreateTodoModal = () : void => {
        setIsCreateTodoModalOpened(true)
    }

    const handleToggleCompleted = () => {
        setShowCompleted((prevShowCompleted) => !prevShowCompleted);
        setShouldFetchTodos(true)
    }

    const filterCompletedTasks = (tasks) => {
        const filteredTasks = {};
    
        for (const date in tasks) {
            const completedTasks = tasks[date].filter(task => task.completed);
            if (completedTasks.length > 0) {
                filteredTasks[date] = completedTasks;
            }
        }
    
        return filteredTasks;
    };
    

    const circularButtons = [
        {
            id: 1,
            icon: <GiBackwardTime size={25} color="white"/>,
            handleClick: handleToggleCompleted
        }, {
            id: 2,
            icon: <AiOutlinePlus size={25} color="white"/>,
            handleClick: handleOpenCreateTodoModal
        }
    ];

    return (
        <div className="home-screen">
            <div className="todos-section">
                {Object
                    .entries(todos)
                    .map(([date, tasksForDate]) => (<ToDos
                        key={date}
                        date={date}
                        todos={tasksForDate as Todo[]}
                        setIsDeleteTodoModalOpened={setIsDeleteTodoModalOpened}
                        setIsUpdateTodoModalOpened={setIsUpdateTodoModalOpened}
                        setDeleteTodoId={setDeleteTodoId}
                        setUpdatedTodo={setUpdatedTodo}/>))}
            </div>
            <div className="action-buttons">
                {circularButtons.map(({id, icon, handleClick}) => (<CircularButton key={id} onClick={handleClick} icon={icon}/>))}
            </div>
            {isCreateTodoModalOpened && 
            <CreateToDo setIsCreateTodoModalOpened={setIsCreateTodoModalOpened} setShouldFetchTodos={setShouldFetchTodos}/>}
            {isDeleteTodoModalOpened && <DeleteTodoModal
                deleteTodoId={deleteTodoId}
                setDeleteTodoId={setDeleteTodoId}
                setTodos={setTodos}
                setShouldFetchTodos={setShouldFetchTodos}
                setIsDeleteTodoModalOpened={setIsDeleteTodoModalOpened}/>}
            {isUpdateTodoModalOpened && <UpdateTodoModal setIsUpdateTodoModalOpened={setIsUpdateTodoModalOpened} updatedTodo={udpatedTodo} setShouldFetchTodos={setShouldFetchTodos} />}
        </div>
    )
}

export default Home