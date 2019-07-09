import React, {PureComponent} from 'react';
import TableDemoStyle from '../../containers/Tables/antTables/demo.style';
import {Table, Button, message, Popconfirm} from 'antd';
import axios from 'axios';
import {API_URL} from "../../settings";

class GetBill extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            ren: false
        };
        this.paid = this.paid.bind(this);
    }


    componentDidMount() {

    }


    async paid(e) {
        let a = [];
        this.props.payment.method.map(p => {
            if (p.id === e.id) {
                p.isPaid = true;
            }
            return a.push(p);
        });
        this.props.payment.method= a;

        this.setState({
            ...this.state,
            ren : !this.state.ren
        });
        message.loading("Ödeme Alınıyor..");
        await axios.get(`${API_URL}api/app/coursePayment/${e.id}/paidBill`);
        message.destroy();
    }

    render() {
        const bills = this.props.payment.method;
        let dataSource = [];
        if (bills.length > 0) {
            bills.map(item => {
                return dataSource.push({
                    key: item.id,
                    ...item
                });
            });
        }

        const columns = [
            {
                title: 'Taksit',
                dataIndex: 'sequence',
                key: 'sequence',
            },
            {
                title: 'Miktar',
                dataIndex: 'installmentFee',
                key: 'installmentFee'
            },
            {
                title: 'Kalan',
                dataIndex: 'remainingPayment',
                key: 'remainingPayment'
            },
            {
                title: 'Ödeme T.',
                key: 'date',
                render: e => {
                    return <span>{e.paymentDate.split("T")[0]} </span>
                }
            },
            {
                title: 'Durum',
                key: 'isPaid',
                render: e => {
                    return e.isPaid ? <Button htmlType="button" type="primary">Ödendi</Button> :
                        <Popconfirm title="Durumu ödendiye çekmek istiyor musunuz ？" okText="Evet" cancelText="Hayır"
                                    onConfirm={() => this.paid(e)}
                        >
                            <Button htmlType="button" type="danger">Ödenmedi</Button>
                        </Popconfirm>
                }
            }
        ];
        return (

            <TableDemoStyle className="isoLayoutContent">
                <Table dataSource={dataSource} columns={columns}/>
            </TableDemoStyle>

        );
    }
}

export default GetBill;
