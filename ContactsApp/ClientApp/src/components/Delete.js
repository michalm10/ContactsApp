import React, { Component } from "react";
import ContactDataService from "../service/contact-service";
import withRouter from '../with-router';
import Moment from 'moment';

class Delete extends Component {
    constructor(props) {
        super(props);
        this.getContact = this.getContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);

        this.state = {
        currentContact: {
            id: null,
            firstName: "",
            lastName: "", 
            email: "",
            phone: "",
            category: {
                id: null,
                name: ""
            }
        },
        message: ""
        };
    }

    componentDidMount() {
        this.getContact(this.props.router.params.id);
    }

    getContact(id) {
        //pobieranie kontaktu
        ContactDataService.get(id)
        .then(response => {
            this.setState({
            currentContact: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteContact() {    
        //usuwanie kontaktu
        ContactDataService.delete(this.state.currentContact.id)
        .then(response => {
            console.log(response.data);
            this.props.router.navigate('/');
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { currentContact } = this.state;
    
        return (
            <div>
                {currentContact ? (
                <div className="edit-form">
                    <h4>Kontakt</h4>
                    <dl className="row">
                        <dt className = "col-sm-2">
                            Imię
                        </dt>
                        <dd className = "col-sm-10">
                            {currentContact.firstName}
                        </dd>
                        <dt className = "col-sm-2">
                            Nazwisko
                        </dt>
                        <dd className = "col-sm-10">
                            {currentContact.lastName}
                        </dd>
                        <dt className = "col-sm-2">
                            Email
                        </dt>
                        <dd className = "col-sm-10">
                            {currentContact.email}
                        </dd>
                        <dt className = "col-sm-2">
                            Hasło
                        </dt>
                        <dd className = "col-sm-10">
                            {currentContact.password}
                        </dd>
                        <dt className = "col-sm-2">
                            Kategoria
                        </dt>
                        <dd className = "col-sm-10">
                            {currentContact.category ? currentContact.category.name : "Inna"}
                        </dd>
                        <dt className = "col-sm-2">
                            Podkategoria
                        </dt>
                        <dd className = "col-sm-10">
                            {currentContact.subcategory ? currentContact.subcategory.name : "Brak"}
                        </dd>
                        <dt className = "col-sm-2">
                            Telefon
                        </dt>
                        <dd className = "col-sm-10">
                            {currentContact.phone}
                        </dd>
                        <dt className = "col-sm-2">
                            Data Urodzenia
                        </dt>
                        <dd className = "col-sm-10">
                            {Moment(currentContact.dateOfBirth).format('DD.MM.YYYY')}
                        </dd>
                    </dl>
        
                    <button
                    className="btn btn-danger"
                    onClick={this.deleteContact}
                    >
                    Usuń
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Kontakt nie istnieje</p>
                </div>
                )}
            </div>
        );
    }
}

export default withRouter(Delete);
