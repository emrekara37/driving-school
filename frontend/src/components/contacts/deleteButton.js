import React from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';


const DeleteButton = (props) => {
    const {contact, deleteContact} = props;
    let name = '';
    if (contact.name) {
        name = `${contact.name} `;
    }

    return (<Popconfirm
        title={`${name} ile ilişkiyi kes?`}
        okText="Evet"
        cancelText="Hayır"
        onConfirm={() => {
            notification('error', `${name} İle ilişki kesiliyor`, '');
            deleteContact(contact.id);
        }}
    >
        <Button icon="close" type="default" className="isoDeleteBtn"/>
    </Popconfirm>);
};
export default DeleteButton;
