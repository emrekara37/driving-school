import React, {PureComponent} from 'react';
import {
    Drawer, Form, Button, Col, Row, Input, Select,
} from 'antd';
import Notification from "../notification";
import {getCourseId} from "../../helpers/utility";
import CustomInput from "./custominput";

const {Option} = Select;
class DrawerForm extends PureComponent {
    state = {visible: false, disabled: true};

    onChange = e => {
        this.setState({
            ...this.state,
            disabled: e === "ozel"
        })
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                Notification(
                    'success',
                    'Öğrenci kaydediliyor',
                );
                this.setState({isSubmit: true});
                const data = {
                    ...values,
                    courseId: getCourseId()
                };
                this.props.onAddContact(data);
            }
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>

                <Drawer
                    title="Yeni Öğrenci Ekle"
                    width={720}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Ad Soyad">
                                    {getFieldDecorator('name', {
                                        rules: [
                                            {required: true, message: 'Lütfen Ad Soyad giriniz'}
                                        ],
                                    })(<Input placeholder="Ad Soyad giriniz"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="TcKn">
                                    {getFieldDecorator('tcKn', {
                                        rules: [{required: true, message: 'Lütfen TcKn giriniz'}],
                                    })(
                                        <Input placeholder="000"/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="E-mail">
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {type: "email", message: "Lütfen düzgün bir email giriniz"},
                                            {required: true, message: 'Lütfen E-mail giriniz'}
                                        ],
                                    })(<Input placeholder="E-mail giriniz"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Telefon Numarası">
                                    {getFieldDecorator('phoneNumber', {
                                        rules: [{required: true, message: 'Lütfen Telefon Numarası giriniz'}],
                                    })(
                                        <CustomInput  mask="+\90 999 999 99 99"   />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>

                            <Col span={12}>
                                <Form.Item label="Ehliyet Tip">
                                    {getFieldDecorator('productId', {
                                        rules: [{required: true, message: 'Ehliyet Tipi seçiniz'}],
                                    })(
                                        <Select placeholder="Ehliyet Tipi">
                                            {
                                                this.props.products.map(item =>
                                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                                )
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>


                            <Col span={12}>
                                <Form.Item label="Üye">
                                    {getFieldDecorator('type', {
                                        rules: [{required: true, message: 'Üye Tipi seçiniz'}],
                                    })(
                                        <Select placeholder="Üye tip" onChange={(e) => this.onChange(e)}>
                                            <Option value={"kurs"}>Kursada Kaydet</Option>
                                            <Option value={"ozel"}>Özel</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Şifre Giriniz">
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Lütfen şifreyi giriniz'}],
                                    })(
                                        <Input.Password placeholder="Şifre" disabled={this.state.disabled}/>
                                    )}
                                </Form.Item>
                            </Col>

                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.props.onClose} style={{marginRight: 8}} htmlType="button">
                            İptal
                        </Button>
                        <Button onClick={this.onSubmit} type="primary">
                            Ekle
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const WrappedForm = Form.create()(DrawerForm);

export default WrappedForm;