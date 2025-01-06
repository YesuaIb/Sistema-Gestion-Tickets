var hoy = new Date();
var dineroPorCompra = [];
var conciertoPorDefecto = [[" ", " ", " ", "url(Multimedia/prox.jpg)",0]]
// Array bidimensional que guarda información de cada cartel
var conciertos = [
  ["JCReyes", "Es Gremi", "28/12/2025", "url(Multimedia/jcreyes.jpg)",149,150],
  ["Melendi", "Es Gremi", "29/10/2025", "url(Multimedia/melendi.jpg)",0,150],
  ["El Drogas", "Es Gremi", "30/07/2025", "url(Multimedia/eldrogas.jpg)",0,150],
  ["Alvama Ice", "Es Gremi", "31/09/2025", "url(Multimedia/alvamaice.jpg)",0,150],
];

// Numero de fila para acceder a ellas
var fil = 0;
// Numero de columnas para acceder a ellas
var col = 0;
// Numero de elemento para acceder a ellos
var indice = 1;
// Contador de elementos card
var countElem = 0;

function adminMenu() {
  let user = prompt("Introduce el usuario:");
  let pass = prompt("Introduce la contraseña:");
  let elementos = document.getElementsByClassName("adm");
  if (user == "admin" && pass == 1234) {
    for (let i = 0; i < elementos.length; i++) {
      elementos[i].style.display = "inline";
    }

  }
}

// Funcion para contar los carteles de la página
contarElementos();
function contarElementos() {
  let elementos = document.getElementsByTagName("h1");

  for (let i = 0; i < elementos.length; i++) {
    if (elementos[i].id.startsWith("art")) {
      countElem++;
    }
  }
  return countElem;
}

// Condicional para llamar a una funcion o otra
reload();
function reload() {
  if (conciertos.length > 1) {
    loadArtistas();
  } else if (conciertos.length < countElem) {
    comingSoon();
  }
}

// Funcion para llenar los elementos vacios / borrados por un predefinido

function comingSoon() {
  let artistas = "art" + indice;
  let salas = "sal" + indice;
  let fechas = "fch" + indice;
  let post = "c" + indice;
  let temp = "tmp" + indice;
  fil = 0;
  document.getElementById(artistas).innerHTML = " ";

  document.getElementById(salas).innerHTML = " ";

  document.getElementById(fechas).innerHTML = " ";

  document.getElementById(temp).innerHTML = " ";

  document.getElementById(post).style.backgroundImage =
    "url(Multimedia/prox.jpg)";
  if (indice < countElem) {
    fil = 0;
    indice++;
    comingSoon();
  }

}

loadOptions();
function loadOptions(){
  document.getElementById("optionArtista").innerHTML = "";
  for(let i = 0; i < conciertos.length; i++){
      document.getElementById("optionArtista").innerHTML += "<option id='op'>" +conciertos[i][0]+" " +conciertos[i][2]+ " - Tickets Restantes: "+ conciertos[i][4] +"/"+conciertos[i][5]+"</option>"
  }
}

// Funcion para cargar los carteles almacenados en el array

function loadArtistas() {
  let artistas = "art" + indice;
  let salas = "sal" + indice;
  let fechas = "fch" + indice;
  let temporada = "tmp" + indice;
  let post = "c" + indice;

  document.getElementById(artistas).innerHTML = conciertos[col][fil++];

  document.getElementById(salas).innerHTML = conciertos[col][fil++];

  if(conciertos[col].ident == undefined || conciertos[col].ident != indice){
    conciertos[col].ident = indice;
    
  }

  fechasStr(conciertos[col][fil++], fechas, temporada,col); // --> Date

  document.getElementById(post).style.backgroundImage = conciertos[col][fil++];



  col++;
  if (col < conciertos.length) {
    fil = 0;
    indice++;
    loadArtistas();
  }
  loadOptions();
  indice = 1;
}



// Abrir menu admin
function addMenu(){
  let form =document.getElementById("formContainer");
  form.style.display = "block";
}
// Cerrar menu admin
function rmMenu(){
  let form =document.getElementById("formContainer");
  event.preventDefault(); // Previene la recarga de la página
  form.style.display = "none";
}

// Añadir Artista
function addConcierto() {

  let name = document.getElementById("name").value;
  let sala = document.getElementById("sala").value;
  let fecha = new Date(document.getElementById("fecha").value).toLocaleDateString('es-ES');
  let tickets = document.getElementById("ltickets").value;
  let foto = "url(Multimedia/" + document.getElementById("foto").value + ".jpg)";


  // Si hay elementos vacios hace un push sinos no introduce la información
  if (elementosVacios()) {
      conciertos.push([name, sala, fecha, foto, 0, tickets]); // Añadir al final si no se eliminó ningún elemento
  }
  fil = 0;
  col = 0;
  indice = 1;
  loadArtistas();
  loadOptions();
}

// Borrar Artista
function rmConcierto() {
  let identificador = parseInt(prompt("ID:"));
  for (let j = 0; j < conciertos.length; j++) {
    if (conciertos[j].ident == identificador) {
      conciertos.splice(j, 1);
      // Busca los elementos vacios y llama a commingSoon
      if (elementosVacios()) {
        comingSoon();
      }
      fil = 0;
      col = 0;
      indice = 1;
      loadArtistas();
      loadOptions();
      return; // Salir de la función después de eliminar la fila
    }
  }
}

// Miramos que elementos estan vacios y devolvemos un true por cada elemento que encuentra (Esto nos sirve para llenar los vacios por CommingSoon)

function elementosVacios() {
  let elementos = document.getElementsByTagName("h1");
  for (let i = 0; i < elementos.length; i++) {
    if (elementos[i].id.startsWith("art") && elementos[i].textContent.trim() === '') {

      return true;
    }
  }
  return false;
}


//DATE
function fechasStr(fechaArray, indiceFecha, indicetemp,columna) {

  let fecha = construirFecha(fechaArray); //retorna la fecha  para trabajar con date
  document.getElementById(indicetemp).innerText = temporada(fecha);
  document.getElementById(indiceFecha).innerText = frase(fecha);
  
}


//Constructor de la fecha

function construirFecha(date) {
  let dia = parseInt((date.split("/"))[0]);
  let mes = parseInt((date.split("/"))[1]);
  let año = parseInt((date.split("/"))[2]);

  mes -= 1;

  let concierto = new Date(año, mes, dia);

  return concierto;
  
}

//toString

function frase(concierto) {

  let mes = concierto.getMonth();

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return concierto.getDate() + " " + meses[mes] + " " + concierto.getFullYear();
}

//Temporada del concierto

function temporada(concierto) {
  let mes = concierto.getMonth();
  let dia = concierto.getDate();
  if (mes + 1 == 12 && dia >= 21 || mes + 1 == 1 || mes + 1 == 2 || mes + 1 == 3 && dia <= 20) {
    return "Invierno";
  } else if (mes + 1 == 3 && dia >= 21 || mes + 1 == 4 || mes + 1 == 5 || mes + 1 == 6 && dia <= 20) {
    return "Primavera";
  } else if (mes + 1 == 6 && dia >= 21 || mes + 1 == 7 || mes + 1 == 8 || mes + 1 == 9 && dia <= 22) {
    return "Verano";
  } else {
    return "Otoño";
  }
}



//funcion:avisa cuando compras un ticket cuantos dias le quedan al concierto comprado.

function compararTiempoConDescuento(today, limite, tickets, artista) {
  let diasrestantes = 0;
  let fechaAux = new Date(today);

  let dia = parseInt((limite.split("/"))[0]);
  let mes = parseInt((limite.split("/"))[1]);
  let año = parseInt((limite.split("/"))[2]);

  mes -= 1;

  let fechaConcierto = new Date(año, mes, dia);

  while (fechaAux < fechaConcierto) {
    fechaAux.setDate(fechaAux.getDate() + 1);
    diasrestantes++;
  }
  //Calculamos  el coste de todos lo ticket y creamos las variables auxiliares.
  let coste = Math.imul(tickets, 30);
  let descuento, preciofinal;
  /*
  
  Añadimos lo ganda por esa venta, los indices seran ident y detalle.
  Cuanto más tiempo falte mayor sera el descuento.
  
  */
  if (diasrestantes <= 30) {
    dineroPorCompra.push({
      concierto: conciertos[artista][0] + "-" + conciertos[artista][2],
      ident: conciertos[artista].ident,
      detalle: tickets + " Entradas" + " => " + (tickets * 30) + "€"
    });
  } else if (diasrestantes > 30 && diasrestantes <= 90) {

    //decuento 10%

    descuento = coste * 0.10;
    preciofinal = coste - descuento;
    dineroPorCompra.push({
      concierto: conciertos[artista][0] + "-" + conciertos[artista][2],
      ident: conciertos[artista].ident,
      detalle: tickets + " Entradas" + " => " + preciofinal + "€"
    });
  } else {

    //decuento 15%

    descuento = coste * 0.15;
    preciofinal = coste - descuento;

    dineroPorCompra.push({
      concierto: conciertos[artista][0] + "-" + conciertos[artista][2],
      ident: conciertos[artista].ident,
      detalle: tickets + " Entradas" + " => " + preciofinal + "€"
    });
  }

  alert("Faltan " + diasrestantes + " dias para el concierto de " + conciertos[artista][0] + " " + conciertos[artista][2]);
}


function contarTickets(){
  event.preventDefault(); // Previene la recarga de la página
  // Captar numero de tickets
  let numtickets = parseInt(document.getElementById("tic").value);
  // Captar la información del select HTML
  let nombreArtista = document.getElementById("optionArtista").value;
  // Separar el nombre del artista y la fecha para guardarla en un array
  let splitter = nombreArtista.split(/(\d{1,2}\/\d{1,2}\/\d{4})/);
  // Guardar nombre artista sin espacios en una variable
  let artistaSplit = splitter[0].trim();
  // Guardar fecha en una variable
  let fechaSplit = splitter[1];
  // Capturamos los elementos del html para mostrar mensajes
  let soldout = document.getElementById("full");
  let nticks = document.getElementById("nticks");

  // Condicional para la comprobación de compra de tickets inferior a 0 y mayor a 5
  if(numtickets <= 5 && numtickets > 0){
    // Aplicamos display none para que no aparezcan los mensajes
    soldout.style.display= "none";
    nticks.style.display = "none";
  // For para recorrer todos los elementos del array
  for (let i = 0; i < conciertos.length; i++) {

    // Condicional para comprobar que el nombre sea igual que el del array y la fecha
    if (artistaSplit == conciertos[i][0] && fechaSplit == conciertos[i][2]) {


      if(((conciertos[i][4]+numtickets) <= 150)){
      // Suma de los tickets a la posicion donde se encuentran
      conciertos[i][4] += Number.parseInt(numtickets);
      //enviamos la fecha de hoy junto a la del concierto.
      compararTiempoConDescuento(hoy, fechaSplit, numtickets, i);

      
      //Recarga la lista de opciones
      loadOptions();

      }else if(conciertos[i][4] == 150){
        soldout.innerHTML = "¡El concierto de "+ conciertos[i][0]+ " el " +conciertos[i][2] +" esta todo vendido!";
        soldout.style.display= "block";

       }else if((conciertos[i][4] + numtickets) > 150){
        soldout.innerHTML = "Solo queda disponible: " + parseInt((conciertos[i][5] - conciertos[i][4]))+" entrada";
        soldout.style.display= "block";
      }

    }
  }
}else if (numtickets > 5){
  nticks.style.display = "block";
}else if(numtickets <= 0 || isNaN(numtickets)){
  soldout.innerHTML = "Introduce un número correcto";
  soldout.style.display= "block";
}

}




//calcula el total de todos los ingresos de un concierto.

function calcularTotal() {
  // Introducimos el ID del cartel "Numero de la posicion del cartel" empezando desde 1
  let id = Number.parseInt(prompt("Introduce el ID del cartel:"));
  let total = 0;
  let ticketsVendidos = 0
  let gastosGestion = 0;
  for (let i = 0; i < conciertos.length; i++) {
    // Comprobamos que el id pasado por prompt sea el mismo que el que esta en el array
    if (conciertos[i].ident == id) {
      ticketsVendidos = conciertos[i][4];
      break;
    }
  }

  gastosGestion = ticketsVendidos * 0.9;
  //multiplicacion con el metodo imul de math
  total = Math.imul(ticketsVendidos, 30) + gastosGestion;

  let ingresoPromedio = calcularIngresoPorAsistente(total, ticketsVendidos);
  
  let ingresoSala = Math.floor(total * 0.70);
  let ingresoArtista = Math.floor(total - ingresoSala);
  alert("Las ganancias son de un total: " + total + "€. La sala se lleva: " + ingresoSala +"€ y el artista: " + ingresoArtista + "€. El ingreso promedio por asistente es: " + ingresoPromedio + "€.");
}

// Calcular promedio de ingresos por asistente
function calcularIngresoPorAsistente(total, asistentes) {
  if (asistentes > 0) {
    let ingresoPorAsistente = (total / asistentes).toFixed(2);
    return ingresoPorAsistente; // Retorna el ingreso promedio por asistente
  } else {
    return 0.00; 
  }
}

// fucion para sacar por pantalla todo el historial de ventas

function mostrarHistorialVentas() {
  alert("Se mostrara el historial por consola.");
  console.log(dineroPorCompra);
}

// borra en el historial todas las ventas de una ID en concreto

function borrarHistorialVentas() {
  let id = Number.parseInt(prompt("Introduce el ID del cartel:"));
  for (let i = dineroPorCompra.length - 1; i >= 0; i--) {
    if (id == dineroPorCompra[i].ident) {
      dineroPorCompra.splice(i, 1);
    }
  }
  console.log(dineroPorCompra);
}