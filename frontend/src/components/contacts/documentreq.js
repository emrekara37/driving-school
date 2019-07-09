import React, {PureComponent} from 'react';
import {Button, Form, Input, Modal} from "antd";
import Notification from "../notification";
import {getCourseId} from "../../helpers/utility";

const FormItem = Form.Item;

class DocumentReq extends PureComponent {


    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Notification(
                    'success',
                    'Belge talebi gönderiliyor',
                );
                this.setState({isSubmit: true});
                const data = {
                    ...values,
                    courseId: getCourseId(),
                    key: '-',
                    documentType: 2,
                    userId: this.props.contact.id
                };
                this.props.sendDocumentReq(data);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {contact} = this.props;
        return (<Modal
            title={`${contact.name} için belge talebi`}
            visible={this.props.isVisible}
            onOk={this.onSubmit}
            onCancel={this.props.closeDocumentModal}
            footer={[
                <Button htmlType="button" key="back" onClick={this.props.closeDocumentModal}>Çık</Button>,
                <Button key="submit" type="primary" htmlType="submit"
                        onClick={this.onSubmit}>
                    Belge Talep
                </Button>,
            ]}
        >
            <Form>

                <FormItem hasFeedback>
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: 'Belge İsmi giriniz!',
                            }
                        ],
                    })(<Input size="large" placeholder="Belge İsmi" type="text"/>)}
                </FormItem>
            </Form>

        </Modal>)
    };
}

const WrappedForm = Form.create()(DocumentReq);
export default WrappedForm;
