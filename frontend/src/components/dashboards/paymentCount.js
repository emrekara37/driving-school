import React, {PureComponent} from 'react';
import axios from 'axios';
import {API_URL} from "../../settings";
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget';
import {getCourseId} from "../../helpers/utility";
import {Spin} from "antd";

const getPaymentCount = async (id) => (axios.get(`${API_URL}api/app/coursePayment/${id}/courseCountPayments`));


class PaymentCount extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            count: -1
        }
    }

    async componentDidMount() {
        const count = await getPaymentCount(getCourseId());
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
                text="Ödeme Sayısı"
                icon="ion-android-cart"
                fontColor="#ffffff"
                bgColor="#F75D81"
            />
        )
    }
}

export default PaymentCount;