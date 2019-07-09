import React from 'react';
import {Modal, Table, Button} from 'antd';


function download(doc) {
    if (doc.isSending === false) {
        return;
    }
    window.open(doc.filePath, '_blank');
}

const getDocuments = (props) => {

    const data= [];
    props.docs.filter(p=>{
       return data.push({
           ...p,
           key:p.id,
       })
    });
    const columns = [{
        title: 'Başlık',
        dataIndex: 'title',
        key: 'id',
    }, {
        title: 'Durum',
        key: 'isSending',
        render: e => {
            return <span>{e.isSending ? 'Gönderildi' : 'Bekleniyor'}</span>
        }
    }, {
        title: 'İndir',
        key: 'download',
        render: e => {
            return <Button  key={e.id} htmlType="button" icon='download' onClick={() => download(e)}></Button>
        }
    }];
    return (<Modal
        title="Belgeler"
        visible={props.visible}
        onOk={props.docOk}
        okText="Tamam"
        cancelText="İptal"
        onCancel={props.docCancel}
    >
        <Table dataSource={data} columns={columns}  />

    </Modal>);
};
export default getDocuments;