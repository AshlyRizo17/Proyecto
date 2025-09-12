import React, { useState } from "react";
import "../styles/crud.css"; // Revisar este archivo
const initialUsers = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@email.com",
    telefono: "123-456-7890",
    edad: 25,
  },
  {
    id: 2,
    nombre: "María García",
    email: "maria@email.com",
    telefono: "098-765-4321",
    edad: 30,
  },
  {
    id: 3,
    nombre: "Carlos López",
    email: "carlos@email.com",
    telefono: "555-123-456",
    edad: 22,
  },
];

export default function Crud() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    edad: "",
  });

  // Limpiar formulario
  const clearForm = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      edad: "",
    });
    setSelectedUser(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Crear nuevo usuario
  const handleCreate = () => {
    setIsCreating(true);
    clearForm();
  };

  // Leer/Seleccionar usuario
  const handleRead = (user) => {
    setSelectedUser(user);
    setFormData({
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      edad: user.edad.toString(),
    });
    setIsEditing(false);
    setIsCreating(false);
  };

  // Editar usuario
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      edad: user.edad.toString(),
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  // Guardar cambios (crear o actualizar)
  const handleSave = () => {
    if (!formData.nombre || !formData.email) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    const userData = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      edad: parseInt(formData.edad) || 0,
    };

    if (isCreating) {
      // Crear nuevo usuario
      const newUser = {
        ...userData,
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      };
      setUsers((prev) => [...prev, newUser]);
      alert("Usuario creado exitosamente");
    } else if (isEditing) {
      // Actualizar usuario existente
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? { ...user, ...userData } : user
        )
      );
      alert("Usuario actualizado exitosamente");
    }

    clearForm();
  };

  // Eliminar usuario
  const handleDelete = (userId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      if (selectedUser && selectedUser.id === userId) {
        clearForm();
      }
      alert("Usuario eliminado exitosamente");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="crud-container p-6 mb-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <User className="text-blue-600" />
            Gestión de Usuarios
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lista de usuarios */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">
                  Lista de Usuarios
                </h2>
                <button
                  onClick={handleCreate}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Nuevo Usuario
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 border rounded-lg cursor-pointer transition ${
                      selectedUser && selectedUser.id === user.id
                        ? "border-blue-500 bg-blue-50"
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => handleRead(user)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {user.nombre}
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.telefono}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(user);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(user.id);
                          }}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">
                  {isCreating
                    ? "Crear Usuario"
                    : isEditing
                    ? "Editar Usuario"
                    : "Detalles"}
                </h2>
                {(isEditing || isCreating) && (
                  <button
                    onClick={clearForm}
                    className="text-gray-500 hover:text-gray-700 p-1"
                    title="Cancelar"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <div className="form-container p-4 rounded-lg space-y-4 bg-gray-50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isCreating}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing || isCreating
                        ? "bg-white border-gray-300"
                        : "bg-gray-100 border-gray-200 cursor-not-allowed"
                    }`}
                    placeholder="Ingresa el nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isCreating}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing || isCreating
                        ? "bg-white border-gray-300"
                        : "bg-gray-100 border-gray-200 cursor-not-allowed"
                    }`}
                    placeholder="Ingresa el email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isCreating}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing || isCreating
                        ? "bg-white border-gray-300"
                        : "bg-gray-100 border-gray-200 cursor-not-allowed"
                    }`}
                    placeholder="Ingresa el teléfono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isCreating}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing || isCreating
                        ? "bg-white border-gray-300"
                        : "bg-gray-100 border-gray-200 cursor-not-allowed"
                    }`}
                    placeholder="Ingresa la edad"
                    min="0"
                  />
                </div>

                {(isEditing || isCreating) && (
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 flex-1 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      <Save size={16} />
                      {isCreating ? "Crear Usuario" : "Guardar Cambios"}
                    </button>
                    <button
                      onClick={clearForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              {!isEditing && !isCreating && selectedUser && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>ID:</strong> {selectedUser.id}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Selecciona "Editar" para modificar los datos o "Eliminar" para
                    remover al usuario.
                  </p>
                </div>
              )}

              {!selectedUser && !isCreating && (
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-gray-600">
                    Selecciona un usuario de la lista para ver sus detalles o haz
                    clic en "Nuevo Usuario".
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="crud-container p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Estadísticas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat-card blue p-4 rounded-lg bg-blue-50">
              <p className="text-2xl font-bold text-blue-600">{users.length}</p>
              <p className="text-sm text-blue-800">Total de Usuarios</p>
            </div>
            <div className="stat-card green p-4 rounded-lg bg-green-50">
              <p className="text-2xl font-bold text-green-600">
                {users.length > 0
                  ? Math.round(
                      users.reduce((sum, user) => sum + user.edad, 0) / users.length
                    )
                  : 0}
              </p>
              <p className="text-sm text-green-800">Edad Promedio</p>
            </div>
            <div className="stat-card purple p-4 rounded-lg bg-purple-50">
              <p className="text-2xl font-bold text-purple-600">
                {selectedUser ? 1 : 0}
              </p>
              <p className="text-sm text-purple-800">Usuario Seleccionado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}