import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
class AddEditForm extends React.Component {
  state = {
    id: 0,
    cafe: '',
    cpf: '',
    nome: '',
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('https://mv-teste.herokuapp.com/employee/cafe', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cafe: this.state.cafe,
        cpf: this.state.cpf,
        nome: this.state.nome,
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
      window.location.reload()
  }

  submitFormEdit = e => {
    e.preventDefault()
    console.log(this.state.id)
    
    
    axios.put('https://mv-teste.herokuapp.com/employee/'+this.state.id, this.state);
    fetch('https://mv-teste.herokuapp.com/employee/', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        cafe: this.state.cafe,
        cpf: this.state.cpf,
        nome: this.state.nome,
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
      window.location.reload()
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, cafe, cpf, nome } = this.props.item
      this.setState({ id, cafe, cpf, nome  })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first">Cafe</Label>
          <Input type="text" name="cafe" id="cafe" onChange={this.onChange} value={this.state.cafe === null ? '' : this.state.cafe} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Nome</Label>
          <Input type="text" name="nome" id="nome" onChange={this.onChange} value={this.state.nome === null ? '' : this.state.nome}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Cpf</Label>
          <Input type="text" name="cpf" id="cpf" onChange={this.onChange} value={this.state.cpf === null ? '' : this.state.cpf}  />
        </FormGroup>
        <Button>Salvar</Button>
      </Form>
    );
  }
}

export default AddEditForm