import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, nombre: "Jorge Carranza", email: "jorge.carranza@banco.com", rol: "Admin" },
  { id: 2, nombre: "Ramon Velez", email: "ramon.velez@banco.com", rol: "Cajero" },
  { id: 3, nombre: "Ana Gutierrez", email: "ana.gutierrez@banco.com", rol: "Gerente" },
  { id: 4, nombre: "Luis Mendoza", email: "luis.mendoza@banco.com", rol: "Cajero" },
  { id: 5, nombre: "Maria Lopez", email: "maria.lopez@banco.com", rol: "Auditor" },
];

class Usuarios extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      email: "",
      rol: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      form: { id: "", nombre: "", email: "", rol: "" },
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  insertar = () => {
    const valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    const lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  editar = (dato) => {
    let contador = 0;
    const arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].email = dato.email;
        arreglo[contador].rol = dato.rol;
      }
      contador++;
      return registro;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(
      "¿Estás seguro que deseas eliminar al usuario " + dato.nombre + "?"
    );
    if (opcion === true) {
      let contador = 0;
      const arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
        return registro;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <h2>Gestión de Usuarios</h2>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            + Crear Usuario
          </Button>
          <br />
          <br />
          <Table bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.email}</td>
                  <td>{dato.rol}</td>
                  <td>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => this.eliminar(dato)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Modal Insertar */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id: </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre: </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                placeholder="Nombre completo"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Email: </label>
              <input
                className="form-control"
                name="email"
                type="email"
                placeholder="correo@banco.com"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Rol: </label>
              <select
                className="form-control"
                name="rol"
                onChange={this.handleChange}
              >
                <option value="">-- Seleccionar Rol --</option>
                <option value="Admin">Admin</option>
                <option value="Gerente">Gerente</option>
                <option value="Cajero">Cajero</option>
                <option value="Auditor">Auditor</option>
              </select>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal Editar */}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id: </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre: </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>Email: </label>
              <input
                className="form-control"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.email}
              />
            </FormGroup>
            <FormGroup>
              <label>Rol: </label>
              <select
                className="form-control"
                name="rol"
                onChange={this.handleChange}
                value={this.state.form.rol}
              >
                <option value="">-- Seleccionar Rol --</option>
                <option value="Admin">Admin</option>
                <option value="Gerente">Gerente</option>
                <option value="Cajero">Cajero</option>
                <option value="Auditor">Auditor</option>
              </select>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Usuarios;