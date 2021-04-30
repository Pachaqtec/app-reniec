import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useLocation, useHistory } from 'react-router-dom'

import axios from 'axios'

import { URL_BASE } from 'const'

const AgregarPersona = () => {
  const [newPerson, setNewPerson] = useState({
    name: '',
    lastname: '',
    age: '',
    email: '',
    dni: '',
    nacionalidad: '',
    nacimiento: '',
    casado: false,
    donador: true,
    tipoSangre: ''
  })
  const [loadingCreate, setLoadingCreate] = useState(false)
  const location = useLocation()
  const history = useHistory()

  const onChange = (e) => {
    const { value, name } = e.target
    console.log(name, typeof value)
    setNewPerson({
      ...newPerson,
      [name]: name === 'casado' || name === 'casado' ? !(value) : value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let isValid = true
    if (newPerson.name === '') {
      isValid = false
    }

    if (!isValid) return

    createPerson()
  }

  const createPerson = async () => {
    setLoadingCreate(true)
    try {
      const response = await axios.post(`${URL_BASE}/personas`, newPerson)
      console.log('response', response.data)
      history.push('/home')
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoadingCreate(false)
    }
  }

  console.log('history', history)
  return (
    <div>
      <h1>AgregarPersona</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nombres :</Form.Label>
          <Form.Control
            isValid={newPerson.name.length > 2}
            isInvalid={newPerson.name.length === 0}
            name="name"
            onChange={onChange}
            type="text"
            value={newPerson.name}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Apellidos :</Form.Label>
          <Form.Control name="lastname" onChange={onChange} type="text" value={newPerson.lastname}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Correo :</Form.Label>
          <Form.Control name="email" onChange={onChange} type="email" value={newPerson.email}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>DNI :</Form.Label>
          <Form.Control name="dni" onChange={onChange} type="numeric" value={newPerson.dni}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Nacionalidad :</Form.Label>
          <Form.Control name="nacionalidad" onChange={onChange} type="text" value={newPerson.nacionalidad}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Edad :</Form.Label>
          <Form.Control name="age" onChange={onChange} type="numeric" value={newPerson.age}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Nacimiento :</Form.Label>
          <Form.Control name="nacimiento" onChange={onChange} type="date" value={newPerson.nacimiento}/>
        </Form.Group>

        {/* <Form.Group controlId="formBasicPassword">
          <Form.Label>Casado(a) :</Form.Label>
          <Form.Check onChange={onChange} name="casado" type="checkbox" label="Casado(a)" defaultValue={newPerson.casado} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Donador(a) :</Form.Label>
          <Form.Check onChange={onChange} name="donador" type="checkbox" label="Donador(a)" defaultValue={newPerson.donador} />
        </Form.Group> */}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Tipo sangre :</Form.Label>
          <Form.Control name="tipoSangre" onChange={onChange} type="text" value={newPerson.tipoSangre}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loadingCreate}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AgregarPersona
