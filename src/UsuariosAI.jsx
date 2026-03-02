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
  { id: 1, nombre: "Ana García",    email: "ana.garcia@banco.com",   rol: "Administrador" },
  { id: 2, nombre: "Luis Martínez", email: "luis.mtz@banco.com",     rol: "Cajero"        },
  { id: 3, nombre: "Sofía López",   email: "sofia.lopez@banco.com",  rol: "Gerente"       },
  { id: 4, nombre: "Carlos Ruiz",   email: "carlos.ruiz@banco.com",  rol: "Cajero"        },
  { id: 5, nombre: "María Torres",  email: "maria.torres@banco.com", rol: "Auditor"       },
];

/* ─── Inline styles ────────────────────────────────────────────────────── */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f2027 100%)",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    padding: "2rem 0",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    padding: "2rem",
    boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
  },
  heading: {
    color: "#f1f5f9",
    fontWeight: 700,
    fontSize: "1.75rem",
    letterSpacing: "-0.5px",
    marginBottom: 0,
  },
  subtitle: {
    color: "#64748b",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  },
  badge: (rol) => {
    const map = {
      Administrador: { bg: "#1d4ed8", color: "#bfdbfe" },
      Cajero:        { bg: "#065f46", color: "#a7f3d0" },
      Gerente:       { bg: "#7c3aed", color: "#ddd6fe" },
      Auditor:       { bg: "#92400e", color: "#fde68a" },
    };
    const c = map[rol] || { bg: "#334155", color: "#cbd5e1" };
    return {
      background: c.bg,
      color: c.color,
      padding: "3px 10px",
      borderRadius: "999px",
      fontSize: "0.75rem",
      fontWeight: 600,
      whiteSpace: "nowrap",
    };
  },
  th: {
    color: "#94a3b8",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "0.75rem 1rem",
    background: "transparent",
  },
  td: {
    color: "#e2e8f0",
    fontSize: "0.9rem",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    padding: "0.85rem 1rem",
    verticalAlign: "middle",
    background: "transparent",
  },
  trHover: {
    transition: "background 0.15s",
  },
  inputStyle: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#f1f5f9",
    padding: "0.5rem 0.75rem",
    width: "100%",
    outline: "none",
    fontSize: "0.9rem",
  },
  labelStyle: {
    color: "#94a3b8",
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.35rem",
    display: "block",
  },
  modalCard: {
    background: "#0f172a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px",
    color: "#f1f5f9",
  },
};

/* ─── Component ────────────────────────────────────────────────────────── */
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
    hoveredRow: null,
  };

  /* Modal handlers */
  mostrarModalActualizar = (dato) => {
    this.setState({ form: dato, modalActualizar: true });
  };
  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };
  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
      form: { id: "", nombre: "", email: "", rol: "" },
    });
  };
  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  /* CRUD operations */
  insertar = () => {
    const { nombre, email, rol } = this.state.form;
    if (!nombre.trim() || !email.trim() || !rol.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }
    const valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    const lista = [...this.state.data, valorNuevo];
    this.setState({ modalInsertar: false, data: lista });
  };

  editar = (dato) => {
    const arreglo = this.state.data.map((registro) =>
      dato.id === registro.id
        ? { ...registro, nombre: dato.nombre, email: dato.email, rol: dato.rol }
        : registro
    );
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(
      `¿Estás seguro de que deseas eliminar al usuario "${dato.nombre}"?`
    );
    if (opcion) {
      const arreglo = this.state.data.filter((r) => r.id !== dato.id);
      this.setState({ data: arreglo });
    }
  };

  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  };

  /* ── Render ── */
  render() {
    return (
      <div style={styles.page}>
        <Container>
          {/* Header */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 style={styles.heading}>👥 Gestión de Usuarios</h1>
            <p style={styles.subtitle}>
              Administra los usuarios del sistema bancario
            </p>
          </div>

          <div style={styles.card}>
            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                {this.state.data.length} usuario(s) registrado(s)
              </span>
              <button
                onClick={this.mostrarModalInsertar}
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.5rem 1.25rem",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
                  transition: "transform 0.1s",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.97)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                + Nuevo Usuario
              </button>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["ID", "Nombre", "Email", "Rol", "Acciones"].map((h) => (
                      <th key={h} style={styles.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((dato) => (
                    <tr
                      key={dato.id}
                      style={{
                        ...styles.trHover,
                        background:
                          this.state.hoveredRow === dato.id
                            ? "rgba(255,255,255,0.04)"
                            : "transparent",
                      }}
                      onMouseEnter={() =>
                        this.setState({ hoveredRow: dato.id })
                      }
                      onMouseLeave={() => this.setState({ hoveredRow: null })}
                    >
                      <td style={{ ...styles.td, color: "#475569", fontWeight: 600 }}>
                        #{dato.id}
                      </td>
                      <td style={styles.td}>{dato.nombre}</td>
                      <td style={{ ...styles.td, color: "#93c5fd" }}>
                        {dato.email}
                      </td>
                      <td style={styles.td}>
                        <span style={styles.badge(dato.rol)}>{dato.rol}</span>
                      </td>
                      <td style={styles.td}>
                        <button
                          onClick={() => this.mostrarModalActualizar(dato)}
                          style={{
                            background: "rgba(99,102,241,0.15)",
                            border: "1px solid rgba(99,102,241,0.3)",
                            color: "#a5b4fc",
                            borderRadius: "6px",
                            padding: "4px 12px",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            marginRight: "0.5rem",
                            fontWeight: 600,
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => this.eliminar(dato)}
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.25)",
                            color: "#fca5a5",
                            borderRadius: "6px",
                            padding: "4px 12px",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>

        {/* ── Modal Insertar ── */}
        <Modal isOpen={this.state.modalInsertar} toggle={this.cerrarModalInsertar}>
          <div style={styles.modalCard}>
            <ModalHeader
              toggle={this.cerrarModalInsertar}
              style={{ borderBottom: "1px solid #1e293b", color: "#f1f5f9" }}
            >
              Nuevo Usuario
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label style={styles.labelStyle}>ID</label>
                <input
                  style={{ ...styles.inputStyle, opacity: 0.5 }}
                  readOnly
                  type="text"
                  value={this.state.data.length + 1}
                />
              </FormGroup>
              <FormGroup>
                <label style={styles.labelStyle}>Nombre completo</label>
                <input
                  style={styles.inputStyle}
                  name="nombre"
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label style={styles.labelStyle}>Email</label>
                <input
                  style={styles.inputStyle}
                  name="email"
                  type="email"
                  placeholder="usuario@banco.com"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label style={styles.labelStyle}>Rol</label>
                <select
                  style={styles.inputStyle}
                  name="rol"
                  onChange={this.handleChange}
                >
                  <option value="">Selecciona un rol...</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Cajero">Cajero</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Auditor">Auditor</option>
                </select>
              </FormGroup>
            </ModalBody>
            <ModalFooter style={{ borderTop: "1px solid #1e293b" }}>
              <Button
                color="primary"
                onClick={this.insertar}
                style={{ borderRadius: "8px", fontWeight: 600 }}
              >
                Insertar
              </Button>
              <Button
                color="secondary"
                onClick={this.cerrarModalInsertar}
                style={{ borderRadius: "8px" }}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* ── Modal Editar ── */}
        <Modal isOpen={this.state.modalActualizar} toggle={this.cerrarModalActualizar}>
          <div style={styles.modalCard}>
            <ModalHeader
              toggle={this.cerrarModalActualizar}
              style={{ borderBottom: "1px solid #1e293b", color: "#f1f5f9" }}
            >
              Editar Usuario
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label style={styles.labelStyle}>ID</label>
                <input
                  style={{ ...styles.inputStyle, opacity: 0.5 }}
                  readOnly
                  type="text"
                  value={this.state.form.id}
                />
              </FormGroup>
              <FormGroup>
                <label style={styles.labelStyle}>Nombre completo</label>
                <input
                  style={styles.inputStyle}
                  name="nombre"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.nombre}
                />
              </FormGroup>
              <FormGroup>
                <label style={styles.labelStyle}>Email</label>
                <input
                  style={styles.inputStyle}
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.form.email}
                />
              </FormGroup>
              <FormGroup>
                <label style={styles.labelStyle}>Rol</label>
                <select
                  style={styles.inputStyle}
                  name="rol"
                  onChange={this.handleChange}
                  value={this.state.form.rol}
                >
                  <option value="">Selecciona un rol...</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Cajero">Cajero</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Auditor">Auditor</option>
                </select>
              </FormGroup>
            </ModalBody>
            <ModalFooter style={{ borderTop: "1px solid #1e293b" }}>
              <Button
                color="primary"
                onClick={() => this.editar(this.state.form)}
                style={{ borderRadius: "8px", fontWeight: 600 }}
              >
                Guardar Cambios
              </Button>
              <Button
                color="secondary"
                onClick={this.cerrarModalActualizar}
                style={{ borderRadius: "8px" }}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Usuarios;