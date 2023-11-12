import "./index.css"
import {FC, useEffect, useState} from "react"
import ToDos from "../../components/ToDos/ToDos"
import CreateToDo from "../../components/CreateToDo/CreateToDo"
import CircularButton from "../../components/UI/CircularButton/CircularButton"
import {getRequest} from "../../utils/requests"
import {Todo} from "../../utils/types"
import DeleteTodoModal from "../../components/DeleteTodoModal/DeleteTodoModal"
import UpdateTodoModal from "../../components/UpdateTodoModal/UpdateTodoModal"
import { PiSignOutBold } from "react-icons/pi"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import { getCircularButtons } from "../../utils/constants"
import { filterCompletedTodos, groupAndSortTasks } from "../../utils/helperFunctions"

const Home : FC = () => {

    const [isCreateTodoModalOpened,
        setIsCreateTodoModalOpened] = useState < boolean > (false)
    const [isDeleteTodoModalOpened,
        setIsDeleteTodoModalOpened] = useState < boolean > (false)
    const [isUpdateTodoModalOpened, setIsUpdateTodoModalOpened] = useState<boolean>(false)
    const [todos, setTodos] = useState({})
    const [deleteTodoId, setDeleteTodoId] = useState < string | null > (null);
    const [udpatedTodo, setUpdatedTodo] = useState<Todo | null>(null)
    const [shouldFetchTodos, setShouldFetchTodos] = useState(true);
    const [showCompleted, setShowCompleted] = useState(false)
    const navigate = useNavigate()
    const {logout} = useAuth()

    useEffect(() => {
        const getTodos = async() => {
        const response = await getRequest("/todos/all")

        const groupedAndSortedTodos = groupAndSortTasks(response);

        const filteredTodos = showCompleted ? filterCompletedTodos(groupedAndSortedTodos) : groupedAndSortedTodos

        setTodos(filteredTodos)
        }

        if(shouldFetchTodos) {
            getTodos()
            setShouldFetchTodos(false)
        }
    }, [shouldFetchTodos, showCompleted])

    const handleOpenCreateTodoModal = () : void => {
        setIsCreateTodoModalOpened(true)
    }

    const handleToggleCompleted = (): void => {
        setShowCompleted((prevShowCompleted) => !prevShowCompleted);
        setShouldFetchTodos(true)
    }

    const circularButtons = getCircularButtons(handleToggleCompleted, handleOpenCreateTodoModal);

    const handleSignout = (): void => {
        logout()
        navigate("/login")
    }

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
                <CircularButton onClick={handleSignout} icon={<PiSignOutBold size={25} color="white" />} />
                <div className="flex">
                {circularButtons.map(({id, icon, handleClick}) => (<CircularButton key={id} onClick={handleClick} icon={icon}/>))}
                </div>
            </div>
            {isCreateTodoModalOpened && 
            <CreateToDo setIsCreateTodoModalOpened={setIsCreateTodoModalOpened} setShouldFetchTodos={setShouldFetchTodos}/>}
            {isDeleteTodoModalOpened && <DeleteTodoModal
                deleteTodoId={deleteTodoId}
                setDeleteTodoId={setDeleteTodoId}
                setShouldFetchTodos={setShouldFetchTodos}
                setIsDeleteTodoModalOpened={setIsDeleteTodoModalOpened}/>}
            {isUpdateTodoModalOpened && <UpdateTodoModal setIsUpdateTodoModalOpened={setIsUpdateTodoModalOpened} updatedTodo={udpatedTodo} setShouldFetchTodos={setShouldFetchTodos} />}
        </div>
    )
}

export default Home