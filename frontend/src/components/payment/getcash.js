import React from 'react';
import {Card} from 'antd';

const getCash = (props) => {
    const {payment} = props;
    return (<Card
        title="Nakit Ödeme Bilgileri"
        style={{width: 300}}
    >
        <p>
            Alınan Ücret : {payment.method.payment} ₺
        </p>
        <p>
            Tarih : {payment.createdDate.split("T")[0]}
        </p>
        <p>
            Açıklama : {payment.method.description}
        </p>
    </Card>);
};
export default getCash;