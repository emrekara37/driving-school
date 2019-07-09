import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import Popover from '../../components/uielements/popover';
import IntlMessages from '../../components/utility/intlMessages';
import authAction from '../../redux/auth/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';
import {getCourseInfo} from "../../helpers/utility";

const {logout} = authAction;

class TopbarUser extends PureComponent {
    constructor(props) {
        super(props);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.hide = this.hide.bind(this);
        this.state = {
            visible: false,
        };
    }

    hide() {
        this.setState({visible: false});
    }

    handleVisibleChange() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const course = getCourseInfo();
        const content = (
            <TopbarDropdownWrapper className="isoUserDropdown">
                <a className="isoDropdownLink" onClick={this.props.logout} href="# ">
                    <IntlMessages id="topbar.logout"/>
                </a>
                <Link to="/dashboard/profile">
                  <span className="isoDropdownLink">
                     Şifre Değiş
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
                arrowPointAtCenter={true}
                placement="bottomLeft"
            >
                <div className="isoImgWrapper">
                    <img alt="user" src={course.logo}/>
                    <span className="userActivity online"/>
                </div>
            </Popover>
        );
    }
}

export default connect(
    null,
    {logout}
)(TopbarUser);
