import React, {PureComponent} from 'react';
import Checkbox from '../../components/uielements/checkbox';
import {RadioButton, RadioGroup} from '../../components/uielements/radio';
import {timeDifference} from '../../helpers/utility';
import {TodoListWrapper} from './todo.style';

function filterTodos(todos, search) {
    const selectedTodos =
        search === 'All'
            ? todos
            : todos.filter(todo => todo.isReaded === (search === 'Completed'));
    let completed = 0;
    selectedTodos.forEach(todo => {
        if (todo.isReaded) {
            completed += 1;
        }
    });
    return {selectedTodos, completed};
}

export default class TodoList extends PureComponent {
    constructor(props) {
        super(props);
        this.singleTodo = this.singleTodo.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            search: 'All',
            lup: Date.now()
        };
    }

    singleTodo(todo) {
        const updateTodo = (key, value) => {
            if (value === false) {
                return;
            }
            todo[key] = value;
            todo.isReaded = value;
            this.setState({
                ...this.state,
                lup: Date.now()
            });
            this.props.read(todo.id);
        };
        return (
            <div className="isoTodoList" key={todo.id}>

                <Checkbox
                    className="isoTodoCheck"
                    checked={todo.isReaded}
                    onChange={event => updateTodo('completed', !todo.isReaded)}
                />
                <div className="isoTodoContentWrapper">
                    <span className="isoTodoDate">{timeDifference(todo.createdDate)}</span>
                    <b>{todo.title}</b>
                    <br/>
                    <span>{todo.description}</span>
                </div>
            </div>
        );
    }

    onChange(event) {
        this.setState({search: event.target.value});
    }

    render() {
        const {search} = this.state;
        const {selectedTodos} = filterTodos(this.props.todos, search);
        return (
            <TodoListWrapper className="isoTodoContent">
                <div className="isoTodoStatusTab">
                    <RadioGroup
                        value={this.state.search}
                        onChange={this.onChange}
                        className="isoTodoStatus"
                    >
                        <RadioButton value="All">Hepsi</RadioButton>
                        <RadioButton value="Uncompleted">Okunmayanlar</RadioButton>
                        <RadioButton value="Completed">Okunanlar</RadioButton>
                    </RadioGroup>
                </div>

                <div className="isoTodoListWrapper">
                    {selectedTodos.length > 0 ? (
                        selectedTodos.map(note => this.singleTodo(note))
                    ) : (
                        <h3 className="isoNoTodoFound">Bildirim bulunamadı</h3>
                    )}
                </div>

            </TodoListWrapper>
        );
    }
}
