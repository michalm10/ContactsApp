import React, { Component } from "react";
import ContactDataService from "../service/contact-service";
import withRouter from '../with-router';
import Moment from 'moment';
import Select from 'react-select';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeSctemp = this.onChangeSctemp.bind(this);
        this.getContact = this.getContact.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);

        this.state = {
        currentContact: {
            id: null,
            firstName: "",
            lastName: "", 
            email: "",
            phone: "",
            dateOfBirth: "",
            password: "",
            fkCategory: "",
            category: {
                id: null,
                name: ""
            },
            fkSubcategory: null,
            subcategory: {
                id: null,
                name: ""
            },
            categories: [],
        },
        message: "",
        sctemp: "",//tymczasowa podkategoria gdy wybrana jest inna podkategoria
        subcategory: {
            id: null,
            name: ""
        },
        };
    }

    componentDidMount() {
        this.getContact(this.props.router.params.id);
        this.getCategories();
        //pobranie kontaktu i kategorii
    }

    onChangeFirstName(e) {
        const firstName = e.target.value;

        this.setState(function(prevState) {
        return {
            currentContact: {
            ...prevState.currentContact,
            firstName: firstName
            }
        };
        });
    }

    onChangeLastName(e) {
        const lastName = e.target.value;
        
        this.setState(prevState => ({
        currentContact: {
            ...prevState.currentContact,
            lastName: lastName
        }
        }));
    }

    onChangeEmail(e) {
        const email= e.target.value;
        
        this.setState(prevState => ({
        currentContact: {
            ...prevState.currentContact,
            email: email
        }
        }));
    }

    onChangePhone(e) {
        const phone = e.target.value;
        
        this.setState(prevState => ({
        currentContact: {
            ...prevState.currentContact,
            phone: phone
        }
        }));
    }

    onChangePassword(e) {
        const password = e.target.value;
        
        this.setState(prevState => ({
        currentContact: {
            ...prevState.currentContact,
            password: password
        }
        }));
    }

    onChangeDob(e) {
        const dateOfBirth = e.target.value;
        
        this.setState(prevState => ({
        currentContact: {
            ...prevState.currentContact,
            dateOfBirth: dateOfBirth
        }
        }));
    }

    onChangeSctemp(e) {
        const sctemp = e.target.value;
        
        this.setState(prevState => ({
            ...prevState,
            sctemp: sctemp
        }));
    }

    getContact(id) {
        ContactDataService.get(id)
        .then(response => {
            this.setState({
            currentContact: response.data,
            sctemp:response.data.subcategory?.name,
            subcategory:response.data.subcategory
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    getCategories() {
        ContactDataService.getAllCategories()
        .then(response => {
            this.setState({
            categories: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    save(data) {
        ContactDataService.update(
            this.state.currentContact.id,
            data
            )
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/');
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateContact() {
        let data = {};

        Object.keys(this.state.currentContact).map((key) => {
        if(key != "subcategory" && key != "category") {
            data[key] = this.state.currentContact[key];
        }
        });
        //usunięcie podkategorii i kategorii z JSONA

        if(!this.state.fkCategory && this.state.sctemp) {
            if (this.state.sctemp != this.state.subcategory?.name) {
                //dodanie nowej podkategorii do bazy danych i ustawienie klucza obcego na nią
                let scdata = {name: this.state.sctemp};
                ContactDataService.createSc(scdata)
                .then(response => {
                    console.log(response.data.id);
                    data["fkSubcategory"]=response.data.id;
                    this.save(data);
                })
                .catch(e => {
                    console.log(e);
                });
            }
            else {
                data["fkSubcategory"]=this.state.subcategory.id;
                this.save(data);
            }

        }
        else {
            this.save(data);
        }
    }

    handleChange(selectedOption) {
        this.setState(
            prevState => ({
            currentContact: {
                ...prevState.currentContact,
                fkCategory: selectedOption.value,
                category: {
                    id: selectedOption.value,
                    name: selectedOption.label
                }
            },
            sctemp:""})
        );
        this.setState(
            prevState => ({
            currentContact: {
                ...prevState.currentContact,
                fkSubcategory: null,
                subcategory: {
                    id: null,
                    name: null
                }
            },
            sctemp:""})
        );
    }

    handleChange2(selectedOption) {
        this.setState(
            prevState => ({
            currentContact: {
                ...prevState.currentContact,
                fkSubcategory: selectedOption.value,
                subcategory: {
                    id: selectedOption.value,
                    name: selectedOption.label
                }
            },
            sctemp:""})
        );
    }

    render() {
        const { currentContact } = this.state;
        //konfiguracja listy wyboru dla kategorii i podkategorii
        let selected = {value: currentContact.category?.id, label: currentContact.category?.name}
        let options = this.state.categories?.map(function (category) {
            return { value: category.id, label: category.name };
          })
        let selected2 = {value: currentContact.subcategory?.id, label: currentContact.subcategory?.name}
        let options2 = this.state?.categories?.find(x => x.id == currentContact?.category?.id)?.subcategories.map(function (sc) {
            return { value: sc.id, label: sc.name };
        })
        options?.push({ value: null, label: "Inny" })
        options2?.unshift({ value: null, label: "brak" })

        
    
        return (
            <div>
                {currentContact ? (
                <div className="edit-form">
                    <h4>Contact</h4>
                    <form>
                    <div className="form-group">
                        <label htmlFor="firstName">Imię</label>
                        <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={currentContact.firstName}
                        onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Nazwisko</label>
                        <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={currentContact.lastName}
                        onChange={this.onChangeLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={currentContact.email}
                        onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <input
                        type="text"
                        className="form-control"
                        id="password"
                        value={currentContact.password}
                        onChange={this.onChangePassword}
                        />
                    </div>
                    <label htmlFor="category">Kategoria</label>
                    <Select 
                    options={options}
                    value= {selected}
                    onChange={this.handleChange}
                    />
                    <label htmlFor="category">Podkategoria</label>
                    {selected.value ? (
                    <Select 
                    options={options2}
                    value= {selected2}
                    onChange={this.handleChange2}
                    />) ://jeśli wybrana kategoria Inny to pojawia się input tekstowy
                    (<div className="form-group">
                        <input
                        type="text"
                        className="form-control"
                        id="subcategory"
                        value={this.state.sctemp}
                        onChange={this.onChangeSctemp}
                        />
                    </div>)}
                    <div className="form-group">
                        <label htmlFor="phone">Telefon</label>
                        <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={currentContact.phone}
                        onChange={this.onChangePhone}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Data Urodzenia</label>
                        <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        value={Moment(currentContact.dateOfBirth).format('yyyy-MM-D')}
                        onChange={this.onChangeDob}
                        />
                    </div>
                    </form>
        
                    <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.updateContact}
                    >
                    Zapisz
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

export default withRouter(Edit);
