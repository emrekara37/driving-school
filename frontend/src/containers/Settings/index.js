import React, {Component} from 'react';
import {Input, Button, Spin, Avatar} from "antd";
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Form from '../../components/uielements/form';
import Notification from "../../components/notification";
import actions from '../../redux/settings/actions';
import {connect} from "react-redux";

const FormItem = Form.Item;
const {getSettings, setSettings} = actions;

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            isSubmit: false
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({file: e.target.files[0]});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Notification(
                    'success',
                    'Ayarlarınız kaydediliyor',
                );
                this.setState({isSubmit: true});
                const {file} = this.state;
                const data = {
                    ...values,
                    file
                };
                this.props.setSettings(data);
            }
        });
    };

    componentDidMount() {
        this.props.getSettings();
    }
    render() {
        const {isLoading, data} = this.props.Settings;
        const {getFieldDecorator} = this.props.form;
        return (
            <LayoutWrapper>
                <PageHeader>
                    Ayarlar
                </PageHeader>
                {
                    isLoading ? (<Spin tip="Yükleniyor"/>) : (<Box>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="Kurs Adı" hasFeedback>
                                {getFieldDecorator('courseName', {
                                    initialValue: data.courseName,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Lütfen araba adını giriniz!',
                                        },
                                    ],
                                })(<Input name="text" id="email" disabled />)}
                            </FormItem>
                            <FormItem label="Adres" hasFeedback>
                                {getFieldDecorator('address', {
                                    initialValue: data.address,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Açık adres giriniz!',
                                        }

                                    ],
                                })(<Input type="text"/>)}
                            </FormItem>
                            <FormItem label="Fax Numarası" hasFeedback>
                                {getFieldDecorator('faxNumber', {
                                    initialValue: data.faxNumber,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Fax Numarası giriniz!',
                                        }

                                    ],
                                })(<Input type="text"/>)}
                            </FormItem>
                            <FormItem label="Telefon Numarası" hasFeedback>
                                {getFieldDecorator('phoneNumber', {
                                    initialValue: data.phoneNumber,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Telefon numarası giriniz!',
                                        }

                                    ],
                                })(<Input type="text"/>)}
                            </FormItem>
                            <FormItem label="Kişisel Telefon Numarası" hasFeedback>
                                {getFieldDecorator('personelPhoneNumber', {
                                    initialValue: data.personelPhoneNumber,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Telefon numarası giriniz!',
                                        }

                                    ],
                                })(<Input type="text"/>)}
                            </FormItem>
                            <FormItem label="Kurs Logo" hasFeedback>
                                {getFieldDecorator('image', {})(<Input type="file" onChange={this.onChange}/>)}
                            </FormItem>
                            <FormItem label="Logo">
                                <Avatar src={data.logo} size="large"/>
                            </FormItem>
                            <FormItem>
                                <Button icon="plus" type="primary" htmlType="submit">
                                    Kaydet
                                </Button>
                            </FormItem>

                        </Form>
                    </Box>)
                }

            </LayoutWrapper>
        );
    }
}

const WrappedRooms = Form.create()(Settings);

function mapStateToProps(state) {
    const {Settings} = state;
    return {
        Settings
    };
}

export default connect(
    mapStateToProps,
    {
        getSettings,
        setSettings
    }
)(WrappedRooms);

