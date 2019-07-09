import React, {PureComponent} from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';
import TableDemoStyle from './demo.style';
import {Table, Button, Modal, Input, Form, Spin} from 'antd';
import {connect} from "react-redux";
const FormItem = Form.Item;
const {getLang} = actions;

class AntTable extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            modalTitle: '',
            loading: false
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel() {
        this.setState({
            isVisible: false,
        });

    }

    componentDidMount() {
        this.props.getLang("tr");
    }

    handleOk() {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();


            this.setState({loading: true});
        });

    }

    editLang = (e) => {
        console.log(e);
        this.setState({
            isVisible: true,
            modalTitle: e.val
        });

    };
    render() {
        const {getFieldDecorator} = this.props.form;
        const {CokluDil} = this.props;
        let dataSource= [];
        if(CokluDil.data.culture){
            const keys = Object.keys(CokluDil.data.texts);
            for(let i=0;i<keys.length;i++){
                dataSource.push({
                    key:i,
                    name:keys[i],
                    val:CokluDil.data.texts[keys[i]]
                })
            }
        }

        const columns = [{
            title: 'Key',
            dataIndex: 'name',
            key: 'key',
        }, {
            title: 'İşlem',
            key: 'action',
            render: e => {
                return <Button
                    type="secondary"
                    shape="circle"
                    icon="edit"
                    onClick={() => this.editLang(e)}

                />
            }
        }
        ];
        return (
            <LayoutContentWrapper>
                {
                    CokluDil.isLoading === true ? (<Spin tip="Yükleniyor"/>) : (
                        <TableDemoStyle className="isoLayoutContent">
                            <Table dataSource={dataSource} columns={columns}/>
                        </TableDemoStyle>
                    )
                }
                <Modal
                    title={this.state.modalTitle}
                    visible={this.state.isVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Çık</Button>,
                        <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading}
                                onClick={this.handleOk}>
                            Değiştir
                        </Button>,
                    ]}
                >
                    <Form>

                        <FormItem hasFeedback>
                            {getFieldDecorator('val', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Lütfen değişecek metni giriniz!',
                                    }
                                ],
                            })(<Input size="large" placeholder="Değer" type="text"/>)}
                        </FormItem>
                    </Form>

                </Modal>
            </LayoutContentWrapper>
        );
    }
}

function mapStateToProps(state) {
    const {CokluDil} = state;
    return {CokluDil};
}

const wrap = Form.create()(AntTable);
export default connect(
    mapStateToProps,
    {getLang}
)(wrap);
