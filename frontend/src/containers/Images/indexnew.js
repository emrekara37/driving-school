import React, {PureComponent} from 'react';
import PageHeader from '../../components/utility/pageHeader';
import LayoutContentWrapper from '../../components/utility/layoutWrapper.js';
import TableDemoStyle from '../Tables/antTables/demo.style';
import Notification from "../../components/notification";
import {connect} from "react-redux";
import imageAction from '../../redux/image/actions';
import {Avatar, Button, Form, Input, Modal, Spin, Table,Popconfirm} from "antd";
import {getCourseId} from "../../helpers/utility";

const {getImages, addImage,deleteImage} = imageAction;
const FormItem = Form.Item;

class IndexNew extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: {}
        };

        this.addImage = this.addImage.bind(this);
        this.close = this.close.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    addImage() {
        const {images} = this.props.Images;
        if (images.length ===4){
            Notification("warning","Maksimum 4 adet resim ekleyebilirsiniz");
            return;
        }
        this.setState({
            ...this.state,
            visible: true
        });
    }

    close() {
        this.setState({
            ...this.state,
            visible: false
        })
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Notification(
                    'success',
                    'Resim Ekleniyor',
                );
                const data = {
                    name: values.name,
                    courseId: getCourseId(),
                    image: this.state.image
                };
                this.setState({
                    ...this.state,
                    visible:false
                });
                this.props.addImage(data);
            }
        });
    };

    async componentDidMount() {
        this.props.getImages();
    }

    onChange(e) {
        this.setState({image: e.target.files[0]});
    }

    render() {
        const columns = [
            {
                title: 'İsim',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Resim',
                key: 'path',
                render: e => {
                    return <Avatar size="large" src={e.imagePath}/>
                }
            },
            {
                title:'İşlem',
                key:'action',
                render: e =>{
                    return (  <Popconfirm title={`Resmi silmek istiyor musunuz`} okText="Evet"
                                          cancelText="Hayır" onConfirm={() => this.props.deleteImage(e.id)}>
                        <Button
                            htmlType="button"
                            type="danger"
                            shape="circle"
                            icon="delete"
                        />
                    </Popconfirm>)
                }
            }

        ];

        const {getFieldDecorator} = this.props.form;
        const {imageLoading, images} = this.props.Images;
        if (imageLoading) {
            return (<Spin tip="Yükleniyor"/>)
        }
        let dataSource = [];
        if (images.length > 0) {
            images.map(item => {
                return dataSource.push({
                    key: item.id,
                    ...item
                });
            });
        }



        return (<LayoutContentWrapper>
            <PageHeader>
                Resimler
            </PageHeader>
            <Button htmlType="button" type="primary" style={{marginBottom: 15}} icon="plus"
                    onClick={this.addImage}> Resim Ekle</Button>
            <TableDemoStyle className="isoLayoutContent">
                <Table dataSource={dataSource} columns={columns}/>
            </TableDemoStyle>

            <Modal
                title="Yeni Resim Ekle"
                visible={this.state.visible}
                onOk={this.onSubmit}
                onCancel={this.close}
                footer={[
                    <Button htmlType="button" key="back" onClick={this.close}>Çık</Button>,
                    <Button key="submit" type="primary" htmlType="submit"
                            onClick={this.onSubmit}>
                        Ekle
                    </Button>,
                ]}
            >
                <Form>

                    <FormItem hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Resim Ad giriniz!',
                                }
                            ],
                        })(<Input size="large" placeholder="Resim Ad" type="text"/>)}
                    </FormItem>

                    <FormItem hasFeedback>
                        {getFieldDecorator('image', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Resim seçiniz!',
                                }
                            ],
                        })(<Input size="large" placeholder="Resim Ad" type="file" onChange={this.onChange}/>)}
                    </FormItem>
                </Form>

            </Modal>
        </LayoutContentWrapper>)
    }
}

function mapStateToProps(state) {
    const {Images} = state;
    return {Images};
}

const wrap = Form.create()(IndexNew);
export default connect(
    mapStateToProps,
    {
        addImage,
        getImages,
        deleteImage
    }
)(wrap);
