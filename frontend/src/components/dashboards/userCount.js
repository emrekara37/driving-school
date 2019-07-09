import React, {PureComponent} from 'react';
import axios from 'axios';
import {API_URL} from "../../settings";
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget';
import {getCourseId} from "../../helpers/utility";
import {Spin} from "antd";

const getUserCount = async (id) => (axios.get(`${API_URL}api/app/clientUser/courseUserCount/${id}`));


class UserCount extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            count: -1
        }
    }

    async componentDidMount() {
        const count = await getUserCount(getCourseId());
        this.setState({
            count: count.data
        })
    }

    render() {

        if (this.state.count === -1) {
            return (<Spin tip="Yükleniyor"/>)
        }

        return (
            <StickerWidget
                number={this.state.count}
                text="Öğrenci Sayısı"
                icon="ion-person"
                fontColor="#ffffff"
                bgColor="#7266BA"
            />

        )
    }
}

export default UserCount;