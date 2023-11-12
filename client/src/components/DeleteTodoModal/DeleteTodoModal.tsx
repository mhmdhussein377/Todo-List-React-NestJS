import { deleteRequest } from "../../utils/requests"
import Button from "../UI/Button/Button"
import "./index.css"

const DeleteTodoModal = ({setDeleteTodoId, setIsDeleteTodoModalOpened, deleteTodoId, setShouldFetchTodos}) => {

    const handleDeleteTodo = async () => {
        try {
            const response = await deleteRequest(`/todos/${deleteTodoId}/delete`)
            response && setIsDeleteTodoModalOpened(false) && setShouldFetchTodos(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='delete-todo-modal'>
            <div className="box">
                <h2>Are you sure you want to delete it?</h2>
                <div className="action-buttons">
                    <Button content="Confirm" handleClick={handleDeleteTodo}/>
                    <Button
                        content="Decline"
                        handleClick={() => {
                        setDeleteTodoId(null);
                        setIsDeleteTodoModalOpened(false)
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default DeleteTodoModal