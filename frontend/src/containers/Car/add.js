import React, {Component} from 'react';
import {Input, Button} from "antd";
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Form from '../../components/uielements/form';
import Notification from "../../components/notification";
import actions from '../../redux/car/actions';
import {connect} from "react-redux";
const FormItem = Form.Item;
const {addCar} = actions;
class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            isSubmit:false
        };
        this.checkCarState= this.checkCarState.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    checkCarState(){

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
                    'Ekleniyor',
                );
                this.setState({isSubmit:true});
                const {file} = this.state;
                const data = {
                    ...values,
                    file
                };
                this.props.addCar(data);
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (


            <LayoutWrapper>
                <PageHeader>
                    Araba Ekle
                </PageHeader>
                <Box>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="Araba Adı" hasFeedback>
                            {getFieldDecorator('carName', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Lütfen araba adını giriniz!',
                                    },
                                ],
                            })(<Input name="text" id="email"/>)}
                        </FormItem>
                        <FormItem label="Açıklama" hasFeedback>
                            {getFieldDecorator('carDescription', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Açıklama giriniz!',
                                    }

                                ],
                            })(<Input type="text"/>)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('image', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Resim seçiniz!',
                                    }
                                ],
                            })(<Input type="file" onChange={this.onChange}/>)}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">
                                Ekle
                            </Button>
                        </FormItem>

                    </Form>
                </Box>
            </LayoutWrapper>
        );
    }
}

const WrappedRooms = Form.create()(AddCar);

function mapStateToProps(state) {
    const {Car} = state;
    return {
        Car
    };
}

export default connect(
    mapStateToProps,
    {
        addCar,
    }
)(WrappedRooms);

