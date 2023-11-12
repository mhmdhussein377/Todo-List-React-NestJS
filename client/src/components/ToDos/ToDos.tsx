import { FC } from "react";
import ToDo from "../Todo/Todo";
import "./index.css";
import { ToDosProps } from "../../utils/types";

const ToDos: FC<ToDosProps> = ({
  date,
  todos,
  setIsDeleteTodoModalOpened,
  setDeleteTodoId,
  setIsUpdateTodoModalOpened,
  setUpdatedTodo,
}) => {
  return (
    <div className="todos">
      <h2>{date}</h2>
      {todos.map((todo, index) => (
        <ToDo
          key={index}
          todo={todo}
          setIsDeleteTodoModalOpened={setIsDeleteTodoModalOpened}
          setIsUpdateTodoModalOpened={setIsUpdateTodoModalOpened}
          setDeleteTodoId={setDeleteTodoId}
          setUpdatedTodo={setUpdatedTodo}
        />
      ))}
    </div>
  );
};

export default ToDos;
