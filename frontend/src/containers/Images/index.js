import React, {Component} from 'react';
import './slider.css';
import {Input, Button, Spin, Row, Card, Col} from "antd";
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Form from '../../components/uielements/form';
import Notification from "../../components/notification";
import actions from '../../redux/image/actions';
import {connect} from "react-redux";

const FormItem = Form.Item;
const {getImages, addImages} = actions;
const imageCount = [1, 2, 3];

class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            isSubmit: false
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            image: {
                key: e.target.attributes["id"].value,
                file: e.target.files
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                Notification(
                    'success',
                    'Ayarlarınız kaydediliyor',
                );
                this.setState({isSubmit: true});
                const {file} = this.state;
                const data = {
                    file
                };
                this.props.addImages(data);
            }
        });
    };

    componentDidMount() {
        this.props.getImages();
    }

    render() {
        const {imageLoading, images} = this.props.Images;
        console.log(this.props.Images);
        const {getFieldDecorator} = this.props.form;
        return (
            <LayoutWrapper>
                <PageHeader>
                    Resimler
                </PageHeader>
                {
                    imageLoading ? (<Spin tip="Yükleniyor"/>) : (<Box>

                        <Row gutter={16} style={{marginTop: '10px'}}>

                            {

                                imageCount.map(item => (

                                <Col span={8} key={item}>
                                        <Card type="inner"
                                              title={`${item}. Resim`}
                                        >
                                            <Form onSubmit={this.handleSubmit}>
                                                <FormItem label="Resim Adı" hasFeedback>
                                                    {getFieldDecorator(`name_${item}`, {})(<Input type="text"/>)}
                                                </FormItem>
                                                <FormItem label={`${item}. Resim`} hasFeedback>
                                                    {getFieldDecorator(`image_${item}`, {})(<Input type="file" onChange={this.onChange}/>)}
                                                </FormItem>
                                                <FormItem>
                                                    {getFieldDecorator(`seq_${item}`, {initialValue: item})(<Input
                                                        type="hidden"/>)}
                                                </FormItem>
                                                <img src={images[0].imagePath} style={{height:'80px',width:'100%',objectFit:'contain'}} alt={JSON.stringify(images[item-1])}/>
                                                <FormItem>
                                                    <Button icon="plus" type="primary" htmlType="submit">
                                                        Kaydet
                                                    </Button>
                                                </FormItem>

                                            </Form>
                                        </Card>
                                    </Col>

                                ))
                            }

                        </Row>
                    </Box>)
                }
            </LayoutWrapper>
        );
    }
}

const WrappedRooms = Form.create()(Images);

function mapStateToProps(state) {
    const {Images} = state;
    return {
        Images
    };
}

export default connect(
    mapStateToProps,
    {
        getImages,
        addImages
    }
)(WrappedRooms);

