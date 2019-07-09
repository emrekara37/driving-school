import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Input} from 'antd';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import appAction from '../../redux/app/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import Form from '../../components/uielements/form';
import Notification from "../../components/notification";


const FormItem = Form.Item;
const {login, init} = authAction;
const {clearMenu} = appAction;

class SignIn extends Component {
    state = {
        redirectToReferrer: false,
        userName: '',
        password: '',
        isSubmit: false
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.Auth.isError && this.state.isSubmit) {
            this.setState({isSubmit: false});
            Notification("error", "Giriş işlemi başarısız");
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Notification('success', 'Giriş Yapılıyor');
                this.setState({
                    ...this.state,
                    isSubmit: true
                });
                this.props.login(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {Auth} = this.props;

        if (Auth.idToken && Auth.isLoading === false) {
            return <Redirect to="/dashboard"/>;
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <SignInStyleWrapper className="isoSignInPage">
                    <div className="isoLoginContentWrapper">
                        <div className="isoLoginContent">
                            <div className="isoLogoWrapper">
                                <Link to="/dashboard">
                                    Sürücü Kursu Giriş
                                </Link>
                            </div>

                            <div className="isoSignInForm">
                                <div className="isoInputWrapper">
                                    <FormItem hasFeedback>
                                        {getFieldDecorator('username', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Lütfen kullanıcı adı giriniz!',
                                                }
                                            ],
                                        })(<Input size="large" placeholder="Kullanıcı Adı" type="text"/>)}
                                    </FormItem>
                                </div>

                                <div className="isoInputWrapper">
                                    <FormItem hasFeedback>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Lütfen şifrenizi giriniz!',
                                                },
                                                {
                                                    validator: this.checkPassword,
                                                },
                                            ],
                                        })(<Input size="large" type="password" placeholder="Şifreniz"/>)}
                                    </FormItem>

                                </div>

                                <div className="isoInputWrapper isoLeftRightComponent">

                                    <Button type="primary" htmlType="submit" disabled={this.state.isSubmit}>
                                        <IntlMessages id="page.signInButton"/>
                                    </Button>
                                </div>


                                <div className="isoCenterComponent isoHelperWrapper">
                                    <Link to="/forgotpassword" className="isoForgotPass">
                                        <IntlMessages id="page.signInForgotPass"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SignInStyleWrapper>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return state;
}

const FormSign = Form.create()(SignIn);
export default connect(
    mapStateToProps,
    {
        login, clearMenu, init
    }
)(FormSign);
