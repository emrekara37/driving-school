import React, {PureComponent} from 'react';
import {Button, Form,  Select, Modal, InputNumber} from "antd";
import Notification from "../notification";
import {getCourseId} from "../../helpers/utility";
import axios from 'axios';
import {API_URL} from "../../settings";

const FormItem = Form.Item;

class AddBill extends PureComponent {



    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                Notification(
                    'success',
                    'Ödeme takvimi oluşturuluyor',
                );
                this.setState({isSubmit: true});
                const data = {
                    ...values,
                    courseId: getCourseId(),
                    userId: this.props.userId,
                    type:3
                };
                console.log(data);
                await axios.post(`${API_URL}api/app/coursePayment/bill`, data);
                window.location.reload();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (<Modal
            title={`Senet Ödeme`}
            visible={this.props.visible}
            onOk={this.onSubmit}
            onCancel={this.props.cancelBill}
            footer={[
                <Button htmlType="button" key="back" onClick={this.props.cancelBill}>Çık</Button>,
                <Button key="submit" type="primary" htmlType="submit" onClick={this.onSubmit}>
                    Ekle
                </Button>,
            ]}
        >
            <Form>
                <FormItem hasFeedback label="Taksit Sayısı">
                    {getFieldDecorator('installmentCount', {
                        rules: [
                            {
                                required: true,
                                message: 'Taksiz Sayısı giriniz!',
                            }
                        ],
                    })(<InputNumber size="large" style={{width: '100%'}}/>)}
                </FormItem>
                <FormItem hasFeedback label="Ödeme Günü">
                    {getFieldDecorator('paymentDate', {
                        rules: [
                            {
                                required: true,
                                message: 'Ödeme gününü giriniz!',
                            }
                        ],
                    })(<Select>
                        <Select.Option value="5">5</Select.Option>
                        <Select.Option value="10">10</Select.Option>
                        <Select.Option value="15">15</Select.Option>
                        <Select.Option value="20">20</Select.Option>
                        <Select.Option value="25">25</Select.Option>
                    </Select>)}
                </FormItem>
                <FormItem hasFeedback label="Toplam Ücret">
                    {getFieldDecorator('totalPrice', {
                        rules: [
                            {
                                required: true,
                                message: 'Ödeme giriniz!',
                            }
                        ],
                    })(<InputNumber size="large" style={{width: '100%'}}/>)}
                </FormItem>
            </Form>

        </Modal>)
    }


}

const WrappedForm = Form.create()(AddBill);
export default WrappedForm;

