import React, {PureComponent} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper.js';
import TableDemoStyle from '../Tables/antTables/demo.style';
import {Table, Button, Spin, Avatar, Popconfirm, Modal, Select} from 'antd';
import {connect} from "react-redux";
import actions from '../../redux/prereg/actions';
import PageHeader from '../../components/utility/pageHeader';
import {preregState} from './conf';
import Notification from "../../components/notification";


const {getPreRegs, changePreRegStatus, getProducts} = actions;

class PreReg extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            loading: false,
            selectedId: 0,
            products: [],
            selectedProductId: 0,
            status: 0
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.rejectReg = this.rejectReg.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.approveReg = this.approveReg.bind(this);
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            selectedProductId: e
        });
    }

    rejectReg(e) {
        this.props.changePreRegStatus({
            id: e.id,
            type: 2
        });
        Notification("warning", "Ön kayit işlemi red ediliyor");
    }

    async approveReg(e) {
        const products = await getProducts();
        this.setState({
            ...this.state,
            isVisible: true,
            products: products,
            selectedId: e.id,
            selectedProductId: 0
        })
    }

    handleCancel() {
        this.setState({
            isVisible: false,
        });

    }

    componentDidMount() {
        this.props.getPreRegs();
    }

    handleOk() {

        this.props.changePreRegStatus({
            type: 1,
            id: this.state.selectedId,
            productId: this.state.selectedProductId
        });
        this.setState({
            ...this.state,
            isVisible: false
        })
        Notification("success", "Ön kayit işlemi kabul ediliyor");
    }

    render() {
        const {loading, preregs} = this.props.PreReg;
        let dataSource = [];
        if (preregs.length > 0) {
            preregs.map(item => {
                return dataSource.push({
                    key: item.id,
                    ...item
                });
            });
        }

        const columns = [
            {
                title: 'Ad Soyad',
                dataIndex: 'etUser.firstName',
                key: 'key',
            },
            {
                title: 'E Posta',
                dataIndex: 'etUser.email',
                key: 'email'
            },
            {
                title: 'Telefon',
                dataIndex: 'etUser.phoneNumber',
                key: 'phone'
            },
            {
                title: 'Başvuru T.',
                key: 'date',
                render: e => {
                    return <span> {e.createdDate.toString().split('T')[0]}  </span>
                }
            },
            {
                title: 'Resim',
                key: 'photo',
                render: e => {
                    return <Avatar src={`${e.etUser.photo}`}/>
                }
            },
            {
                title: 'Durum',
                key: 'state',
                render: e => {
                    return <span>{preregState[e.type]}</span>
                }
            },
            {
                title: 'İşlem',
                key: 'action',
                render: e => {
                    if (e.type !== 0) {
                        return <span></span>;
                    }
                    return <Popconfirm title="Ön Kayıt işlemini onaylıyor musunuz？" okText="Onayla" cancelText="Reddet"
                                       onCancel={() => this.rejectReg(e)}
                                       onConfirm={() => this.approveReg(e)}
                    >


                        <Button
                            htmlType="button"
                            type="secondary"
                            shape="circle"
                            icon="plus"
                        />
                    </Popconfirm>
                }
            }
        ];
        return (
            <LayoutContentWrapper>
                <PageHeader>
                    Ön Kayıt Başvuruları
                </PageHeader>
                {
                    loading === true ? (<Spin tip="Yükleniyor"/>) : (
                        <TableDemoStyle className="isoLayoutContent">
                            <Table dataSource={dataSource} columns={columns}/>
                        </TableDemoStyle>
                    )


                }
                <Modal
                    title="Başvuru Kabul"
                    visible={this.state.isVisible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                >
                    <Select
                        style={{width: 200}}
                        placeholder="Ehliyet Tipi"
                        onChange={this.handleChange}
                    >
                        {
                            this.state.products.map(item => {
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            })
                        }
                    </Select>
                </Modal>
            </LayoutContentWrapper>
        );
    }
}

function mapStateToProps(state) {
    const {PreReg} = state;
    return {PreReg};
}

export default connect(
    mapStateToProps,
    {
        getPreRegs,
        changePreRegStatus
    }
)(PreReg);
