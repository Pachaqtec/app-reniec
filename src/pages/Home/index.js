import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Spinner, Modal, Button } from 'react-bootstrap'

import { URL_BASE } from 'const'

// ComponentDidMount
// ComponentDidUpdate
// ComponentWillUnmount

const Home = () => {
  const [persons, setPersons] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setShowModal] = useState(false)
  const [personSelected, setPersonSelected] = useState({})
  const [callService, setCallService] = useState(null)

  useEffect(() => {
    getPersons()
    // window.location.reload()
  }, [callService, openModal])

  const getPersons = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${URL_BASE}/personas`)
      setPersons(response.data)
      console.log('response', response)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }
  const showModal = (person) => {
    setPersonSelected(person)
    setShowModal(true)
  }

  const hideModal = () => {
    setPersonSelected({})
    setShowModal(false)
  }

  const doPayment = async () => {
    const object = {
      ...personSelected,
      deuda: 0,
      deudorElectoral: false
    }

    try {
      await axios.put(`${URL_BASE}/personas/${personSelected.id}`, object)
      hideModal()
      setCallService(Math.random())
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Correo</th>
            <th>Tipo Sangre</th>
            <th>Nacimiento</th>
            <th>Casado(a)</th>
          </tr>
        </thead>
        <tbody>
          {loading && 
            <tr>
              <td colSpan="8" align="center">
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
          }
          {
            !loading && persons.map((person, index) => (
              <tr key={index} style={{ cursor: 'pointer' }} onClick={() => showModal(person)}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.lastname}</td>
                <td>{person.dni}</td>
                <td>{person.email}</td>
                <td>{person.tipoSangre}</td>
                <td>{person.nacimiento}</td>
                <td>{person.casado ? 'Sí' : 'No'}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <Modal show={openModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Validar deuda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h1>
              {
                personSelected.deudorElectoral
                ? `Debe S./${personSelected.deuda}`
                : 'Limpio'
              }
            </h1>
            {
              personSelected.deudorElectoral &&
                <Button variant="danger" onClick={doPayment}>
                  Pagar
                </Button>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Home
