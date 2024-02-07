### Simple Social Network

Este proyecto es una Simple Social Network que permite a los usuarios registrarse, buscar y seguir a otros usuarios, crear y comentar publicaciones, así como interactuar con el contenido de la red social. La aplicación está desarrollada utilizando Node.js y React.js.

#### Instrucciones de Ejecución

**Carpeta "front":**
1. Abre una terminal.
2. Navega hasta la carpeta "front" del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias: npm install
4. Una vez completada la instalación, ejecuta el siguiente comando para iniciar el servidor de desarrollo: npm run dev
5. El servidor de desarrollo se ejecutará y podrás acceder a la aplicación desde tu navegador.

**Carpeta "back":**
1. Abre otra terminal o una nueva pestaña en tu terminal.
2. Navega hasta la carpeta "back" del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias: npm install
4. Una vez completada la instalación, ejecuta el siguiente comando para compilar el proyecto: npm run build
5. Después de que la compilación haya finalizado con éxito, ejecuta el siguiente comando para iniciar el servidor: npm run server
6. El servidor se iniciará y estará listo para manejar las solicitudes de la aplicación.

#### Configuración del Entorno
Antes de ejecutar la aplicación, es necesario configurar las variables de entorno para establecer la conexión con la base de datos MongoDB.

Variables de Entorno
En el directorio del servidor (backend), crea un archivo llamado .env y define las siguientes variables de entorno:
DB_USER=tu_usuario_de_MongoDB
DB_PASSWD=tu_contraseña_de_MongoDB
Asegúrate de reemplazar tu_usuario_de_MongoDB y tu_contraseña_de_MongoDB con las credenciales reales de tu base de datos MongoDB.

#### Funcionalidades Implementadas

- CRUD de usuario: Los usuarios pueden registrarse, iniciar sesión, ver, editar y eliminar su perfil.
- Comentar Publicaciones: Los usuarios pueden comentar las publicaciones de otros usuarios.
- CRUD de Post: Los usuarios pueden crear, ver, editar y eliminar sus propias publicaciones.
- Autenticación de Usuarios: Permite a los usuarios registrarse e iniciar sesión de forma segura.
- Búsqueda de Usuarios: Los usuarios pueden buscar a otros usuarios por su nombre de usuario.
- Seguir Usuarios: Los usuarios pueden seguir y dejar de seguir a otros usuarios, y ver sus followers y following.
- Feed de Contenido: Los usuarios pueden ver un feed de contenido que incluye las publicaciones de los usuarios que siguen.
- Configuración de Perfiles: Los usuarios pueden configurar la privacidad de su perfil como público o privado.
- Dar Like a Publicaciones: Los usuarios pueden dar like a las publicaciones.
- Diseño Responsive: La aplicación está diseñada para dispositivos móviles primero.
- Mensajería Directa: Implementación de la funcionalidad de mensajería directa entre usuarios.

#### Tecnologías Utilizadas

Frontend:
React.js: Biblioteca de JavaScript para construir interfaces de usuario.
HTML y CSS: Lenguajes estándar para la estructura y el diseño de páginas web.
SCSS: Extensión de CSS que agrega funcionalidades como variables, anidamiento y mixins.
TypeScript: Superset de JavaScript que agrega tipado estático opcional y otras características.

Backend:
Node.js: Entorno de ejecución de JavaScript del lado del servidor.
Hapi.js: Framework de servidor web para Node.js, utilizado para crear APIs y aplicaciones web.
MongoDB: Base de datos NoSQL utilizada para almacenar datos del usuario y las publicaciones.
TypeScript: Superset de JavaScript que agrega tipado estático opcional y otras características.

Otras herramientas:
Socket.io: Biblioteca de JavaScript para la comunicación en tiempo real entre el cliente y el servidor.
JWT (JSON Web Tokens): Método estándar para la creación de tokens de acceso que se utilizan para la autenticación.

#### Configuración del Entorno
Antes de ejecutar la aplicación, es necesario configurar las variables de entorno para establecer la conexión con la base de datos MongoDB.

Variables de Entorno
En el directorio del servidor (backend), crea un archivo llamado .env y define las siguientes variables de entorno:

Copy code
DB_USER=tu_usuario_de_MongoDB
DB_PASSWD=tu_contraseña_de_MongoDB
Asegúrate de reemplazar tu_usuario_de_MongoDB y tu_contraseña_de_MongoDB con las credenciales reales de tu base de datos MongoDB.
