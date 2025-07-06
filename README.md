# Proyecto DCChimesitos :construction:

* :pencil2: **Nombre:** Osiris Díaz
* :pencil2: **Correo:** ozdiaz@uc.cl

* Fue un proyecto de una Tarea del ramo IIC2513 el cual constaba de realizar uan red social
* Se realizó frontend y consultas a la api https://dummyjson.com/ por medio de ``axios``, por lo que ninguna consuta de ``POST``, ``PATCH`` y ``DELETE`` se guarda en una base de datos real.
* Se utilizó ``React`` de ``javascript`` y ``axios`` para este proyecto

## Código :symbols:

### :computer: Cómo ejecutar este código

```bash
yarn
yarn dev
```

### :teacher: Explicación del funcionamiento del código
- Se utilizó ``axios`` para las request, y el modo de uso es por medio de try catch , para tomar posibles errores
- Respecto al cómo se uso ``react`` y los ``hooks de react``, se usarón los hooks para poder tomar los valores entregados por los formularios, ver algunas validaciones y hacer acciones que impliquen un cambio de la página, como la carga de los posts, en el lado de react, se uso para invocar componentes y dar html básico con forma.
- En general el código no posee problemas y cumple con todo, además que se manejan errores en caso de que algo no exista en la api (como los post creados por uno)
- Por otro lado, se guardan los datos como user y posts en ``localstorage``, utilizando los datos de los endpoints pedidos, esto se puede observar por código o al revisar la consola de inspeccionar la página 
- ``EditPost`` se puede realizar en post creados por uno mismo, y se hace manejando el error de la Api, pues dentro de ella, realmente el post no existe, y por ello, también internamente se lleva un conteo de IDs para darle a cada nuevo post un id único y así también poder elimnarlo.
- Cuando se sale y se vuelve a ingresar a la página de posts, se pierden los posts creados por uno mismo, pues cada vez que se habre esta página, se vuelven a buscar los post de la Api, pero el resto funciona perfectamente.
- La página se tarda 1 segundo 0 1.5 seg en cargar algunas cositas y dar algunos pop up (como el de que se pudo editar correctamente el post), pero si los hace.
