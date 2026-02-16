<p align="center">
  <img src="https://i.postimg.cc/tgNRH08R/logo.png" alt="Mano Amiga Logo" width="180" />
</p>

<h1 align="center">Mano Amiga</h1>

<p align="center">
  <strong>Conectando personas con profesionales de confianza para tareas del hogar.</strong><br/>
  Plomeros, electricistas, jardineros y mas en Mar del Plata — todo en un solo lugar.
</p>

<p align="center">
  <a href="https://www.manoamiga.com.ar">manoamiga.com.ar</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-19.2-dd0031?logo=angular&logoColor=white" alt="Angular 19" />
  <img src="https://img.shields.io/badge/Express-5.1-000000?logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Auth0-Secured-EB5424?logo=auth0&logoColor=white" alt="Auth0" />
  <img src="https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-black?logo=vercel&logoColor=white" alt="Deploy" />
</p>

---

## Tabla de contenidos

- [New Features](#new-features)
- [Sobre el proyecto](#sobre-el-proyecto)
- [Arquitectura](#arquitectura)
- [Tech Stack](#tech-stack)
- [Funcionalidades](#funcionalidades)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API Reference](#api-reference)
- [Modelos de datos](#modelos-de-datos)
- [Frontend — Componentes](#frontend--componentes)
- [Servicios del frontend](#servicios-del-frontend)
- [Rutas del frontend](#rutas-del-frontend)
- [Internacionalizacion (i18n)](#internacionalizacion-i18n)
- [Tema oscuro / claro](#tema-oscuro--claro)
- [Autenticacion y roles](#autenticacion-y-roles)
- [Instalacion y desarrollo](#instalacion-y-desarrollo)
- [Variables de entorno](#variables-de-entorno)
- [Deploy](#deploy)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## New Features

### 1. Filtro por calificacion minima

Los usuarios pueden filtrar profesionales segun una calificacion minima (3, 4 o 5 estrellas). El backend calcula el promedio de resenas en tiempo real usando un **MongoDB Aggregation Pipeline** con `$lookup`, `$addFields` y `$avg`, sin necesidad de almacenar el promedio en el schema. El frontend envia el parametro `minRating` al endpoint `/publicaciones/filtrar`.

### 2. Modo oscuro / claro

Toggle en el header que alterna entre tema claro y oscuro. Implementado con **CSS custom properties** (`--bg-body`, `--bg-surface`, `--text-primary`, etc.) definidas en `:root` y `[data-theme="dark"]`. Todos los componentes usan estas variables, asegurando consistencia visual completa. La preferencia se persiste en `localStorage` y un script inline en `<head>` la aplica antes del render de Angular para evitar el flash de tema incorrecto (FOUC).

### 3. Internacionalizacion (i18n) — Espanol, Ingles y Portugues

Soporte completo de 3 idiomas en toda la aplicacion:

- **Traduccion estatica**: `TranslateService` con un diccionario de +70 keys organizadas por seccion (header, home, categories, profile, reviews, footer, FAQ, panel de control, formularios, etc.). Se usa con el pipe `| translate`.
- **Traduccion dinamica**: `AutoTranslateService` que traduce contenido de la base de datos (descripciones, horarios, texto de resenas) via la API gratuita **MyMemory**. Los resultados se cachean en `localStorage` para evitar llamadas repetidas. Se usa con el pipe `| autoTranslate`.
- **Modal de idioma**: Accesible desde el header, permite cambiar entre ES/EN/PT con banderas. La preferencia se guarda en `localStorage`.
- **Nombres de oficios traducidos**: Los nombres de categorias (plomero, electricista, etc.) se traducen dinamicamente en cards, titulos de pagina, perfil y mensajes de WhatsApp.

### 4. Buscador por nombre

Barra de busqueda en tiempo real dentro de cada categoria de oficio. Filtra la lista de profesionales por nombre al escribir, con boton de limpiar. El contador de profesionales disponibles se actualiza automaticamente segun el filtro. Se resetea al cambiar de oficio.

### 5. Ordenar por mas nuevos

Boton toggle al lado de la barra de busqueda que ordena los profesionales por fecha de creacion (mas recientes primero). Al activarlo se resalta en el color principal; al desactivarlo vuelve al orden aleatorio original. En mobile solo muestra el icono para ahorrar espacio. Se resetea al cambiar de oficio.

### 6. UI mejorada del panel de usuario

- **Mis avisos**: Cards rediseñadas con icono del oficio, nombre, ubicacion, estado (activo/pendiente) con badges de color, y estado de seleccion visual. Boton "Nueva publicacion" con diseño moderno.
- **Formulario de edicion**: Layout tipo card con header con gradiente, campos organizados en filas, contador de caracteres para la descripcion, y botones estilizados (eliminar como outline rojo, guardar como relleno verde).
- **Tarjeta de perfil**: Diseño con banner, avatar overlay, chips de informacion (email, fecha, estado de cuenta) y diseño responsive.
- **Tabs de navegacion**: Tabs modernos con iconos (Mi cuenta / Mis avisos) con indicador de estado activo animado.

### 7. Soporte para safe area (iPhone notch)

Ajuste automatico del header, contenido principal y footer para respetar las areas seguras del dispositivo (`env(safe-area-inset-top)` y `env(safe-area-inset-bottom)`), evitando que el notch o la barra home tapen elementos de la UI. Se activo `viewport-fit=cover` en el meta tag.

### 8. Chatbot integrado (Laburen)

Widget de chatbot tipo burbuja integrado via el SDK de **Laburen**. Se carga como modulo ES al final del `<body>` y no requiere elementos DOM especificos, lo que evita conflictos con el ciclo de vida de Angular. Permite a los visitantes interactuar con un agente de IA directamente desde cualquier pagina.

---

## Sobre el proyecto

**Mano Amiga** es una plataforma web que conecta personas que necesitan ayuda con tareas del hogar (plomeria, electricidad, jardineria, pintura, cerrajeria, carpinteria, limpieza, reparaciones tecnicas) con profesionales independientes disponibles en Mar del Plata, Argentina.

La plataforma permite a los profesionales publicar sus servicios y a los usuarios contactarlos directamente por WhatsApp o telefono, sin intermediarios ni comisiones.

### Problema que resuelve

En muchas ciudades, encontrar un profesional de confianza para reparaciones del hogar depende del boca a boca. Mano Amiga centraliza esa busqueda, agrega resenas verificadas y facilita el contacto directo.

---

## Arquitectura

```
┌───────────────────┐         ┌───────────────────┐         ┌──────────────┐
│                   │  HTTP   │                   │ Mongoose │              │
│   Angular 19 SPA  │ ──────> │  Express 5 API    │ ──────>  │ MongoDB Atlas│
│   (Vercel)        │         │  (Render)         │          │              │
│                   │ <────── │                   │ <──────  │              │
└───────────────────┘  JSON   └───────────────────┘          └──────────────┘
        │                              │
        │ OAuth 2.0                    │
        v                              │
┌───────────────────┐                  │
│     Auth0         │──────────────────┘
│  (Autenticacion)  │   JWT validation
└───────────────────┘
```

| Capa | Tecnologia | Host |
|------|-----------|------|
| Frontend | Angular 19 (standalone components) | Vercel |
| Backend | Express 5 + Mongoose | Render |
| Base de datos | MongoDB Atlas | MongoDB Cloud |
| Autenticacion | Auth0 | Auth0 Cloud |
| CDN/Assets | Vercel Edge | Vercel |

---

## Tech Stack

### Backend

| Dependencia | Version | Uso |
|-------------|---------|-----|
| **Express** | 5.1 | Framework HTTP |
| **Mongoose** | 8.14 | ODM para MongoDB |
| **cors** | 2.8 | Politica de origen cruzado |
| **dotenv** | 16.5 | Variables de entorno |
| **nodemon** | 3.1 | Hot reload en desarrollo |

### Frontend

| Dependencia | Version | Uso |
|-------------|---------|-----|
| **Angular** | 19.2 | Framework SPA |
| **@auth0/auth0-angular** | 2.2 | Autenticacion OAuth 2.0 |
| **@angular/fire** | 19.2 | Integracion Firebase |
| **jwt-decode** | 4.0 | Decodificar tokens JWT |
| **rxjs** | 7.8 | Programacion reactiva |
| **Font Awesome** | 6.0 | Iconografia |
| **Google Fonts** | — | Tipografias (General Sans, Roboto) |

---

## Funcionalidades

### Para usuarios

- **Busqueda por oficio**: Plomeros, electricistas, jardineros, pintores, cerrajeros, carpinteros, limpieza, tecnicos
- **Busqueda por nombre**: Barra de busqueda en tiempo real dentro de cada categoria
- **Contacto directo**: Boton de WhatsApp y llamada telefonica
- **Resenas y calificaciones**: Sistema de estrellas (1-5) con resenas de texto
- **Perfil del profesional**: Descripcion, horarios, tarifa de visita, anos de experiencia

### Para profesionales

- **Publicacion de servicios**: Formulario guiado de 5 pasos
- **Panel de control**: Editar, activar/desactivar y eliminar publicaciones
- **Resenas recibidas**: Ver opiniones de clientes en cada publicacion

### Para administradores

- **Moderacion**: Aprobar o rechazar publicaciones pendientes
- **Conteo de pendientes**: Badge con cantidad de publicaciones inactivas

### Generales

- **Modo oscuro / claro**: Toggle con persistencia en localStorage
- **Internacionalizacion**: Espanol, ingles y portugues
- **Auto-traduccion**: Contenido dinamico (descripciones, resenas) traducido via API
- **Responsive**: Optimizado para mobile, tablet y desktop
- **SEO**: Open Graph, Twitter Cards, JSON-LD, meta tags, Google Analytics
- **Safe area**: Soporte para notch de iPhone y barra home

---

## Estructura del proyecto

### Backend (`manoAmiga-back/`)

```
manoAmiga-back/
├── config/
│   └── db.js                         # Conexion a MongoDB Atlas
├── controllers/
│   ├── publicacionController.js      # Logica de publicaciones
│   ├── reviewController.js           # Logica de resenas
│   └── usuarioController.js          # Logica de usuarios
├── models/
│   ├── Publicacion.js                # Schema de publicacion
│   ├── Review.js                     # Schema de resena
│   └── Usuario.js                    # Schema de usuario
├── routes/
│   ├── publicaciones.js              # Rutas de publicaciones
│   ├── review.js                     # Rutas de resenas
│   └── usuario.js                    # Rutas de usuarios
├── index.js                          # Entry point del servidor
├── variables.env                     # Variables de entorno
└── package.json
```

### Frontend (`manoAmiga-front/`)

```
manoAmiga-front/src/app/
├── components/                        # Componentes de funcionalidad
│   ├── admin-header/                  # Header del panel admin
│   ├── admin-post-menu/               # Menu de moderacion admin
│   ├── failure-post/                  # Pagina de error al publicar
│   ├── faq/                           # Preguntas frecuentes (acordeon)
│   ├── general-reviews/               # Carrusel de testimonios
│   ├── language-modal/                # Modal selector de idioma
│   ├── list/                          # Lista de publicaciones (cards)
│   ├── my-post-edit-form/             # Formulario de edicion
│   ├── my-post-panel-control/         # Panel de gestion de avisos
│   ├── my-posts/                      # Lista de mis publicaciones
│   ├── personal-reviews/              # Resenas de un profesional
│   ├── post-form/                     # Formulario de creacion (5 pasos)
│   ├── profile-card/                  # Tarjeta de perfil de usuario
│   ├── success-post/                  # Pagina de exito al publicar
│   ├── terms/                         # Terminos y condiciones
│   ├── user-header/                   # Tabs del panel de usuario
│   └── users-cards/                   # Cards de profesionales destacados
├── interfaces/                        # Modelos TypeScript
│   ├── my-token.ts                    # Estructura del JWT
│   ├── publicacion.ts                 # Interfaz de publicacion
│   ├── review.ts                      # Interfaz de resena
│   └── usuario.ts                     # Interfaz de usuario
├── pages/                             # Paginas (rutas principales)
│   ├── categories/                    # Listado por oficio
│   ├── home/                          # Landing page
│   ├── my-profile/                    # Dashboard del usuario
│   └── profile/                       # Perfil publico del profesional
├── pipes/                             # Pipes personalizados
│   ├── auto-translate.pipe.ts         # Traduccion automatica (API)
│   └── translate.pipe.ts             # Traduccion estatica (diccionario)
├── services/                          # Servicios
│   ├── auto-translate.service.ts      # Traduccion dinamica via MyMemory
│   ├── publicaciones.service.ts       # CRUD de publicaciones
│   ├── reviews.service.ts             # CRUD de resenas
│   ├── theme.service.ts               # Gestion de tema claro/oscuro
│   ├── translate.service.ts           # i18n con diccionario local
│   └── usuarios.service.ts            # CRUD de usuarios
└── sharedComponents/                  # Componentes globales
    ├── footer/                        # Footer del sitio
    └── header/                        # Header con navegacion
```

---

## API Reference

Base URL: `https://manoamiga-back-b4h8.onrender.com/api`

### Usuarios

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `POST` | `/usuarios` | Crear usuario |
| `GET` | `/usuarios/:auth0Id` | Obtener usuario por Auth0 ID |
| `PUT` | `/usuarios/:id` | Actualizar usuario |
| `DELETE` | `/usuarios/:id` | Eliminar usuario |

### Publicaciones

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `POST` | `/publicaciones` | Crear publicacion |
| `GET` | `/publicaciones/filtrar?job=&location=&minRating=` | Filtrar por oficio, ubicacion y rating minimo |
| `GET` | `/publicaciones/:userId` | Obtener publicaciones de un usuario |
| `GET` | `/publicaciones/publicacion/:id` | Obtener publicacion por ID |
| `GET` | `/publicaciones/activas` | Obtener publicaciones activas |
| `GET` | `/publicaciones/inactivas` | Obtener publicaciones inactivas (admin) |
| `GET` | `/publicaciones/inactiva/una` | Obtener una publicacion inactiva (admin) |
| `GET` | `/publicaciones/inactivas/count` | Contar publicaciones pendientes |
| `PUT` | `/publicaciones/:id` | Actualizar publicacion |
| `DELETE` | `/publicaciones/:id` | Eliminar publicacion |

### Resenas

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `POST` | `/reviews` | Crear resena |
| `GET` | `/reviews/:postId` | Obtener resenas de una publicacion |

---

## Modelos de datos

### Usuario

```javascript
{
  auth0Id:   String,    // ID de Auth0 (requerido)
  name:      String,    // Nombre completo
  email:     String,    // Email
  phone:     Number,    // Telefono (opcional)
  isActive:  Boolean,   // Estado de la cuenta (default: true)
  dateAdded: Date       // Fecha de registro
}
```

### Publicacion

```javascript
{
  userId:      String,   // ID del usuario propietario
  userName:    String,   // Nombre del profesional
  job:         String,   // Oficio (plomero, electricista, etc.)
  location:    String,   // Ciudad (Mar del Plata)
  description: String,   // Descripcion del servicio (min 50 chars)
  schedule:    String,   // Horarios de atencion
  pricing:     Number,   // Tarifa de visita ($)
  experience:  String,   // Anos de experiencia
  phone:       Number,   // Telefono de contacto
  isActive:    Boolean,  // Publicada o pendiente (default: false)
  dateAdded:   Date      // Fecha de creacion
}
```

### Resena

```javascript
{
  authorId:   String,   // ID del autor de la resena
  targetId:   String,   // ID del profesional evaluado
  postId:     String,   // ID de la publicacion
  userName:   String,   // Nombre del autor
  score:      Number,   // Calificacion 1-5 estrellas
  textReview: String,   // Texto de la resena (10-280 chars)
  dateAdded:  Date      // Fecha de la resena
}
```

---

## Frontend — Componentes

### Paginas

| Componente | Ruta | Descripcion |
|-----------|------|-------------|
| `HomeComponent` | `/` | Landing page con categorias, profesionales destacados, testimonios y FAQ |
| `CategoriesComponent` | `/categorias/:ubicacion/:trabajo` | Lista de profesionales filtrada por oficio, con buscador por nombre |
| `ProfileComponent` | `/perfil/:id` | Perfil publico de un profesional con contacto y resenas |
| `MyProfileComponent` | `/mi-perfil` | Dashboard del usuario con panel de cuenta y gestion de avisos |

### Componentes compartidos

| Componente | Descripcion |
|-----------|-------------|
| `HeaderComponent` | Barra de navegacion fija con menu responsive, toggle de tema, selector de idioma |
| `FooterComponent` | Pie de pagina con links sociales, legales y descripcion |

### Componentes de funcionalidad

| Componente | Descripcion |
|-----------|-------------|
| `PostFormComponent` | Formulario de creacion de publicacion en 5 pasos |
| `ListComponent` | Grilla de cards de profesionales |
| `PersonalReviewsComponent` | Sistema de resenas con formulario de calificacion |
| `MyPostsComponent` | Lista de publicaciones del usuario con estado activo/inactivo |
| `MyPostEditFormComponent` | Formulario de edicion con validacion y botones de guardar/eliminar |
| `MyPostPanelControlComponent` | Layout sidebar + formulario para gestion de avisos |
| `UserHeaderComponent` | Tabs de navegacion del panel de usuario (Mi cuenta / Mis avisos) |
| `AdminPostMenuComponent` | Panel de moderacion para aprobar/rechazar publicaciones |
| `GeneralReviewsComponent` | Carrusel de testimonios con auto-slide en mobile |
| `UsersCardsComponent` | Cards de profesionales destacados en la home |
| `FAQComponent` | Acordeon de preguntas frecuentes |
| `LanguageModalComponent` | Modal para seleccion de idioma (ES/EN/PT) |
| `ProfileCardComponent` | Tarjeta de perfil con avatar, nombre, email y estado |

---

## Servicios del frontend

| Servicio | Responsabilidad |
|---------|-----------------|
| `PublicacionesService` | CRUD de publicaciones, filtrado por oficio/ubicacion/rating |
| `ReviewsService` | Crear y obtener resenas por publicacion |
| `UsuariosService` | Obtener y crear usuarios |
| `TranslateService` | Internacionalizacion con diccionario local (ES/EN/PT) |
| `AutoTranslateService` | Traduccion de contenido dinamico via API MyMemory con cache en localStorage |
| `ThemeService` | Gestion de tema oscuro/claro con persistencia |

---

## Rutas del frontend

| Ruta | Componente | Auth |
|------|-----------|------|
| `/` | Home | No |
| `/categorias/:ubicacion/:trabajo` | Categories | No |
| `/perfil/:id` | Profile | No |
| `/mi-perfil` | MyProfile | Si (AuthGuard) |
| `/crear-publicacion` | PostForm | No |
| `/publicacion-exitosa` | SuccessPost | No |
| `/publicacion-fallida` | FailurePost | No |
| `/terminos-y-condiciones` | Terms | No |
| `/politicas-de-privacidad` | Privacy | No |
| `**` | Redirect a `/` | — |

---

## Internacionalizacion (i18n)

La app soporta 3 idiomas:

| Codigo | Idioma | Bandera |
|--------|--------|---------|
| `es` | Espanol (Argentina) | AR |
| `en` | English | US |
| `pt` | Portugues (Brasil) | BR |

### Traduccion estatica

El `TranslateService` mantiene un diccionario con +60 keys organizadas por seccion (`header.*`, `home.*`, `job.*`, `categories.*`, `profile.*`, `footer.*`, `faq.*`, `reviews.*`). Se usa con el pipe `| translate`.

### Traduccion dinamica

El `AutoTranslateService` traduce contenido de la base de datos (descripciones de perfil, horarios, texto de resenas) usando la API gratuita **MyMemory**. Los resultados se cachean en `localStorage` para evitar llamadas repetidas. Se usa con el pipe `| autoTranslate`.

### Seleccion de idioma

Un modal accesible desde el header permite cambiar el idioma. La preferencia se guarda en `localStorage`.

---

## Tema oscuro / claro

La app implementa un sistema de temas usando **CSS custom properties** definidas en `:root` y `[data-theme="dark"]`.

| Variable | Claro | Oscuro |
|----------|-------|--------|
| `--bg-body` | `#ffffff` | `#121212` |
| `--bg-surface` | `#f9f6f1` | `#1e1e1e` |
| `--bg-header` | `#ffffff` | `#1a1a1a` |
| `--text-primary` | `#1a1a1a` | `#e0e0e0` |
| `--text-secondary` | `#6c757d` | `#9e9e9e` |
| `--border-color` | `#e0e0e0` | `#333333` |
| `--color-principal` | `#d32f2f` | `#d32f2f` |

Un script inline en `<head>` aplica el tema guardado en `localStorage` antes de que Angular arranque, evitando el flash de tema incorrecto (FOUC).

---

## Autenticacion y roles

La app usa **Auth0** para autenticacion OAuth 2.0.

### Flujo

1. El usuario hace clic en "Iniciar sesion" en el header
2. Se redirige a Auth0 para login/registro
3. Auth0 devuelve un JWT con claims personalizados
4. El frontend decodifica el token con `jwt-decode`
5. Se extrae el rol del claim `https://manoamiga.com.ar/roles`

### Roles

| Rol | Permisos |
|-----|----------|
| **Usuario** | Ver perfil, crear/editar/eliminar sus publicaciones, escribir resenas |
| **Admin** | Todo lo anterior + moderar publicaciones pendientes |

### Rutas protegidas

La ruta `/mi-perfil` usa un `AuthGuard` de Auth0 que redirige al login si el usuario no esta autenticado.

---

## Instalacion y desarrollo

### Prerequisitos

- Node.js >= 18
- npm >= 9
- Angular CLI (`npm i -g @angular/cli`)
- Cuenta de MongoDB Atlas
- Cuenta de Auth0

### Backend

```bash
cd manoAmiga-back

# Instalar dependencias
npm install

# Configurar variables de entorno
cp variables.env.example variables.env
# Editar variables.env con tu connection string de MongoDB

# Iniciar en desarrollo
npm run dev

# Iniciar en produccion
npm start
```

El servidor corre en `http://localhost:4000`.

### Frontend

```bash
cd manoAmiga-front

# Instalar dependencias
npm install

# Iniciar en desarrollo
ng serve --open

# Build de produccion
ng build
```

La app corre en `http://localhost:4200`.

---

## Variables de entorno

### Backend (`variables.env`)

```env
DB_MONGO=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<db>
```

### Frontend

Las configuraciones de Auth0 y Firebase estan en `src/app/app.config.ts`. La URL del backend esta en cada servicio (`publicaciones.service.ts`, `reviews.service.ts`, `usuarios.service.ts`).

---

## Deploy

| Servicio | Plataforma | URL |
|----------|-----------|-----|
| Frontend | Vercel | [manoamiga.com.ar](https://www.manoamiga.com.ar) |
| Backend | Render | manoamiga-back-b4h8.onrender.com |
| Base de datos | MongoDB Atlas | Cloud |
| Auth | Auth0 | auth.manoamiga.com.ar |

### Frontend (Vercel)

El frontend se despliega automaticamente en Vercel al hacer push a `main`. El build output es `dist/mano-amiga`.

### Backend (Render)

El backend esta hosteado en Render como un Web Service con auto-deploy desde el repositorio.

### CORS

El backend acepta peticiones desde:
- `http://localhost:4200` (desarrollo)
- `https://mano-amiga-front-seven.vercel.app` (staging)
- `https://www.manoamiga.com.ar` (produccion)

---

## Contribuir

1. Fork del repositorio
2. Crear una branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de los cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

---

## Licencia

Este proyecto es de uso privado. Todos los derechos reservados.

---

<p align="center">
  Hecho con <span style="color: #d32f2f;">&#10084;</span> en Mar del Plata, Argentina
</p>
