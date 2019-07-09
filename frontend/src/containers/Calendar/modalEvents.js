import React from 'react';
import moment from 'moment';
import Input from '../../components/uielements/input';
import {DateRangepicker} from '../../components/uielements/datePicker';
import Modal from '../../components/feedback/modal';
import {CalendarModalBody} from './calendar.style';
import {Select} from 'antd';
import DeleteButton from './deleteButton';

import 'moment/locale/tr';

moment.locale('tr');
const RangePicker = DateRangepicker;
const Option = Select.Option;
const localeDatePicker = {
    lang: {
        placeholder: 'Tarih seç',
        rangePlaceholder: ['Başlangıç', 'Bitiş'],
        today: 'Bugün',
        now: 'Şimdi',
        backToToday: 'Düne dön',
        ok: 'Tamam',
        clear: 'Temizle',
        month: 'Ay',
        year: 'Yıl',
        timeSelect: 'Saat seç',
        dateSelect: 'Gün seç',
        monthSelect: 'Ay seç',
        yearSelect: 'Yıl seç',
        decadeSelect: 'Onyıl seç',
        yearFormat: 'YYYY',
        dateFormat: 'M/D/YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'M/D/YYYY HH:mm:ss',
        monthFormat: 'MMMM',
        monthBeforeYear: true,
        previousMonth: 'Previous month (PageUp)',
        nextMonth: 'Next month (PageDown)',
        previousYear: 'Last year (Control + left)',
        nextYear: 'Next year (Control + right)',
        previousDecade: 'Last decade',
        nextDecade: 'Next decade',
        previousCentury: 'Last century',
        nextCentury: 'Next century'
    },
    timePickerLocale: {
        placeholder: 'Select time'
    }
};

let userIds = [];

const modalEvent = (props) => {

    const handleOk = () => {
        props.setModalData('ok', props.selectedData);
    };


    const handleCancel = () => {
        props.setModalData('cancel');
    };

    const handleDelete = () => {
        props.setModalData('delete', props.selectedData);
    };

    const {modalVisible, selectedData, setModalData} = props;
    if (selectedData) {
        if (selectedData.hasOwnProperty("userId")) {
            userIds = selectedData.userId.split(",");
        }
    }
    const onChange = (e) => {
        if (e.length > 0) {
            const newItem = e[e.length - 1];

            const index = userIds.indexOf(newItem);
            if (index >= 0) {
                userIds = userIds.splice(index, 1);
            } else {
                const phone = props.users.filter(u => u.id === newItem);
                if(phone.length > 0){
                    selectedData.phoneNumber= phone[0].phoneNumber;
                }
                userIds.push(newItem);
            }

        } else {
            userIds.splice(0, 1);
        }
        selectedData.userIds = userIds;
        setModalData("updateValue", selectedData);
    };
    const visible = !!modalVisible;
    if (!visible) {
        return <div/>;
    }


    const title = selectedData && selectedData.title ? selectedData.title : '';
    const desc = selectedData && selectedData.desc ? selectedData.desc : '';
    const start =
        selectedData && selectedData.start ? moment(selectedData.start) : '';
    const end =
        selectedData && selectedData.end ? moment(selectedData.end) : '';
    const onChangeTitle = event => {
        selectedData.title = event.target.value;
        setModalData('updateValue', selectedData);
    };
    const onChangeDesc = event => {
        selectedData.desc = event.target.value;
        setModalData('updateValue', selectedData);
    };
    const onChangeFromTimePicker = value => {
        try {
            selectedData.start = value[0].toDate();
            selectedData.end = value[1].toDate();

        } catch (e) {
        }
        setModalData('updateValue', selectedData);
    };
    return (<div>
        <Modal
            title={modalVisible === 'update' ? 'Ders Programını Düzenle' : 'Ders Programı Ekle'}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Tamam"
            cancelText="İptal"
        >
            <CalendarModalBody>
                <div className="isoCalendarInputWrapper">
                    <Input
                        value={title}
                        placeholder="Başlık"
                        onChange={onChangeTitle}
                    />
                </div>

                <div className="isoCalendarInputWrapper">
                    <Input
                        value={desc}
                        placeholder="Açıklama"
                        onChange={onChangeDesc}
                    />
                </div>
                <div className="isoCalendarInputWrapper">
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        onChange={onChange}
                        value={userIds}
                        placeholder="Öğrenci seçiniz"
                    >
                        {
                            props.users.map(item => (
                                <Option key={item.id}>{item.name} </Option>
                            ))
                        }
                    </Select>

                </div>

                <div className="isoCalendarDatePicker">
                    <RangePicker
                        locale={localeDatePicker}
                        ranges={{
                            "Bugün": [moment(), moment()],
                            'Bu ay': [moment(), moment().endOf('month')]
                        }}
                        value={[start, end]}
                        showTime
                        format="YYYY/MM/DD HH:mm:ss"
                        onChange={onChangeFromTimePicker}
                    />
                    <DeleteButton handleDelete={handleDelete}/>
                </div>
            </CalendarModalBody>
        </Modal>
    </div>);
};
export default modalEvent;