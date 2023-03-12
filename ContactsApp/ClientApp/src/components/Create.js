import React, { Component } from "react";
import DataService from "../service/contact-service";
import { Navigate } from "react-router-dom";
import Select from 'react-select';
import ContactDataService from "../service/contact-service";

export class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeSctemp = this.onChangeSctemp.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.saveContact = this.saveContact.bind(this);

        this.state = {
            id: null,
            firstName: "",
            lastName: "", 
            email: "",
            phone: "",
            dateOfBirth: "",
            password: "",
            fkCategory: null,
            fkSubcategory: null,
            category: {
                id: null,
                name: ""
            },
            sctemp: "",
            subcategory: {
                id: null,
                name: ""
            },
            redirect: "/",

            submitted: false
        };
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeDob(e) {
        this.setState({
            dateOfBirth: e.target.value
        });
    }

    onChangeSctemp(e) {
        this.setState({
            sctemp:e.target.value
        });
    }

    componentDidMount() {
        this.getCategories();
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
        //zapisanie kontaktu
        DataService.create(data)
        .then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                phone: response.data.phone,
                dateOfBirth: response.data.dateOfBirth,
                password: response.data.password,
                fkCategory: response.data.fkCategory,
                fkSubcategory:response.data.fkSubcategory,

                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    saveContact() {
        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            dateOfBirth: this.state.dateOfBirth,
            fkCategory: this.state.fkCategory,
            fkSubcategory:this.state.fkSubcategory
        };
        //prosta walidacja niektórych pól
        if (!DataService.validateInput(data)) return

        if(!this.state.fkSubcategory && this.state.sctemp) {
            //zapisanie podkategorii jeśli została wpisana
            let scdata = {name: this.state.sctemp};
            ContactDataService.createSc(scdata)
            .then(response => {
                console.log(response.data.id);
                data["fkSubcategory"]=response.data.id;
                console.log(data);
                this.save(data);
            })
            .catch(e => {
                console.log(e);
            });
        }
        else {
            this.save(data);
        }

    }

    handleChange(selectedOption) {
        this.setState({
            fkCategory: selectedOption.value,
            category: {
                id: selectedOption.value,
                name: selectedOption.label
            },
            sctemp:""}
        );
        this.setState({
            fkSubcategory: null,
            subcategory: {
                id: null,
                name: null
            },
            sctemp:""}
        );
    }

    handleChange2(selectedOption) {
        this.setState({
            fkSubcategory: selectedOption.value,
            subcategory: {
                id: selectedOption.value,
                name: selectedOption.label
            },
            sctemp:""
            }
        );
    }

    render() {
        //konfiguracja listy wyboru dla kategorii i podkategorii
        let selected = {value: this.state.category?.id, label: this.state.category?.name}
        let options = this.state.categories?.map(function (category) {
            return { value: category.id, label: category.name };
        })
        let selected2 = {value: this.state.subcategory?.id, label: this.state.subcategory?.name}
        let options2 = this.state?.categories?.find(x => x.id == this.state?.category?.id)?.subcategories.map(function (sc) {
            return { value: sc.id, label: sc.name };
        })
        options?.push({ value: null, label: "Inny" })
        options2?.unshift({ value: null, label: "brak" })

        return (
        <div className="submit-form">
            {this.state.submitted ? (
                <Navigate to={this.state.redirect} />
            ) : (
            <div>
                <div className="form-group">
                <label htmlFor="firstName">Imię</label>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    required
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    name="firstName"
                />
                </div>

                <div className="form-group">
                <label htmlFor="lastName">Nazwisko</label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    required
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    name="lastName"
                />
                </div>

                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    name="email"
                />
                </div>

                <div className="form-group">
                <label htmlFor="password">Hasło</label>
                <input
                    type="text"
                    className="form-control"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="password"
                />
                </div>

                <label htmlFor="category">Kategoria</label>
                    <Select 
                    options={options}
                    //value= {selected}
                    onChange={this.handleChange}
                />
                <label htmlFor="category">Podkategoria</label>
                {selected.value ? (
                <Select 
                options={options2}
                value= {selected2}
                onChange={this.handleChange2}
                />) :
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
                <label htmlFor="phone">Nr Telefonu</label>
                <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    required
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    name="phone"
                />
                </div>

                <div className="form-group">
                <label htmlFor="dateOfBirth">Data Urodzenia</label>
                <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    required
                    value={this.state.dateOfBirth}
                    onChange={this.onChangeDob}
                    name="dateOfBirth"
                />
                </div>

                <button onClick={this.saveContact} className="btn btn-success">
                Zapisz
                </button>
            </div>
            )}
        </div>
        );
    }
}
