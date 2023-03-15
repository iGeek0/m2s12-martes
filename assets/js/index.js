
// funcion anonima y arrow function
(() => {
    console.log("Entro a la funcion anonima!! turbo!!!");
    const BASE_URL = "https://animales-api.onrender.com";
    const myChart = document.getElementById('myChart').getContext('2d');
    const tblAnimales = document.getElementById('tblAnimales');




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
                    return item.nombre;
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
                        <td>${animal.nombre}</td>
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
