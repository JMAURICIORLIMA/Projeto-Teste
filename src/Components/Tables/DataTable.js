import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Deseja Deletar?')
    if(confirmDelete){
      console.log(id)
      axios.delete('https://mv-teste.herokuapp.com/employee/' + id);
      fetch('https://mv-teste.herokuapp.com/employee', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.cafe}</td>
          <td>{item.nome}</td>
          <td>{item.cpf}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>CAFÉ</th>
            <th>NOME</th>
            <th>CPF</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable