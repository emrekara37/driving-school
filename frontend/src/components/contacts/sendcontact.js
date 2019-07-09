import React from 'react';
import Notification from '../notification';
import {Modal, Select, Input} from 'antd';
import axios from 'axios';
import {API_URL} from "../../settings";
import {getCourseInfo} from "../../helpers/utility";

const Option = Select.Option;
const {TextArea} = Input;
const SendContact = (props) => {

    const {contact} = props;
    let type = "sms";
    let text = "";
    const handleChange = (e) => {
        type = e;
    };
    const handleTextArea = (e) => {
        text = e.target.value;
    };
    const onOk = async () => {
        if (type === "sms") {
            console.log(props);
            Notification("success", ` Sms gönderiliyor ${contact.name} `);
            await axios.post(`${API_URL}api/app/notification/sendSms`, {
                phoneNumber: contact.phoneNumber,
                message: text
            });

        } else {
            Notification("success", ` Mail gönderiliyor ${contact.name} `);
            const course = getCourseInfo();
            await axios.post(`${API_URL}api/app/notification/sendMail`, {
                reciever: contact.email,
                message: text,
                subject:  course.courseName
            });


        }
        props.onOk();
    };
    if (props.visible === false) {
        return (<></>);
    }
    return (
        <React.Fragment>
            <Modal
                title="Bildirim Gönder"
                okText="Gönder"
                cancelText="İptal"
                onCancel={props.onCancel}
                onOk={onOk}
                visible={props.visible}
            >
                <Select defaultValue={type} style={{width: '100%', marginBottom: '10px'}}
                        onChange={(e) => handleChange(e)}>
                    <Option value="sms">Sms</Option>
                    <Option value="mail">Mail</Option>
                </Select>
                <TextArea onChange={(e) => handleTextArea(e)} rows={3} placeholder="Gönderilecek Mesajı Giriniz"/>
            </Modal>
        </React.Fragment>
    );


};
export default SendContact;