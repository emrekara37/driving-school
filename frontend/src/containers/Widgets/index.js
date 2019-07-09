import React, {PureComponent} from 'react';
import {Row, Col} from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import basicStyle from '../../settings/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import {connect} from 'react-redux'
import TodayCalendar from '../../components/dashboards/todayCalendar';
import UserCount from '../../components/dashboards/userCount';
import ViewerCount from '../../components/dashboards/viewerCount';
import CarCount from '../../components/dashboards/carCount';
import PaymentCount from '../../components/dashboards/paymentCount';


import actions from '../../redux/dashb/actions';

const {getUserCount, getViewCount, getTodayCalendars} = actions;

class WidgetIndex extends PureComponent {

    componentDidMount() {

    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const wisgetPageStyle = {
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'flex-start',
            overflow: 'hidden',
        };


        return (
            <LayoutWrapper>
                <div style={wisgetPageStyle}>
                    <Row style={rowStyle} gutter={0} justify="start">
                        <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                <UserCount/>
                            </IsoWidgetsWrapper>
                        </Col>

                        <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>


                                <ViewerCount/>

                            </IsoWidgetsWrapper>
                        </Col>

                        <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                <CarCount/>
                            </IsoWidgetsWrapper>
                        </Col>

                        <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                <PaymentCount/>
                            </IsoWidgetsWrapper>
                        </Col>
                    </Row>

                    <Row style={rowStyle} gutter={0} justify="start">
                        <Col lg={12} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                <IsoWidgetBox height={455} style={{overflow: 'hidden'}}>
                                    <TodayCalendar/>
                                </IsoWidgetBox>
                            </IsoWidgetsWrapper>
                        </Col>
                        <Col lg={12} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                <IsoWidgetBox height={455} style={{overflow: 'hidden'}}>
                                    <iframe
                                        title="Kurlar"
                                        src="https://tr.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&pairs=1,66,18"
                                        width="100%" height="100%" frameBorder="0"
                                        marginWidth="0" marginHeight="0"/>
                                </IsoWidgetBox>
                            </IsoWidgetsWrapper>
                        </Col>
                    </Row>
                </div>
            </LayoutWrapper>
        );
    }
}

function mapStateToProps(state) {
    const {Dash} = state;
    return {Dash};
}

export default connect(
    mapStateToProps,
    {getUserCount, getViewCount, getTodayCalendars}
)(WidgetIndex);
