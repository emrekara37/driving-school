import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Input, Button, Form} from 'antd';
import ForgotPasswordStyleWrapper from './forgotPassword.style';
import Notification from "../../components/notification";
import axios from 'axios';
import {API_URL} from "../../settings";

const FormItem = Form.Item;

class ForgotPw extends PureComponent {

    constructor(props){
        super(props);
        this.state={
            isSubmit:false,
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                Notification('warning', 'Şifre değiştirmek için gerekli mail gönderiliyor');
                this.setState({
                    ...this.state,
                    isSubmit: true
                });
                const data = {
                    email: values.email,

                };
                const response = await axios.post(`${API_URL}api/app/auth/forgotPassword`, data);
                if (response.data==="Send"){
                    Notification("success","Mail Gönderildi");
                    this.props.form.resetFields()
                }

            }
        });
    };


    render() {
        console.log(this.props);
        const {getFieldDecorator} = this.props.form;
        return (
            <ForgotPasswordStyleWrapper className="isoForgotPassPage">
                <div className="isoFormContentWrapper">
                    <div className="isoFormContent">
                        <div className="isoLogoWrapper">
                            <Link to="/dashboard">
                                SÜRÜCÜ KURSU
                            </Link>
                        </div>

                        <div className="isoFormHeadText">
                            <h3>
                                Şifremi Unuttum
                            </h3>
                            <p>
                                Kayıtlı Email Adresinizi Giriniz
                            </p>
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <div className="isoForgotPassForm">
                                <div className="isoInputWrapper">
                                    <FormItem hasFeedback>
                                        {getFieldDecorator('email', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Lütfen emailinizi giriniz!',
                                                },
                                                {
                                                    validator: this.checkPassword,
                                                },
                                            ],
                                        })(<Input size="large" type="email" placeholder="Email Adresi"/>)}
                                    </FormItem>
                                </div>
                                <div className="isoInputWrapper">
                                    <Button type="primary" htmlType="submit" disabled={this.state.isSubmit}>
                                        Gönder
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </ForgotPasswordStyleWrapper>
        );
    }
}

const FormSign = Form.create()(ForgotPw);
export default (FormSign);