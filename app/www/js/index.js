url = 'http://10.0.1.45:3000/tareas'

// window.addEventListener("load", () => setTimeout(function(){
//     /* stuff */
// }, 3000));

//Mostrar
mostrar = (e)  => {
    axios.get(url)

    .then(resp => {
        contenedor = '';

        for( i = 0 ; i < resp.data.length; i++){
            nombre = resp.data[i]["TareaNombre"];
            id = JSON.stringify(resp.data[i]["TareaId"]);
            elstatus = resp.data[i]["Status"];
            timestamp = resp.data[i]["CreacionTarea"];
            actualizartime = resp.data[i]["ActualizacionTarea"];
            let formatoact = new Date(actualizartime)
            let formato = new Date(timestamp)
            let horasact = formatoact.getHours()+':'+formatoact.getMinutes() 
            let horas = formato.getHours()+':'+formato.getMinutes() 
            contenedor +="<div class='col-10'  id='tarea' > <strong id='nombre' onclick=estadoRealizado("+ id +")>"+ nombre +
            " </strong> <br/> <small id='status'>"
            + elstatus +" </small> <br/> <small id='horas'>"

            + horas + "<br/> </small>  </div> <div class='col-2' > " + 
            " <span > <img id='btneditar' data-toggle='modal' data-target='#modaleditar' class='img-fluid' onclick='editar("+ id +")' src='img/lapiz.png' > </span > <br/> </div>" 

            $('#contenedorTareas').html(contenedor)

        }
            
    });


};


estadoRealizado = (id) =>{
    axios.get('http://10.0.1.45:3000/getId',{
        params:{
            id_tarea: id
        }
    })
    .then((resp)=>{
        nombre = resp.data[0]["TareaNombre"]
        
    })
    console.log(nombre)
    axios.put(url, {
        TareaId: id,
        TareaNombre : nombre,
        Status : 'Realizada'
        
    }).then(res => {
        location.reload()
    }).catch(err =>{
        console.log(err)
    })
        
    
}




// //Publicar
const inputPOST = document.getElementById('inputpost');
const botonpost = document.getElementById("post");
botonpost.addEventListener("click",(e) => {
    const inpost = inputPOST.value;
    axios.post(url,{
        'TareaNombre':inpost
    })

    .then(resp => {
       
        location.reload()
        
        
    }).catch( (err) =>  {
        e.preventDefault
        const text = document.createElement("h4");
        text.innerText = 'error'
        document.getElementById('lista').appendChild(text);
    });

});

mostrar();

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
    axios.get('http://10.0.1.45:3000/getId',{
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