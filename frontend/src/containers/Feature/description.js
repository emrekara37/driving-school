import React, {PureComponent} from 'react';
import {Input, Button, Spin} from "antd";
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Form from '../../components/uielements/form';
import Notification from "../../components/notification";
import actions from '../../redux/feature/actions';
import {connect} from "react-redux";
import {courseFeatures} from '../../settings/index';
const FormItem = Form.Item;
const {getFeature,addFeature} = actions;

class Description extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false
        };
    }



    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Notification(
                    'success',
                    'Ayarlarınız kaydediliyor',
                );
                this.setState({isSubmit: true});
                const id = this.props.Feature.feature.id;
                const {courseDescription}=courseFeatures;
                const data = {
                    value : values.desc,
                    id,
                    key: courseDescription
                };
                this.props.addFeature(data);
            }
        });
    };

    componentDidMount() {
        this.props.getFeature(courseFeatures.courseDescription);
    }
    render() {
        const {isLoading, feature} = this.props.Feature;
        const {getFieldDecorator} = this.props.form;
        return (
            <LayoutWrapper>
                <PageHeader>
                    Kurs Hakkında
                </PageHeader>
                {
                    isLoading ? (<Spin tip="Yükleniyor"/>) : (<Box>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="Kurs Hakkında" hasFeedback>
                                {getFieldDecorator('desc', {
                                    initialValue: feature.value,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Lütfen boş bırakmayınız!',
                                        },
                                    ],
                                })(<Input.TextArea name="text" id="desc"/>)}
                            </FormItem>
                            <FormItem>
                                <Button icon="plus" type="primary" htmlType="submit">
                                    Kaydet
                                </Button>
                            </FormItem>

                        </Form>
                    </Box>)
                }

            </LayoutWrapper>
        );
    }
}

const WrappedRooms = Form.create()(Description);

function mapStateToProps(state) {
    const {Feature} = state;
    return {
        Feature
    };
}

export default connect(
    mapStateToProps,
    {
        getFeature,
        addFeature
    }
)(WrappedRooms);

