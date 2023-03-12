import React, { Component } from "react";
import ContactDataService from "../service/contact-service";
import withRouter from '../with-router';
import Moment from 'moment';
import { Link, generatePath } from 'react-router-dom';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.getContact = this.getContact.bind(this);

        this.state = {
        currentContact: {
            id: null,
            firstName: "",
            lastName: "", 
            email: "",
            phone: "",
            dateOfBirth: "",
            password: "",
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
        //pobranie kontaktu po załadowaniu strony
    }

    getContact(id) {
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

    render() {
        const { currentContact } = this.state;
    
        return (
            <div>
                {currentContact ? (
                <div>
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
                    <Link to={generatePath(`/contact/edit/:id`, { id: currentContact.id ? currentContact.id : 0})}><button className="btn-primary">Edytuj</button></Link>
                    <Link to={generatePath(`/contact/delete/:id`, { id: currentContact.id ? currentContact.id : 0})}><button className="btn-primary">Usuń</button></Link>
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

export default withRouter(Detail);
