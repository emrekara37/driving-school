import React from 'react';
import {Card} from 'antd';

const paymentStatus ={
    1:"Ödeme Bekliyor",
    2:"Onaylandı",
    4:"Onay Bekliyor"
};
const getOnline = (props) => {
    const {payment} = props;
    return (<Card
        title="Online Ödeme Bilgileri"
        style={{width: 300}}
    >
        <p>
            Alınan Ücret : {payment.totalPrice} ₺
        </p>
        <p>
            Tarih : {payment.createdDate.split("T")[0]}
        </p>
        <p>
            Açıklama : {payment.method.description}
        </p>
        <p>
            Durum : {paymentStatus[payment.method.status]}
        </p>
    </Card>);
};
export default getOnline;