import React, {PureComponent} from 'react';
import {Input, Button} from "antd";
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Form from '../../components/uielements/form';
import Notification from "../../components/notification";
import axios from 'axios';
import {API_URL} from "../../settings";

const FormItem = Form.Item;

class Profile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false
        };
    }


    handleSubmit = async e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                Notification(
                    'success',
                    'Şifre Değiştiriliyor',
                );
                this.setState({isSubmit: true});
                await axios.post(`${API_URL}api/app/auth/changePassword`, values);
            }
        });
    };

    componentDidMount() {
    }

    render() {
        const validatePassword = (rule, value, callback) => {
            const password = this.props.form.getFieldValue('password');
            if (password !== value) {
                callback("Şifreler uyuşmamaktadır")
            }else{
                callback();
            }
        };

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 8},
        };
        const formTailLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 8, offset: 4},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <LayoutWrapper>
                <PageHeader>
                    Şifre Değiştir
                </PageHeader>
                <Box>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="Mevcut Şifre" {...formItemLayout} hasFeedback>
                            {getFieldDecorator('currentPassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Mevcut Şifreyi giriniz!',

                                    }

                                ],
                            })(<Input.Password/>)}
                        </FormItem>
                        <FormItem label="Yeni Şifre" {...formItemLayout} hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Yeni Şifreyi!',

                                    }

                                ],
                            })(<Input.Password/>)}
                        </FormItem>
                        <FormItem label="Şifre Tekrar" {...formItemLayout} hasFeedback>
                            {getFieldDecorator('password2', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Yeni Şifreyi!',
                                    }
                                    ,
                                    {
                                        validator: validatePassword
                                    }
                                ],
                            })(<Input.Password/>)}
                        </FormItem>
                        <FormItem {...formTailLayout}>
                            <Button icon="plus" type="primary" htmlType="submit" disabled={this.state.isSubmit}>
                                Kaydet
                            </Button>
                        </FormItem>

                    </Form>
                </Box>

            </LayoutWrapper>
        );
    }
}

const WrappedRooms = Form.create()(Profile);
export default (WrappedRooms);

