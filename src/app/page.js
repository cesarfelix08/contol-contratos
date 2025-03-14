"use client";
import { useState } from "react";
import { guardarContrato } from "./contratosFetch";
export default function Home() {
  const [listaContratos, setListaContratos] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target)

    const nuevoContrato = {
      cliente: event.target.cliente.value,
      fechaInicio: event.target.fechaInicio.value,
      fechaFin: event.target.fechaFin.value,
      estado: event.target.estado.value,
      importeInicial: parseFloat(event.target.importe.value),
      ampliaciones: [],
      totalImporte: parseFloat(event.target.importe.value),
    };
    console.log(nuevoContrato)
    const respnse = await guardarContrato(nuevoContrato);
    console.log(respnse)
    // Usamos una función en setListaContratos para evitar mutaciones directas
    setListaContratos((prevLista) => [...prevLista, nuevoContrato]);

    event.target.reset(); // Limpiar el formulario
  };

  const agregarAmpliacion = (index) => {
    const importeAmpliacion = parseFloat(prompt("Ingrese el importe de la ampliación:"));

    if (isNaN(importeAmpliacion) || importeAmpliacion <= 0) {
      alert("Por favor, ingrese un importe válido.");
      return;
    }

    setListaContratos((prevLista) =>
      prevLista.map((contrato, i) =>
        i === index
          ? {
              ...contrato,
              ampliaciones: [...contrato.ampliaciones, importeAmpliacion],
              totalImporte: contrato.totalImporte + importeAmpliacion,
            }
          : contrato
      )
    );
  };

  const eliminarContrato = (index) => {
    setListaContratos((prevLista) => prevLista.filter((_, i) => i !== index));
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      <header>
        <div className="container">
          <h1><i className="fas fa-file-signature"></i> Control de Contratos de Servicios</h1>
        </div>
      </header>

      <div className="container">
        <section className="formulario">
          <div className="form-container">
            <h2><i className="fas fa-plus-circle"></i> Agregar Nuevo Contrato</h2>
            <form id="formContrato" onSubmit={onSubmit}>
              <div className="input-group">
                <label htmlFor="cliente">Cliente:</label>
                <input type="text" id="cliente" name="cliente" placeholder="Nombre del cliente" required />
              </div>
              <div className="input-group">
                <label htmlFor="fechaInicio">Fecha de Inicio:</label>
                <input type="date" id="fechaInicio" name="fechaInicio" required />
              </div>
              <div className="input-group">
                <label htmlFor="fechaFin">Fecha de Fin:</label>
                <input type="date" id="fechaFin" name="fechaFin" required />
              </div>
              <div className="input-group">
                <label htmlFor="estado">Estado:</label>
                <select id="estado" name="estado" required>
                  <option value="1">Activo</option>
                  <option value="0">Finalizado</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="importe">Importe Inicial:</label>
                <input type="number" id="importe" name="importe" placeholder="Importe inicial" required />
              </div>
              <button type="submit" className="btn-submit">Guardar Contrato</button>
            </form>
          </div>
        </section>

        <section className="contratos">
          <h2><i className="fas fa-list"></i> Lista de Contratos</h2>
          <ul id="listaContratos">
            {listaContratos.map((contrato, index) => (
              <li key={index} className="contrato-item">
                <strong>Cliente:</strong> {contrato.cliente} <br />
                <div className="fecha"><strong>Inicio:</strong> {contrato.fechaInicio} - <strong>Fin:</strong> {contrato.fechaFin}</div>
                <div className={`estado ${contrato.estado.toLowerCase()}`}><strong>Estado:</strong> {contrato.estado}</div>
                <div className="importeInicial"><strong>Importe Inicial:</strong> ${contrato.importeInicial.toFixed(2)}</div>
                <div className="totalImporte"><strong>Total Importe:</strong> ${contrato.totalImporte.toFixed(2)}</div>
                <button className="btn-ampliar" onClick={() => agregarAmpliacion(index)}>Agregar Ampliación</button>
                <button className="btn-eliminar" onClick={() => eliminarContrato(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
