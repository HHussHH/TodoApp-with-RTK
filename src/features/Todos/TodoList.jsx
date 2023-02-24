import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  selectVisibleTodos,
  toggleTodo,
  removeTodo,
  loadTodos,
  todosSelectors,
} from "./todos-slice";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
export const TodoList = () => {
  const activeFilter = useSelector((state) => state.filter);
  const todos = useSelector(todosSelectors.selectAll);
  const visibleTodos = selectVisibleTodos(todos, activeFilter);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(loadTodos())
      .unwrap()
      .then(() => {
        toast("All Todos were fetch");
      })
      .catch((err) => {
        toast(err);
      });
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <ul>
        {error && <h2>{error}</h2>}
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />{" "}
            {todo.title}{" "}
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
