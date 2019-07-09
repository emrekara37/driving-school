import React, {PureComponent} from 'react';
import {Alert, Table} from "antd";
import axios from "axios";
import {API_URL} from "../../settings";
import {getCourseId} from "../../helpers/utility";


const getPreReg = async (id) => (axios.get(`${API_URL}api/app/preRegistration/waitingPreRegs/${id}`));


class ToadyCalendar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    async componentDidMount() {
        const list = await getPreReg(getCourseId());
        let arr = [];
        list.data.map(item=>{
            return arr.push({
                key:item.id,
                ...item
            });
        });
        this.setState({
            list: arr
        })
    }

    render() {
        const columns = [{
            title: 'Ad Soyad',
            dataIndex: 'etUser.firstName',
            key: 'firstName',
        }, {
            title: 'Email',
            dataIndex: 'etUser.email',
            key: 'email',
        }, {
            title: 'Telefon',
            dataIndex: 'etUser.phoneNumber',
            key: 'phoneNumber',
        }];
        return (<React.Fragment>
            <Alert message="Bekleyen Ön Kayıtlar" style={{marginBottom: 10}} type="info" showIcon/>
            <Table dataSource={this.state.list} columns={columns}/>

        </React.Fragment>);
    }
}


export default ToadyCalendar;