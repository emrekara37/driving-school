import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form, Input, Button,} from 'antd';
import ResetPasswordStyleWrapper from './resetPassword.style';
import Notification from "../../components/notification";
import axios from "axios";
import {API_URL} from "../../settings";

const FormItem = Form.Item;

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                Notification(
                    'success',
                    'Yeni Şifre Belirleniyor',
                );

                const base64Value = atob(this.props.match.params.d);
                const split = base64Value.split("||");
                this.setState({isSubmit: true});
                const data ={
                    password:values.password,
                    userId:split[0],
                    token:split[1]
                };
                await axios.post(`${API_URL}api/app/auth/resetPassword`,data);
                this.props.history.push("/signin");
            }
        });
    };

    render() {
        const validatePassword = (rule, value, callback) => {
            const password = this.props.form.getFieldValue('password');
            if (password !== value) {
                callback("Şifreler uyuşmamaktadır")
            } else {
                callback();
            }
        };

        const {getFieldDecorator} = this.props.form;
        return (
            <ResetPasswordStyleWrapper className="isoResetPassPage">
                <div className="isoFormContentWrapper">
                    <div className="isoFormContent">
                        <div className="isoLogoWrapper">
                            <Link to="/dashboard">
                                Sürücü Kursu
                            </Link>
                        </div>

                        <div className="isoFormHeadText">
                            <h3>
                                Yeni Şifre Belirle
                            </h3>

                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <div className="isoResetPassForm">
                                <div className="isoInputWrapper">
                                    <FormItem hasFeedback>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Lütfen şifrenizi giriniz!',
                                                }
                                            ],
                                        })(<Input.Password placeholder="Şifre"/>)}
                                    </FormItem>
                                </div>

                                <div className="isoInputWrapper">
                                    <FormItem hasFeedback>
                                        {getFieldDecorator('repassword', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Lütfen şifrenizi giriniz!',
                                                }
                                                ,
                                                {
                                                    validator: validatePassword
                                                }
                                            ],
                                        })(<Input.Password placeholder="Şifre Tekrar"/>)}
                                    </FormItem>
                                </div>

                                <div className="isoInputWrapper">
                                    <Button icon="plus" type="primary" htmlType="submit" disabled={this.state.isSubmit}>
                                        Kaydet
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </ResetPasswordStyleWrapper>
        );
    }
}

const resetPw = Form.create()(ResetPassword);
export default resetPw;
