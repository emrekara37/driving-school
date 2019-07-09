import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import contactAction from '../../redux/contacts/actions';
import {Layout, message,  Spin} from 'antd';
import Button from '../../components/uielements/button';
import ContactList from '../../components/contacts/contactList';
import SingleContactView from '../../components/contacts/singleView';
import DeleteButton from '../../components/contacts/deleteButton';
import {otherAttributes} from './fakeData';
import {ContactsWrapper} from './contacts.style';
import Scrollbar from '../../components/utility/customScrollBar.js';
import Documents from '../../components/contacts/getDocuments';
import {getCourseId} from "../../helpers/utility";
import DrawerFrom from '../../components/contacts/addContact';
import Notification from "../../components/notification";
import DocumentReq from '../../components/contacts/documentreq';
import SendContact from "../../components/contacts/sendcontact";

const {
    changeContact,
    addContact,
    deleteContact,
    getUsers,
    getProducts,
    getDocuments,
    sendDocReq,
    getPeriots
} = contactAction;
const {Content} = Layout;

class Contacts extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            products: [],
            periots: [],
            isSubmit: false,
            documents: [],
            documentsModalVisible: false,
            selectedContact: {},
            modalIsVisible: false,
            sendNotVisible: false,
        };
        this.addContact = this.addContact.bind(this);
        this.onAddContact = this.onAddContact.bind(this);
        this.onClose = this.onClose.bind(this);
        this.documentReq = this.documentReq.bind(this);
        this.docOk = this.docOk.bind(this);
        this.docCancel = this.docCancel.bind(this);
        this.closeDocumentModal = this.closeDocumentModal.bind(this);
        this.sendDocumentReq = this.sendDocumentReq.bind(this);
        this.getDocuments = this.getDocuments.bind(this);
        this.sendNot = this.sendNot.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    sendNot() {
        this.setState({
            ...this.state,
            sendNotVisible: true
        });
    }

    onOk() {
        this.setState({
            ...this.state,
            sendNotVisible: false
        });
    }

    onCancel() {
        this.setState({
            ...this.state,
            sendNotVisible: false
        });
    }

    docOk() {
        this.setState({
            ...this.state,
            documentsModalVisible: false
        })
    }

    docCancel() {
        this.setState({
            ...this.state,
            documentsModalVisible: false
        })
    }

    async getDocuments(e) {
        message.loading("Yükleniyor....",15);
        const res = await getDocuments(e.id);
        this.setState({
            ...this.state,
            documents: res,
            documentsModalVisible: true,
        });
        message.destroy();
    }

    closeDocumentModal() {
        this.setState({
            ...this.state,
            modalIsVisible: false
        })
    }

    async sendDocumentReq(e) {
        const resp = await sendDocReq(e);
        console.log(resp);
        this.setState({
            ...this.state,
            modalIsVisible: false
        })
    }

    documentReq(e) {
        this.setState({
            ...this.state,
            modalIsVisible: true,
            selectedContact: e
        });
    }

    onClose() {
        this.setState({
            ...this.state,
            isVisible: false
        })
    }

    onAddContact(e) {
        this.props.addContact(e);
        this.setState({
            ...this.state,
            isSubmit: true,
            isVisible: false
        });
        Notification("success", "Öğrenci ekleniyor");
    }

    async addContact() {
        message.loading("Yükleniyor....",15);
        let resp = await getProducts();
        let periots = await getPeriots();
        this.setState({
            isVisible: true,
            products: resp,
            periots: periots
        });
        message.destroy();
    }

    componentDidMount() {
        this.props.getUsers(getCourseId());
    }

    render() {
        const {
            seectedId,
            changeContact,
            addContact,
            users,
            usersLoading,
            deleteContact,
        } = this.props;
        if (usersLoading) {
            return (<Spin tip="Yükleniyor" />);
        }
        const selectedContact = seectedId
            ? users.filter(user => user.id === seectedId)[0]
            : null;
        if (selectedContact === null) {
            return <Spin tip="Sayfa İşleniyor" />;
        }
        return (
            <ContactsWrapper
                className="isomorphicContacts"
                style={{background: 'none'}}
            >
                <div className="isoContactListBar">
                    <ContactList
                        contacts={users}
                        seectedId={seectedId}
                        changeContact={changeContact}
                        deleteContact={deleteContact}
                    />
                </div>
                <Layout className="isoContactBoxWrapper">
                    {selectedContact ? (
                        <Content className="isoContactBox">
                            <div className="isoContactControl">

                                <DeleteButton
                                    deleteContact={deleteContact}
                                    contact={selectedContact}
                                />
                                <Button
                                    type="primary"
                                    onClick={this.addContact}
                                    className="isoAddContactBtn"
                                >
                                    Öğrenci Ekle
                                </Button>
                            </div>
                            <Scrollbar className="contactBoxScrollbar">
                                <SingleContactView
                                    getDocuments={this.getDocuments}
                                    sendNot={this.sendNot}
                                    documentReq={this.documentReq}
                                    contact={selectedContact}
                                    otherAttributes={otherAttributes}
                                />
                            </Scrollbar>
                        </Content>
                    ) : (
                        <div className="isoContactControl">
                            <Button
                                type="primary"
                                onClick={addContact}
                                className="isoAddContactBtn"
                            >
                                Öğrenci Ekle
                            </Button>
                        </div>
                    )}
                    <DrawerFrom
                        visible={this.state.isVisible}
                        products={this.state.products}
                        onAddContact={this.onAddContact}
                        onClose={this.onClose}/>

                    <DocumentReq
                        contact={this.state.selectedContact}
                        isVisible={this.state.modalIsVisible}
                        sendDocumentReq={this.sendDocumentReq}
                        closeDocumentModal={this.closeDocumentModal}
                    />
                    <Documents
                        docs={this.state.documents}
                        docOk={this.docOk}
                        docCancel={this.docCancel}
                        visible={this.state.documentsModalVisible}/>
                    <SendContact
                        onOk={this.onOk}
                        contact={selectedContact}
                        onCancel={this.onCancel}
                        visible={this.state.sendNotVisible}
                    />
                </Layout>
            </ContactsWrapper>
        );
    }
}

function mapStateToProps(state) {
    const {contacts, seectedId, editView, users, usersLoading, addStudentLoading} = state.Contacts;
    return {
        contacts,
        usersLoading,
        users,
        seectedId,
        editView,
        addStudentLoading
    };
}

export default connect(
    mapStateToProps,
    {
        changeContact,
        addContact,
        deleteContact,
        getUsers
    }
)(Contacts);
