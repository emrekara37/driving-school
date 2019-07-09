import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import ModalEvents from './modalEvents';
import notification from '../../components/notification';
import calendarActions from '../../redux/calendar/actions';
import contactActions from '../../redux/contacts/actions';
import {CalendarStyleWrapper} from './calendar.style';
import 'moment/locale/tr';
import {getCourseId} from "../../helpers/utility";
import {Spin} from "antd";

moment.locale('tr');
moment().format("LLLL");
const Localize = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const {changeView, changeEvents, addCalendar, getCalendar, deleteCalendar} = calendarActions;
const {getUsers} = contactActions;


const getIndex = (events, selectedEvent) =>
    events.findIndex(event => event.id === selectedEvent.id);

const messages = {
    day: "Günlük",
    week: "Haftalık",
    month: "Aylık",
    previous: "Geri",
    next: "İleri",
    date: "Tarih",
    time: "Saat",
    event: "Açıklama",
    today: "Bugün",
    noEventsInRange: "Görüntülenecek birşey yok",
    agenda: "Takvim"
};

class DndCalendar extends Component {
    state = {
        view: this.props.view,
        modalVisible: false,
        selectedData: undefined,
    };

    componentDidMount() {
        this.props.getUsers(getCourseId());
        this.props.getCalendar();
    }

    onSelectEvent = selectedData => {
        this.setState({modalVisible: 'update', selectedData});
    };
    onSelectSlot = selectedData => {
        this.setState({modalVisible: 'new', selectedData});
    };

    onView = view => {
        this.props.changeView(view);
    };
    moveEvent = ({event, start, end, isAllDay: droppedOnAllDaySlot}) => {
        const {events, changeEvents} = this.props;
        let allDay = event.allDay;
        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true;
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false;
        }

        const updatedEvent = {...event, start, end, allDay};
        const idx = getIndex(events, updatedEvent);
        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);
        changeEvents(nextEvents);

        notification(
            'success',
            'Move event successfully',
            `${event.title} was dropped onto ${event.start}`
        );
    };

    resizeEvent = ({event, start, end}) => {
        const {events, changeEvents} = this.props;
        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
                ? {...existingEvent, start, end}
                : existingEvent;
        });

        changeEvents(nextEvents);

        notification(
            'success',
            'Resize event successfully',
            `${event.title} was resized to ${start}-${end}`
        );
    };

    setModalData = (type, selectedData) => {
        const {changeEvents} = this.props;
        const events = [...this.props.events];
        const {modalVisible} = this.state;
        if (type === 'cancel') {
            this.setState({
                modalVisible: false,
                selectedData: undefined,
            });
        } else if (type === 'delete') {
            const idx = getIndex(events, selectedData);
            if (idx > -1) {
                events.splice(idx, 1);
            }
            changeEvents(events);
            this.setState({
                modalVisible: false,
                selectedData: undefined,
            });
            this.props.deleteCalendar(selectedData.id);

        } else if (type === 'updateValue') {
            this.setState({selectedData});
        } else {
            if (modalVisible === 'new') {

            } else {
                const idx = getIndex(events, selectedData);
                if (idx > -1) {
                    events[idx] = selectedData;
                }
            }
            changeEvents(events);
            this.setState({
                modalVisible: false,
                selectedData: undefined,
            });
            selectedData.start = moment(selectedData.start).format("LLLL");
            selectedData.end = moment(selectedData.end).format("LLLL");
            this.props.addCalendar(selectedData);
            selectedData.start= moment(selectedData.start).toDate();
            selectedData.end= moment(selectedData.end).toDate();
            events.push(selectedData);
        }
    };

    render() {
        const {users, calendarLoading} = this.props;
        return (
            <React.Fragment>
                {
                    calendarLoading ? (<Spin tip="Yükleniyor"/>) : (
                        <CalendarStyleWrapper className="isomorphicCalendarWrapper">
                            <ModalEvents
                                modalVisible={this.state.modalVisible}
                                selectedData={this.state.selectedData}
                                users={users}
                                setModalData={this.setModalData}
                            />
                            <DragAndDropCalendar
                                className="isomorphicCalendar"
                                selectable
                                localizer={Localize}
                                events={this.props.events}
                                onEventDrop={this.moveEvent}
                                resizable
                                onEventResize={this.resizeEvent}
                                onSelectEvent={this.onSelectEvent}
                                onSelectSlot={this.onSelectSlot}
                                onView={this.onView}
                                defaultView={BigCalendar.Views.DAY}
                                defaultDate={new Date()}
                                messages={messages}
                                step={60}
                            />
                        </CalendarStyleWrapper>)
                }
            </React.Fragment>

        );
    }
}

function mapStateToProps(state) {
    const {events, view, calendarLoading} = state.Calendar;
    const {users} = state.Contacts;
    return {events, view, users, calendarLoading};
}

export default connect(
    mapStateToProps,
    {changeView, changeEvents, getUsers, addCalendar, getCalendar, deleteCalendar}
)(DndCalendar);
