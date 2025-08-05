# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Estructura 
app/
├── assets/                      # Imágenes, íconos, etc.
├── components/                  # Componentes reutilizables
│   ├── ui/                      # Botones, inputs, modales genéricos
│   ├── shared/                  # Ej: DataGrid, Header, etc.
│   └── layout/                  # Navbar, Sidebar, etc.
├── features/                    # Agrupación por dominio funcional
│   ├── productos/
│   │   ├── components/          # Componentes específicos de productos (cards, forms)
│   │   ├── pages/               # Páginas: desktop, móvil o detalle
│   │   └── index.ts            # Lógica o hook general del módulo
│   └── usuarios/
│       ├── components/
│       ├── pages/
│       └── index.ts
├── hooks/                       # Hooks globales
├── pages/                       # Si usas Next.js, aquí van las rutas o vistas principales
│   ├── index.tsx               # Home
│   └── [...].tsx               # Rutas por nombre
├── routes/                      # Rutas de navegación centralizadas (si no usas file-based routing)



## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

## Descargar CLI Tailwind css 

```bash
npm install -D tailwindcss postcss autoprefixer
```

## Crea los archivos de configuración

```bash
npx tailwindcss init -p

```


Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
