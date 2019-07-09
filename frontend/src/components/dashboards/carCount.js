import React, {PureComponent} from 'react';
import axios from 'axios';
import {API_URL} from "../../settings";
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget';
import {getCourseId} from "../../helpers/utility";
import {Spin} from "antd";

const getCarCount = async (id) => (axios.get(`${API_URL}api/app/course/courseCarCount/${id}`));


class CarCount extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            count: -1
        }
    }

    async componentDidMount() {
        const count = await getCarCount(getCourseId());
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
                text="Araba Sayısı"
                icon="ion-android-car"
                fontColor="#ffffff"
                bgColor="#7ED320"
            />
        )
    }
}

export default CarCount;