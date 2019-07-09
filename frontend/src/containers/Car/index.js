import React, {PureComponent} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper.js';
import TableDemoStyle from '../Tables/antTables/demo.style';
import {Table, Button, Modal, Input, Form, Spin, Popconfirm, Avatar} from 'antd';
import {connect} from "react-redux";
import actions from '../../redux/car/actions';
import Notification from "../../components/notification";

const FormItem = Form.Item;
const {getCars,deleteCar} = actions;

class AntTable extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            modalTitle: '',
            loading: false,
            isDeleteLoading:false,
            data:[],
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteCar= this.deleteCar.bind(this);
    }

    deleteCar(e){
        this.setState({ state: this.state });
        Notification('success',"Araç siliniyor");
        this.props.Car.data= this.props.Car.data.filter(item => item.key !== e.id);
        this.props.deleteCar(e.id);
    }
    handleCancel() {
        this.setState({
            isVisible: false,
        });

    }

    componentDidMount() {
        this.props.getCars();
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
        this.setState({
            isVisible: true,
            modalTitle: e.val
        });

    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {Car} = this.props;

        const columns = [
            {
                title: 'Araba adı',
                dataIndex: 'carName',
                key: 'carName',

            },
            {
                title: 'Açıklama',
                dataIndex: 'carDescription',
                key: 'carDescription'
            },
            {
                title: 'Resim',
                key: 'image',
                render: e => {
                    return <Avatar src={e.carPhoto} size="large"
                                   alt={e.carName} title={e.carName}/>
                }
            },
            {
                title: 'İşlem',
                key: 'action',
                render: e => {
                    return (
                        <Button.Group>

                            <Popconfirm title={`${e.carName} aracını silmek istiyor musunuz`} okText="Evet"
                                        cancelText="Hayır" onConfirm={() => this.deleteCar(e)}>
                                <Button
                                    type="danger"
                                    shape="circle"
                                    icon="delete"
                                />
                            </Popconfirm>
                        </Button.Group>)
                }
            }
        ];
        return (
            <LayoutContentWrapper>
                {
                    Car.isLoading === true ? (<Spin tip="Yükleniyor"/>) : (
                        <TableDemoStyle className="isoLayoutContent">
                            <Table dataSource={Car.data} columns={columns}/>
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
    const {Car} = state;
    return {Car};
}

const wrap = Form.create()(AntTable);
export default connect(
    mapStateToProps,
    {getCars,deleteCar}
)(wrap);
