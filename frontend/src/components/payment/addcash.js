import React from 'react';
import {Modal, InputNumber, Input} from 'antd';
import axios from 'axios';
import {API_URL} from "../../settings";
import {getCourseId} from "../../helpers/utility";
import Notificaiton from '../notification';

const TextArea = Input.TextArea;

let price = 0;
let text = "";

const addCash = (props) => {
    const onOk = async () => {
        if (text === "" || price <= 0) {
            Notificaiton("warning", "Lütfen bilgileri düzgün giriniz");
        }
        const data = {
            type: "1",
            courseId: getCourseId(),
            totalPrice: price,
            description: text,
            userId: props.userId
        };
        await axios.post(`${API_URL}api/app/coursePayment/cash`, data);
        window.location.reload();
    };
    const handleTextArea = (e) => {
        text = e.target.value;
    };
    const handlePrice = (e) => {
        price = e;
    };
    return (

        <React.Fragment>
            <Modal
                title="Nakit Ödeme"
                okText="Ekle"
                cancelText="İptal"
                onCancel={props.cancel}
                onOk={onOk}
                visible={props.visible}
            >
                <InputNumber onChange={(e) => handlePrice(e)} placeholder="Ücret"
                             style={{marginBottom: 10, width: '100%'}}/>
                <TextArea onChange={(e) => handleTextArea(e)} rows={3} placeholder="Açıklama"/>
            </Modal>
        </React.Fragment>
    );
};
export default addCash;