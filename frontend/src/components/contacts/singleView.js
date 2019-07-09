import React from 'react';
import {Link} from "react-router-dom";
import {ContactCardWrapper} from './contactCard.style';
import {Button, Row} from "antd";
const SingleView = (props) => {

    const {contact, otherAttributes} = props;
    const name = contact.name;
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
        const value = contact[attribute.value];
        if (value) {
            extraInfos.push(
                <div className="isoContactCardInfos" key={attribute.value}>
                    <p className="isoInfoLabel">{`${attribute.title}`}</p>
                    <p className="isoInfoDetails">{value}</p>
                </div>
            );
        }
    });
    return (<ContactCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
            <div className="isoPersonImage">
                <img alt="#" src={contact.photo}/>
            </div>
            <h1 className="isoPersonName">{name}</h1>
        </div>
        <div className="isoContactInfoWrapper">{extraInfos}
            <Row>
                <Button.Group>
                    <Button  htmlType="button"  type="primary" onClick={() => props.documentReq(contact)}>Belge Talebi</Button>
                    <Button  htmlType="button"  type="primary" onClick={props.sendNot}>Bildirim</Button>
                    <Link to={`/dashboard/payment/${contact.id}`}>
                    <Button  htmlType="button"  type="primary" onClick={props.sendNot}>Ödeme</Button>
                    </Link>
                </Button.Group>

            </Row>
            <Row style={{marginTop: '10px'}}>
                <Button.Group>
                    <Link to="/dashboard/calendar">
                        <Button type="secondary"  htmlType="button" >Takvimi Ayarla</Button>
                    </Link>
                    <Button type="secondary" htmlType="button" onClick={()=>props.getDocuments(contact)}>Belgeleri</Button>
                </Button.Group>
            </Row>
        </div>
    </ContactCardWrapper>);
};
export default SingleView;
