# Sistema de Gestión de Inventarios Frontend

Este proyecto es la parte frontend de un Sistema de Gestión de Inventarios, construido usando Next.js 14. El sistema proporciona una interfaz amigable para gestionar varios aspectos del inventario, incluidos productos, proveedores, órdenes y más.

## Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts](#scripts)
- [Contribuyendo](#contribuyendo)
- [Licencia](#licencia)

## Características

- Autenticación de usuarios y control de acceso basado en roles
- Gestión de productos, proveedores e inventario
- Creación y gestión de órdenes de compra
- Recepción de notificaciones de órdenes
- Visualización de informes y ajustes de inventario
- Diseño responsivo para móviles y escritorio

## Requisitos Previos

- Node.js (versión 16.x o superior)
- npm (versión 8.x o superior) o yarn (versión 1.22.x o superior)

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/Andeveling/sgi-frontend.git
    cd sgi-frontend
    ```

2. Instalar dependencias:

    Usando npm:

    ```bash
    npm install
    ```

    O usando yarn:

    ```bash
    yarn install
    ```

## Uso

1. Iniciar el servidor de desarrollo:

    Usando npm:

    ```bash
    npm run dev
    ```

    O usando yarn:

    ```bash
    yarn dev
    ```

2. Abre tu navegador y navega a `http://localhost:3000`.

## Estructura del Proyecto

- `pages/`: Contiene las páginas de Next.js.
- `components/`: Contiene los componentes de React utilizados en todo el proyecto.
- `styles/`: Contiene los estilos globales y específicos de componentes.
- `public/`: Contiene recursos estáticos como imágenes e íconos.
- `utils/`: Contiene funciones y utilidades.
- `contexts/`: Contiene los proveedores de contexto de React para la gestión del estado.

## Scripts

- `dev`: Ejecuta la aplicación en modo de desarrollo.
- `build`: Compila la aplicación para producción.
- `start`: Inicia la aplicación en modo de producción.
- `lint`: Ejecuta ESLint para verificar problemas de calidad de código.
- `test`: Ejecuta la suite de pruebas.

## Contribuyendo

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección de errores.
3. Realiza tus cambios y sube tu rama a tu fork.
4. Crea un pull request con una descripción de tus cambios.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

