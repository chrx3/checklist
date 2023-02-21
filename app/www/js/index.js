url = 'http://10.0.1.45:3000/tareas'

const botonget = document.getElementById("get");
botonget.addEventListener("click",(e) => {
    axios.get(url)

    .then(resp => {
        e.preventDefault
        for( i = 0 ; i < resp.data.length; i++){
            texto = JSON.stringify(resp.data[i]["TareaNombre"])
            const text = document.createElement("h4");
            text.innerText = texto
            document.getElementById('texto').appendChild(text);
        }
    });


});

const inputPOST = document.getElementById('inputpost');
const botonpost = document.getElementById("post");
botonpost.addEventListener("click",(e) => {
    const inpost = inputPOST.value;
    axios.post(url,{
        'TareaNombre':inpost
    })

    .then(resp => {
        e.preventDefault
        texto = JSON.stringify(resp.data)
        const text = document.createElement("h4");
        text.innerText = texto
        document.getElementById('texto').appendChild(text);
        console.log(resp.data)
    });

});

const inputPUT = document.getElementById('inputput');
const inputPUTID = document.getElementById('inputputid');
const botonput = document.getElementById("put");
botonput.addEventListener("click",(e) => {
    const inputid = inputPUTID.value;
    const input = inputPUT.value;
    axios.put(url,{
        'TareaId': inputid,
        'TareaNombre':input
    })

    .then(resp => {
        e.preventDefault
        texto = JSON.stringify(resp.data)
        const text = document.createElement("h4");
        text.innerText = texto
        document.getElementById('texto').appendChild(text);
        console.log(resp.data)
    });

});
const inputDEL = document.getElementById('inputdel');
const botondel = document.getElementById("delete");
botondel.addEventListener("click",(e) => {
    const inputdel = inputDEL.value;
    axios.delete(url+'/'+inputdel,{

    })

    .then(resp => {
        e.preventDefault
        texto = JSON.stringify(resp.data)
        const text = document.createElement("h4");
        text.innerText = texto
        document.getElementById('texto').appendChild(text);
        console.log(resp.data)
    });

});


