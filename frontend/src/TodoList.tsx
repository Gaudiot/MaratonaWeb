import React from "react";
import TodoListItem from "./TodoListItem";

interface Props {
    todos: Todo[];
    toggleTodo: ToggleTodo;
}

const TodoList: React.FC<Props> = ({todos, toggleTodo}) => {
    return (
        <ul>
            {todos.map((todo) => (
                <TodoListItem todo={todo} toggleTodo={toggleTodo} key={todo.text}/>
            ))}
        </ul>
    );
}

export default TodoList;