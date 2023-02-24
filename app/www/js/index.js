url = 'http://192.168.100.24:8000/tareas'

// window.addEventListener("load", () => setTimeout(function(){
//     /* stuff */
// }, 3000));

//Mostrar
const mostrar = () => {
    axios.get(url)
    .then(resp => {
        let contenedor = '';
        for (let i = 0; i < resp.data.length; i++) {
            const tarea = resp.data[i];
            const nombre = tarea["TareaNombre"];
            const id = JSON.stringify(tarea["TareaId"]);
            const elstatus = tarea["Status"];
            const timestamp = new Date(tarea["CreacionTarea"]).toLocaleTimeString();
            if (elstatus == "Por hacer") {
                contenedor += `<div class='col-9' id='tarea' >
                <div onclick="cambiarEstado(${id}, '${nombre}', '${elstatus}')">
                    <strong id='nombre'>${nombre}</strong> <br/>
                    <small id='status'>${elstatus}</small> <br/>
                    <small id='horas'>${timestamp}<br/></small>
                </div>
                    
                    <button id='alarma' onclick="alarma1m(${id}, '${nombre}', '${elstatus}')"> Alarma de 1 minuto <br/></button>
                </div>
                <div id='tarea' class='col-3'>
                    <span>
                        <img id='btneditar' data-toggle='modal' onclick=editar(${id}) data-target='#modaleditar' class='img-fluid' src='img/lapiz.png'>
                    </span><br/>
                </div>`;
            }
        }
        $('#contenedorTareas').html(contenedor);
    });
};

const mostrarHistorial = () => {
    axios.get(url)
    .then(resp => {
        let contenedor = '';
        for (let i = 0; i < resp.data.length; i++) {
            const tarea = resp.data[i];
            const nombre = tarea["TareaNombre"];
            const id = JSON.stringify(tarea["TareaId"]);
            const elstatus = tarea["Status"];
            const timestamp = new Date(tarea["ActualizacionTarea"]).toLocaleTimeString();
            if (elstatus == "Realizada" || elstatus == "No Realizada") {
                contenedor += `<div class='col-9' id='tarea' onclick="cambiarEstado(${id}, '${nombre}', '${elstatus}')">
                    <strong id='nombre'>${nombre}</strong> <br/>
                    <small id='status'>${elstatus}</small> <br/>
                    <small id='horas'> A las: ${timestamp}<br/></small>
                    
                </div>
                <div id='tarea' class='col-3'>
                    <span>
                        <img id='btneditar' data-toggle='modal' onclick=eliminar(${id}) class='img-fluid' src='img/basura.png'>
                    </span><br/>
                </div>`;
            }
        }
        $('#contenedorTareas').html(contenedor);
    });
};
const cambiarEstado = (id, nombre, elstatus) => {
    const nuevoStatus = elstatus === "Realizada" ? "Por hacer" : "Realizada";
    axios.put(`${url}`, {
        TareaId: id,
        TareaNombre: nombre,
        Status: nuevoStatus
    })
    .then(resp => {
        console.log(resp.data);
        location.reload()
     // actualiza las tareas mostradas
    })
    .catch(error => {
        console.log(error);
    });
}

alarma1m = (id, nombre, elstatus) =>{
    let tiempoRestante = 0.1 * 60; // 15 minutos en segundos

    const contador = setInterval(() => {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        console.log('empieza el tiempo')
        
        if (tiempoRestante === 0) {
            clearInterval(contador); // detiene el contador cuando se llega a cero
            alert('Tienes una tarea pendiente')
            alert('La tarea vencerá en un minuto')
            let tiempoRestante2 = 0.1 * 60; // 15 minutos en segundos
        
                const contador2 = setInterval(() => {
                    const minutos2 = Math.floor(tiempoRestante2 / 60);
                    const segundos2 = tiempoRestante2 % 60;
                    
                    console.log('tiempo')
                    if (tiempoRestante2 === 0) {
                        const nuevoStatus = elstatus = "No Realizada";
                        axios.put(`${url}`, {
                            TareaId: id,
                            TareaNombre: nombre,
                            Status: nuevoStatus
                        })
                        .then(resp => {
                            
                            location.reload()
                        })
                        .catch(error => {
                            console.log(error);
                        });

                    }else {
                        tiempoRestante2--;
                    }
                    
                    // actualiza las tareas mostradas
                }, 1000); // llama a la función cada segundo (1000 ms)
            
        } else {
            tiempoRestante--;
        }
    }, 1000); // llama a la función cada segundo (1000 ms)
} // aquí se cierra la función alarma1m



// estadoRealizado = (id) =>{
//     axios.get('http://192.168.100.24:8000/getId',{
//         params:{
//             id_tarea: id
//         }
//     })
//     .then((resp)=>{
//         nombre = resp.data[0]["TareaNombre"]
        
//     })
//     console.log(nombre)
//     axios.put(url, {
//         TareaId: id,
//         TareaNombre : nombre,
//         Status : 'Realizada'
        
//     }).then(res => {
//         location.reload()
//     }).catch(err =>{
//         console.log(err)
//     })
        
    
// }




// //Publicar
const inputPOST = document.getElementById('inputpost');
const botonpost = document.getElementById("post");
botonpost.addEventListener("click",(e) => {
    const inpost = inputPOST.value;
    axios.post(url,{
        'TareaNombre':inpost
    })

    .then(resp => {
       if(!inpost){
        e.preventDefault();
        mensaje = 'Ingrese un valor porfavor'
        document.getElementById('validador').innerText = mensaje
       }else{
        location.reload()
       }
        
        
        
    }).catch( (err) =>  {
        e.preventDefault
        const text = document.createElement("h4");
        text.innerText = 'error'
        document.getElementById('lista').appendChild(text);
    });

});

function eliminar(id){
    axios.delete(url+'/'+id,{

    }).then(resp => {
        // e.preventDefault();
         location.reload();
        // mostrar();
    }).catch( (err) =>  {
        // e.preventDefault();
        const text = document.createElement("h4");
        text.innerText = err
        document.getElementById('lista').appendChild(text);
    }).catch( err =>  {
            const text = document.createElement("h4");
            text.innerText = err
            document.getElementById('lista').appendChild(text);})
}

function editar(id){
    axios.get('http://192.168.100.24:8000/getId',{
        params:{
            id_tarea: id
        }
    })
    .then((resp)=>{
        const nombre = resp.data[0]["TareaNombre"]
        document.getElementById('inputput').value = nombre
    })
    const btneditar = document.getElementById('editar')
    const inputeditar = document.getElementById('inputput')
    btneditar.addEventListener("click", ()=>{
        axios.put(url, {
            TareaId: id,
            TareaNombre : inputeditar.value
            
        }).then(res => {
            if(inputeditar.value == ''){
                console.log('fallo')
            }else{
                console.log(inputeditar.value)
                location.reload();
                
            }
        }).catch(err =>{
            console.log(err)
        })
        
    })
    
}





//EDITAR
// const botoneditar = document.getElementById('put');
// const inputeditar = document.getElementById('inputput');
// const titulotarea = document.getElementById('nombre')
// // console.log(inputeditar);
// console.log(titulotarea);
// inputeditar.value = titulotarea.value;
// botonput.addEventListener("click",(e) => {
//     const inputid = inputPUTID.value;
//     const input = inputPUT.value;
//     axios.put(url,{
//         'TareaId': inputid,
//         'TareaNombre':input
//     })

//     .then(resp => {
//         e.preventDefault
//         texto = JSON.stringify(resp.data)
//         const text = document.createElement("h4");
//         text.innerText = texto
//         document.getElementById('lista').appendChild(text);
//         console.log(resp.data)
//     }).catch( (err) =>  {
//         e.preventDefault
//         const text = document.createElement("h4");
//         text.innerText = 'error'
//         document.getElementById('lista').appendChild(text);
//     });

// });


// texto
            // const textid = document.createElement('p');
            // textid.setAttribute('id', id)
            // textid.innerText = id
            // document.getElementById('lista').appendChild(textid);

            // const text = document.createElement("h4");
            // text.setAttribute('id','nombre')
            // text.innerText =nombre
            // document.getElementById('lista').appendChild(text);
            
            // //abrir editar
            // const btneditar = document.createElement("button")
            // btneditar.setAttribute('data-toggle',"modal")
            // btneditar.setAttribute('data-target','#editar')
            // btneditar.setAttribute('id',id)
            // btneditar.innerText = 'editar'
            // document.getElementById('lista').appendChild(btneditar);

            // //boton eliminar
            // const botondel = document.createElement("button");
            // botondel.setAttribute("id","delete")
            // botondel.innerText = 'delete'
            // botondel.value = id
            // document.getElementById('lista').appendChild(botondel);
            
            
            
            

        
    //     const botoneditar = document.getElementById('put');
    //     const inputeditar = document.getElementById('inputput');
    //     const titulotarea = document.getElementById('nombre')
    //     // console.log(inputeditar);
    //     console.log(titulotarea);
        
        
       
        
    //     btnDEL = document.getElementById('delete')
    //     btnDEL.addEventListener("click",(e) => {
    //         const btndel = btnDEL.value;
    //         axios.delete(url+'/'+btndel,{

    //         })

    //         .then(resp => {
    //             e.preventDefault();
    //             location.reload();
    //             // mostrar();
    //         }).catch( (err) =>  {
    //             e.preventDefault();
    //             const text = document.createElement("h4");
    //             text.innerText = err
    //             document.getElementById('lista').appendChild(text);
    //         });

    //     });
    // }).catch( err =>  {
    //     const text = document.createElement("h4");
    //     text.innerText = err
    //     document.getElementById('lista').appendChild(text);