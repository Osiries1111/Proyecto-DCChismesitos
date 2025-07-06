[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Agtxuzqm)
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/QTUQnWJd)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15797350&assignment_repo_type=AssignmentRepo)
# Tarea 2 :construction:

* :pencil2: **Nombre:** Osiris Díaz
* :pencil2: **Correo:** ozdiaz@uc.cl

## Código :symbols:

### :computer: Cómo ejecutar este código [1 Punto]

```bash
yarn
yarn dev
```

### :teacher: Explicación del funcionamiento del código [1.5 Puntos]
- Se utilizó axios para las request, y el modo de uso es por medio de try catch , para tomar posibles errores
- Respecto al cómo se uso react y los hooks de react, se usarón los hooks para podeer tomar los valores entregados por los formularios, ver algunas validaciones y hacer acciones que impliquen un cambio de la página, como la carga de los posts, en el lado de react, se uso para invocar componentes y dar html básico con forma.
- No se añadieron componentes extras.
- En general el código no posee problemas y cumple con todo, además que se manejan errores en caso de que algo no exista en la api (como los post creados por uno)
- Por otro lado, como no se especifica nada en enunciado de si los cambios se deben mantener lo más posible (sobre todo los editperfil) se guardan los datos como user y posts en ``localstorage``, utilizando los datos de los endpoints pedidos, esto se puede observar por código o al revisar la consola de inspeccionar la página 
- EditPost se puede realizar en post creados por uno mismo, y se hace manejando el error de la Api, pues dentro de ella, realmente el post no existe, y por ello, también internamente se lleva un conteo de IDs para darle a cada nuevo post un id único y así también poder elimnarlo.
- Cuando se sale y se vuelve a ir a la página de posts, se pierden los posts creados por uno mismo, pues cada vez que se habre esta página, se vuelven a buscar los post de la Api, pero el resto funciona perfectamente.
- La página se tarda 1 segundo 0 1.5 seg en cargar algunas cositas y dar algunos pop up (como el de que se pudo editar correctamente el post), pero si los hace.


### :warning: Funcionalidades implementadas y no implementadas
- Se implementaron todas funcionalidades pedidas con los requerimientos pedidos

## Reflexión :thought_balloon: [3.5 Puntos]
### :scroll: ¿Para que utilizamos *async* y *await* en las funciones? [1 Punto]
*async* hace que una función se vuelva una prometa y *await* espera por la promesa, por eso *await* se debe utilizar dentro de una función con *async*, un uso directo es cuando un formulario debe enviar los valores y estos deben ser computados por por ejemplo el componente.
### :thinking: En cuanto a las imágenes de perfil de los usuarios, ¿es realmente posible modificar las imagenes de usuarios existentes en la base de datos? (Explique) Además, para efectos de esta tarea, ¿qué opción existirá para modificarlas al menos de manera visual? [1 Punto]
En teoría sería posible si guardamos una url de la imagen en alguna nube y lo invocamos cada vez que lo necesitemos, en el caso de la tarea servía ponerlo en el localstorage y como de igual forma el comportamiento era extraño, una solucion era "forzar hacer la url" de alguna forma en un formato apto o guadarlo de forma "especial".

### :adhesive_bandage: Explica la diferencia entre *props* y *state* dentro de un componente React. ¿En qué situaciones utilizarías cada uno? [1.5 Puntos]
Los *props* funcionan como argumentos que le pasamos al componente, mientras que *state* son variables y declaraciones de varibales que se utilizarán dentro del componente. Una situación directa es cuando creamos un componente para un app web que edite los datos de un usuario, el cual necesita que otro componente le entrege a este el id de usuario, por ejemplo, más funciones para facilitar el funcionamiento, también necesitaría tener sus variables internas, las cuales afectarían en la renderización de la página
