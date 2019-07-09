import React from 'react';
import Popconfirm from '../../components/feedback/popconfirm';
import Button from '../../components/uielements/button';
import { notification } from '../../components/';


const deleteButton= (props)=>{
    const { handleDelete } = props;

    return(     <Popconfirm
        title="Emin misiniz?"
        okText="Evet"
        cancelText="Hayır"
        onConfirm={() => {
            notification('error', 'Siliniyor ve öğrencilere bilgi iletiliyor', '');
            handleDelete();
        }}
    >
        <Button icon="close" type="default" className="isoDeleteBtn" />
    </Popconfirm>);
};
export default deleteButton;