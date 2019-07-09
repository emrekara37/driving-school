import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Layout} from "antd";
import notificationAction from "../../redux/notifications/actions.js";
import TodoList from "./todoList";
import {TodoWrapper} from "./todo.style";

const {
    list,read
} = notificationAction;

const {Content} = Layout;

class ToDo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: ""
        };
    }

    componentDidMount() {
        this.props.list();
    }

    render() {
        const {
            colors,
            notifications,
            allCompleted,
            deleteCompleted
        } = this.props;
        return (
            <Layout style={{background: "none"}}>
                <TodoWrapper className="isomorphicTodoComponent">

                    <Content className="isoTodoContentBody">
                        <TodoList
                            todos={notifications}
                            colors={colors}
                            read={this.props.read}
                            allCompleted={allCompleted}
                            deleteCompleted={deleteCompleted}
                        />
                    </Content>
                </TodoWrapper>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const {notifications} = state.Notifications;
    return {
        notifications,
    };
}

export default connect(mapStateToProps, {
    list,
    read
})(ToDo);
