const todoActions = {
  CHANGE_TODO: 'CHANGE_TODO',
  ALL_COMPLETED: 'ALL_COMPLETED',
  DELETE_COMPLETED: 'DELETE_COMPLETED',
  edittodo: editTodo => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        if (todo.id !== editTodo.id) {
          todos.push(todo);
        } else {
          todos.push(editTodo);
        }
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos
      });
    };
  },
  deleteTodo: id => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        if (todo.id !== id) {
          todos.push(todo);
        }
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos
      });
    };
  },
  allCompleted: () => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        todo.completed = true;
        todos.push(todo);
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos
      });
    };
  },
  deleteCompleted: () => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        if (!todo.completed) {
          todos.push(todo);
        }
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos
      });
    };
  }
};
export default todoActions;
