import React, { useState } from 'react';

export default function ConfigurarRutas() {
  const [rutas, setRutas] = useState([
    { id: 1, nombre: 'Ruta Norte', horario: '08:00 AM', vehiculo: 'Camión 001', estado: 'Activa' },
    { id: 2, nombre: 'Ruta Sur', horario: '10:00 AM', vehiculo: 'Camión 002', estado: 'Activa' },
    { id: 3, nombre: 'Ruta Centro', horario: '02:00 PM', vehiculo: 'Camión 003', estado: 'Inactiva' },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaRuta, setNuevaRuta] = useState({
    nombre: '',
    horario: '',
    vehiculo: ''
  });

  const handleCrearRuta = () => {
    if (nuevaRuta.nombre && nuevaRuta.horario && nuevaRuta.vehiculo) {
      setRutas([...rutas, {
        id: rutas.length + 1,
        nombre: nuevaRuta.nombre,
        horario: nuevaRuta.horario,
        vehiculo: nuevaRuta.vehiculo,
        estado: 'Activa'
      }]);
      setNuevaRuta({ nombre: '', horario: '', vehiculo: '' });
      setMostrarFormulario(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Configurar Rutas de Recolección</h1>
          </div>
          <button 
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
          >
            + Nueva Ruta
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Descripción */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="text-gray-700 text-lg mb-6">
            Optimiza y gestiona las rutas de recolección para máxima eficiencia
          </p>

          {/* Características */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { titulo: 'Crear nuevas rutas', icono: 'M12 4v16m8-8H4' },
              { titulo: 'Optimización automática', icono: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { titulo: 'Horarios personalizados', icono: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { titulo: 'Seguimiento en tiempo real', icono: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icono} />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{item.titulo}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario Nueva Ruta */}
        {mostrarFormulario && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Crear Nueva Ruta</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nombre de la ruta"
                value={nuevaRuta.nombre}
                onChange={(e) => setNuevaRuta({...nuevaRuta, nombre: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={nuevaRuta.horario}
                onChange={(e) => setNuevaRuta({...nuevaRuta, horario: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Vehículo asignado"
                value={nuevaRuta.vehiculo}
                onChange={(e) => setNuevaRuta({...nuevaRuta, vehiculo: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCrearRuta}
                className="md:col-span-3 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                Crear Ruta
              </button>
            </div>
          </div>
        )}

        {/* Lista de Rutas */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Rutas Configuradas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rutas.map((ruta) => (
                  <tr key={ruta.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{ruta.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{ruta.horario}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{ruta.vehiculo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ruta.estado === 'Activa' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ruta.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">Editar</button>
                      <button className="text-red-600 hover:text-red-800 font-medium">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}