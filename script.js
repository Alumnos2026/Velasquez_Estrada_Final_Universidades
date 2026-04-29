
const sitioNombre   = "UniGT";             
const autorPagina   = "Examen Final - Meylin Velásquez Estrada";       
const totalCards    = 3;                      
const cargado       = false;                  
const valorNulo     = null;                   
let   datoExtra;                              

console.log("Sitio:", sitioNombre);
console.log("Autor:", autorPagina);
console.log("Total cards:", totalCards);
console.log("Cargado:", cargado);
console.log("Valor nulo:", valorNulo);
console.log("Dato extra:", datoExtra);

alert(`Bienvenido a ${sitioNombre} — ${autorPagina}\nExplora las universidades de Guatemala.`);


//  DATATABLES + API
const API_URL = "http://universities.hipolabs.com/search?country=Guatemala";

function cargarDesdeAPI() {
 

  fetch(API_URL)
    .then(respuesta => respuesta.json())
    .then(data => {

      console.log("Lista de universidades:", data);

     
      let filas = "";

      // Recorremos cada universidad de la lista
      data.forEach((universidad, indice) => {
        const numero = indice + 1;
        const id     = universidad.alpha_two_code || "N/A";
        const nombre = universidad.name;
        const pais   = universidad.country;
        const web    = universidad.web_pages && universidad.web_pages.length > 0
                       ? universidad.web_pages[0]
                       : "N/A";

        // Construimos una fila con 4 celdas
        filas += `
          <tr>
            <td>${numero}</td>
            <td>${id}</td>
            <td>${nombre}</td>
            <td>${pais}</td>
            <td><a href="${web}" target="_blank">${web}</a></td>
          </tr>
        `;
      });

    
      document.querySelector("#tablaUniversidades tbody").innerHTML = filas;

     
      
      $("#tablaUniversidades").DataTable({
        pageLength: 5,
        destroy: true,
        language: {
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ filas",
          info: "Mostrando _START_ a _END_ de _TOTAL_ filas",
          infoEmpty: "Sin datos",
          zeroRecords: "No hay coincidencias",
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
          }
        }
      });
    })
    .catch(function() {
      mensajeDinamico.textContent = "⚠️ No se pudo cargar la lista de universidades. Revisa tu conexión.";
      console.warn("API no disponible o error de CORS.");
    });
}


//  DOM 

const btnCargar = document.getElementById("btnCargar");
const mensajeDinamico = document.getElementById("mensajeDinamico");

btnCargar.addEventListener("click", function() {
  mensajeDinamico.textContent = "✅ 🎓 Universidades cargadas correctamente desde la API.";

  cargarDesdeAPI();

  const nuevoElem = document.createElement("div");
  nuevoElem.classList.add("elemento-dinamico", "mt-2", "text-dark");
  nuevoElem.innerHTML = `<i class='bi bi-info-circle me-2'></i>Se consultó: <strong>${API_URL}</strong>`;

  const contenedor = document.getElementById("inicio");
  contenedor.appendChild(nuevoElem);

  btnCargar.disabled = true;
  btnCargar.innerHTML = '<i class="bi bi-check-circle me-2"></i>Cargado';
});

// Cargar datos automáticamente al iniciar la página
cargarDesdeAPI();