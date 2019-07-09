import React, {PureComponent} from 'react';
import axios from 'axios';
import {API_URL} from "../../settings";
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget';
import {getCourseId} from "../../helpers/utility";
import {Spin} from "antd";

const getVcReq = async (id) => (axios.get(`${API_URL}api/app/course/viewCount/${id}`));

class ViewerCount extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            count: -1
        }
    }

    async componentDidMount() {
        const count = await getVcReq(getCourseId());
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
                text="Görüntülenme Sayısı"
                icon="ion-android-camera"
                fontColor="#ffffff"
                bgColor="#F75D81"
            />

        )
    }
}

export default ViewerCount;