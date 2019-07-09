import React, {PureComponent} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper.js';
import {Button, Spin} from 'antd';
import {connect} from "react-redux";
import actions from '../../redux/payment/actions';
import PageHeader from '../../components/utility/pageHeader';
import AddCash from '../../components/payment/addcash';
import AddBill from '../../components/payment/addbill';
import AddOnline from '../../components/payment/addonline';
import GetCash from '../../components/payment/getcash';
import GetOnline from '../../components/payment/getonline';
import GetBill from '../../components/payment/getbill';


const {getPayment} = actions;

class Payment extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            billVisible: false,
            onlineVisible: false,
            userId: ""
        };
        this.addCash = this.addCash.bind(this);
        this.addBill = this.addBill.bind(this);
        this.addOnline = this.addOnline.bind(this);
        this.cancel = this.cancel.bind(this);
        this.cancelBill = this.cancelBill.bind(this);
    }

    cancel() {

        this.setState({
            ...this.state,
            visible: false
        });
    }

    cancelBill() {

        this.setState({
            ...this.state,
            billVisible: false
        });
    }

    cancelOnline() {
        this.setState({
            ...this.state,
            onlineVisible: false
        });
    }

    addCash() {
        this.setState({
            ...this.state,
            visible: true
        });
    }

    addBill() {
        this.setState({
            ...this.state,
            billVisible: true
        });
    }

    addOnline() {
        this.setState({
            ...this.state,
            onlineVisible: true
        });
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            ...this.state,
            userId: id
        });
        this.props.getPayment(id);
    }


    render() {

        const {loading, payment} = this.props.Payment;



        if (loading) {
            return (<Spin tip="Yükleniyor "/>)
        }
        let body;
        if (payment) {
            console.log(payment);
            if (payment.type === 1) {
                body = <GetCash payment={payment}/>;
            }
            else if(payment.type===2){
                body = <GetOnline payment={payment} />;
            }
            else if (payment.type === 3) {
                body = <GetBill payment={payment}/>;
            }

        }
        return (
            <LayoutContentWrapper>
                <PageHeader>
                    Ödeme
                </PageHeader>
                {
                    payment ? (<React.Fragment>{body}</React.Fragment>) : (
                        <Button.Group>
                            <Button htmlType="button" type="primary" icon="plus" onClick={this.addCash}>Nakit</Button>
                            <Button htmlType="button" type="primary" icon="plus" onClick={this.addBill}>Senet</Button>
                            <Button htmlType="button" type="primary" icon="desktop"
                                    onClick={this.addOnline}>Online</Button>
                        </Button.Group>
                    )
                }

                <AddCash visible={this.state.visible} cancel={this.cancel} userId={this.state.userId}/>
                <AddBill visible={this.state.billVisible} cancel={this.cancelBill} userId={this.state.userId}/>
                <AddOnline visible={this.state.onlineVisible} cancel={this.cancelOnline} userId={this.state.userId}/>


            </LayoutContentWrapper>
        );
    }
}

function mapStateToProps(state) {
    const {Payment} = state;
    return {Payment};
}

export default connect(
    mapStateToProps,
    {
        getPayment
    }
)(Payment);
