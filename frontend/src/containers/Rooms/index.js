import React, {PureComponent} from 'react';
import {Input,Button,Checkbox} from "antd";
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Form from '../../components/uielements/form';
import Notification from "../../components/notification";
const FormItem = Form.Item;

class Rooms extends PureComponent {

handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            Notification(
                'success',
                'Received values of form',
                JSON.stringify(values)
            );
        }
    });
};
render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <LayoutWrapper>
            <PageHeader>
                Odalar
            </PageHeader>
            <Box>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem  label="E-mail" hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input name="email" id="email" />)}
                    </FormItem>
                    <FormItem label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.checkConfirm,
                                },
                            ],
                        })(<Input type="password" />)}
                    </FormItem>
                    <FormItem label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.checkPassword,
                                },
                            ],
                        })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                    </FormItem>
                    <FormItem  style={{ marginBottom: 8 }}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                            rules: [
                                {
                                    message: 'Please input your E-mail!',
                                    required: true,
                                },
                            ],
                        })(
                            <Checkbox>
                                I have read the <a href="# ">agreement</a>
                            </Checkbox>
                        )}
                    </FormItem>
                    <FormItem >
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </FormItem>
                </Form>
            </Box>
        </LayoutWrapper>
    );
}
}

const WrappedRooms = Form.create()(Rooms);

export default WrappedRooms;