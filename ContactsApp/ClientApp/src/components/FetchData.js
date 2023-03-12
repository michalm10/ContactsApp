import React, { Component } from 'react';
import { generatePath, Link } from "react-router-dom";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { contacts: [], loading: true };
  }

  componentDidMount() {
    this.populateData();
  }

renderTable(contacts) {
    //renderowanie listy kontaktów
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Email</th>
            <th>Telefon</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact =>
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td><Link to={generatePath(`contact/:id`, { id: contact.id})}>Szczegóły</Link></td>
                <td><Link to={generatePath(`contact/edit/:id`, { id: contact.id})}>Edytuj</Link></td>
                <td><Link to={generatePath(`contact/delete/:id`, { id: contact.id})}>Usuń</Link></td>
              </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Kontakty</h1>
        {contents}
      </div>
    );
  }

  async populateData() {
    const response = await fetch('http://localhost:7033/api/contact');
    //pobieranie listy kontaktów
    const data = await response.json();
    this.setState({ contacts: data, loading: false });
  }
}
