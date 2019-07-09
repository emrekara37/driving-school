import React, {PureComponent} from 'react';
import {Popover} from 'antd';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import TopbarDropdownWrapper from './topbarDropdown.style';
import actions from '../../redux/notifications/actions';

const {getUnreads,read} = actions;

class TopbarNotification extends PureComponent {
    constructor(props) {
        super(props);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.hide = this.hide.bind(this);
        this.read = this.read.bind(this);
        this.state = {
            visible: false,
        };
    }


    read(notification){
        console.log(notification);
        this.props.read(notification.id);
    }

    componentDidMount() {

        this.props.getUnreads();
    }

    hide() {
        this.setState({visible: false});
    }

    handleVisibleChange() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const {unreads} = this.props;
        const content = (
            <TopbarDropdownWrapper className="topbarNotification">
                <div className="isoDropdownHeader">
                    <h3>
                        Bildirimler
                    </h3>
                </div>
                <div className="isoDropdownBody">

                    {unreads.map(notification => (
                        <span className="isoDropdownListItem" key={notification.id} onClick={()=> this.read(notification)}>
                            <h5>{notification.title}</h5>
                            <p>{notification.description}</p>
                        </span>
                    ))}
                </div>
                <Link to="/dashboard/notifications">
                <span className="isoViewAllBtn">
                    Tümünü gör
                </span>
                </Link>
            </TopbarDropdownWrapper>
        );
        return (
            <Popover
                content={content}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                placement="bottomLeft"
            >
                <div className="isoIconWrapper">
                    <i
                        className="ion-android-notifications"
                        style={{color: "black"}}
                    />
                    <span>{unreads.length}</span>
                </div>
            </Popover>
        );
    }
}
function mapStateToProps(state) {
    const {unreads, loading} = state.Notifications;
    return {
        unreads,
        loading
    };
}
export default connect(mapStateToProps, {getUnreads,read})(TopbarNotification);
