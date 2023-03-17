
// funcion anonima y arrow function
(() => {
    console.log("Entro a la funcion anonima!! turbo!!!");
    const BASE_URL = "https://animales-api.onrender.com";
    const myChart = document.getElementById('myChart').getContext('2d');
    const tblAnimales = document.getElementById('tblAnimales');
    // Esto son inputs de texto/number
    const txtNombre = document.getElementById("txtNombre");
    const txtCantidad = document.getElementById("txtCantidad");
    const txtId = document.getElementById("txtId");
    // Esto son los botones
    const btnAgregar = document.getElementById("btnAgregar");
    const btnEditar = document.getElementById("btnEditar");
    const btnEliminar = document.getElementById("btnEliminar");


    btnAgregar.addEventListener("click", ()=> {
        console.log(txtNombre.value);
        console.log(txtCantidad.value);

        let nombre = txtNombre.value;
        let cantidad = txtCantidad.value;
        fetch(BASE_URL + "/animales",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: nombre,
                cantidad: cantidad
            })
        })
        .then(response => response.json())
        .then(response => {
            // refresh de los datos
            document.location.reload();
        })
        .catch(error => console.log(error))

        console.log("Entro a agregar");
    });

    btnEditar.addEventListener("click", ()=> {
        console.log(txtId.value);
        console.log(txtNombre.value);
        console.log(txtCantidad.value);
        let id = txtId.value;
        let objectRequest = {
            nombre: txtNombre.value,
            cantidad: txtCantidad.value
        };
        fetch(BASE_URL + "/animales/" + id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectRequest)
        })
        .then(response => response.json())
        .then(response => {
            // refresh de los datos
            document.location.reload();
        })
        .catch(error => console.log(error))
        console.log("Entro a editar");
    });

    btnEliminar.addEventListener("click", ()=> {
        console.log("Entro a elimnar");
    });




    const loadData = () => {
        fetch(BASE_URL + "/animales",
            {
                method: "GET"
            })
            .then(response => response.json())
            .then(response => {
                console.log(response.data)
                // Esto se realizo para terner el arreglo de string
                let labels_for_chart = response.data.map((item) => {
                    return item.nombre.toUpperCase();
                });
                // Esto se realizo para obtener el arreglo de numeros
                let data_for_chart = response.data.map((item) => {
                    return item.cantidad;
                });
                // Agregando datos a la grafica
                const grafica = new Chart(myChart, {
                    type: 'bar',
                    data: {
                        labels: labels_for_chart,
                        datasets: [{
                            label: 'Animales del zoologico',
                            data: data_for_chart,
                            fill: true,
                            backgroundColor: '#00008B',
                            borderColor: '#00008B'
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                // Agregado datos a la tabla
                tblAnimales.innerHTML = ""; // Esto inicia limpia la tabla.
                for (const animal of response.data) {
                    // <tr>.....</tr>
                    let tr = `<tr>
                        <td>${animal.id}</td>
                        <td>${animal.nombre.toUpperCase()}</td>
                        <td>${animal.cantidad}</td>
                    </tr>
                    `;
                    tblAnimales.innerHTML += tr;
                    // tblAnimales.innerHTML = tblAnimales.innerHTML + tr;
                }

            })
            .catch(error => console.log(error))
    }

    loadData();
})()
