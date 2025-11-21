# **Personal Software Process (PSP) – Zero Waste**

## **Sobre este repositorio**

Este repositorio contiene las entregas y prácticas desarrolladas aplicando el **Personal Software Process (PSP)** dentro del proyecto **Zero Waste**, un sistema orientado a la gestión sostenible de residuos, rutas, usuarios y reportes.

---

## **Materiales utilizados**

* *PSP: A Self-Improvement Process for Software Engineers*
* *The Personal Software Process Body of Knowledge, Version 2.0*
* Material de autoestudio PSP del SEI

---

## **¿Qué es el PSP?**

El **Personal Software Process (PSP)** es un proceso disciplinado de desarrollo personal que ayuda al desarrollador a **mejorar sus estimaciones, calidad, productividad y control del trabajo**, registrando datos reales de:

* Tiempo
* Defectos
* Tamaño del código
* Calidad del producto

Fue creado por **Watts Humphrey** para llevar los principios del CMM al trabajo individual.

---

## **Objetivo del PSP aplicado a Zero Waste**

El PSP dentro del proyecto **Zero Waste** permite:

* Mejorar la **planificación y estimación** del desarrollo.
* Registrar y analizar el **tiempo real invertido** por fase del proyecto.
* Reducir la cantidad de **defectos** mediante revisiones estructuradas.
* Llevar un control claro del **flujo de trabajo personal**.
* Incrementar la **calidad del software**, especialmente en módulos como:

  * Autenticación
  * Gestión de usuarios
  * Rutas de recolección
  * Reportes y estadísticas
  * Dashboard administrativo

---

## **Estructura del PSP**

El entrenamiento PSP evoluciona desde niveles básicos (PSP0) hasta niveles orientados a calidad (PSP2.1):

### **PSP0 / PSP0.1 – Medición básica**

Incluye:

* Planificación inicial
* Diseño y codificación
* Compilación y pruebas
* Postmortem (análisis final)
  Aquí se establece la línea base de:
* Tiempo por fase
* Defectos introducidos/removidos
* Tamaño del código (LOC)

En PSP0.1 se agregan:

* Estándar de codificación
* Medición de tamaño
* Plan personal de mejora (PIP)

---

### **PSP1 / PSP1.1 – Estimación y planificación**

Se usan los datos previos para:

* Estimar tamaño del nuevo módulo (por ejemplo: Registro de usuarios)
* Estimar tiempo real
* Comparar estimado vs real en el Postmortem
  En PSP1.1 se refina la planificación y se agregan reportes más precisos.

---

### **PSP2 / PSP2.1 – Gestión de calidad**

Introduce:

* **Revisión de diseño**
* **Revisión de código**
* Análisis de defectos por fase
* Elaboración de checklists para evitar errores comunes

En Zero Waste esto se usa en:

* Revisión de endpoints en Node.js
* Checklist de seguridad (tokens, validaciones, middlewares)
* Revisión de componentes de React (estados, props, rutas)

---

## **Importancia de los datos en Zero Waste**

Los datos recolectados durante el PSP permiten mejorar:

### **Mediciones principales**

* **Tamaño:** líneas de código (JS, React, Node.js)
* **Esfuerzo:** minutos por fase
* **Calidad:** número de defectos
* **Cronograma:** fechas planeadas vs reales

### **Métricas derivadas**

* Exactitud de estimación
* Tasa de remoción de defectos
* Productividad
* Densidad de defectos
* Rendimiento por fase
* Índice de costos de calidad

Estas métricas ayudan a mejorar módulos críticos como:

* CRUD de usuarios
* Login con JWT
* Panel de administración
* Gestión de rutas y reportes

---

## **Planificación y seguimiento**

El proyecto Zero Waste usa herramientas como:

* **Clockify / Toggl** → registro de tiempo
* **GitHub Issues / Trello** → seguimiento de defectos
* **Google Sheets / Excel** → estadísticas de PSP
* **GitHub Projects** → tablero Kanban del proyecto
* **Commits etiquetados** → control de versiones por fase

Se aplica PROBE para estimación y Earned Value para seguimiento del progreso.

---

## **Calidad en el proyecto Zero Waste**

El objetivo del PSP es entregar software **con pocos defectos y alta mantenibilidad**.

Para esto se aplican:

* Revisión de diseño (diagramas, estructura, endpoints)
* Revisión de código (JavaScript, React, Node.js)
* Checklists personalizadas
* Registro de defectos encontrados en cada fase

Ejemplos:

* Validaciones faltantes en formularios
* Errores de rutas en React
* Fallas de autenticación
* Código duplicado o sin modularizar

---

## **Conclusión**

El PSP aplicado a **Zero Waste** permite tener un desarrollo más disciplinado, con métricas reales que apoyan la mejora continua en:

✔ Estimación
✔ Calidad
✔ Productividad
✔ Control del proceso personal
✔ Entrega de software más confiable

