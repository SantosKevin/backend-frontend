import { Injectable } from '@angular/core';
import { Palabra } from '../models/palabra';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {

  palabras: Array<any>;

  constructor() { 
    this.palabras = new Array<Palabra>();
    
    this.palabras = [
      {
        palabraIngles: "lion",
        palabraEspaniol: "leon",
        urlImagen: "../../../assets/img/animalLeon.jpg",
        categoria: "animales",
      },
      {
        palabraIngles: "elephant",
        palabraEspaniol: "elefante",
        urlImagen: "../../../assets/img/animalElefante.jpg",
        categoria: "animales",
      },
      {
        palabraIngles: "parrot",
        palabraEspaniol: "loro",
        urlImagen: "../../../assets/img/animalLoro.jpg",
        categoria: "animales",
      },
      {
        palabraIngles: "tiger",
        palabraEspaniol: "tigre",
        urlImagen: "../../../assets/img/animalTigre.jpg",
        categoria: "animales",
      },
      {
        palabraIngles: "crab",
        palabraEspaniol: "cangrejo",
        urlImagen: "../../../assets/img/animalCangrejo.jpg",
        categoria: "animales",
      },
      {
        palabraIngles: "octopus",
        palabraEspaniol: "pulpo",
        urlImagen: "../../../assets/img/animalPulpo.jpg",
        categoria: "animales",
      },
      /*{
        palabraIngles: "giraffe",
        palabraEspaniol: "jirafa",
        urlImagen: "../../../assets/img/animalJirafa.jpg",
        categoria: "animales",
      },
      {
        palabraIngles: "dog",
        palabraEspaniol: "perro",
        urlImagen: "../../../assets/img/animalPerro.jpg",
        categoria: "animales",
      }, */
      {
        palabraIngles: "crayon",
        palabraEspaniol: "crayon",
        urlImagen: "../../../assets/img/utiles/utilCrayon.jpg",
        categoria: "utiles",
      },
      {
        palabraIngles: "squad",
        palabraEspaniol: "escuadra",
        urlImagen: "../../../assets/img/utiles/utilEscuadra.jpg",
         categoria: "utiles",
      },
      {
        palabraIngles: "eraser",
        palabraEspaniol: "goma",
        urlImagen: "../../../assets/img/utiles/utilGoma.jpg",
         categoria: "utiles",
      },
      {
        palabraIngles: "pen",
        palabraEspaniol: "lapicera",
        urlImagen: "../../../assets/img/utiles/utilLapicera.jpg",
         categoria: "utiles",
      },
      {
        palabraIngles: "rule",
        palabraEspaniol: "regla",
        urlImagen: "../../../assets/img/utiles/utilRegla.jpg",
         categoria: "utiles",
      },
      {
        palabraIngles: "scissors",
        palabraEspaniol: "tijera",
        urlImagen: "../../../assets/img/utiles/utilTijera.jpeg",
         categoria: "utiles",
      }]
      //10 palabras por cada categoria, para la prueba solo utilizamos 6 de cada una
      /* {
        palabraIngles: "cat",
        palabraEspaniol: "gato",
        urlImagen: "../../../assets/img/animalGato.jpg",
        categoria: "animales",
      },
    {
      palabraIngles: "pencil",
      palabraEspaniol: "lapiz",
      urlImagen: "../../../assets/img/utiles/utilLapiz.jpg",
       categoria: "utiles",
    },
    {
      palabraIngles: "marker",
      palabraEspaniol: "marcador",
      urlImagen: "../../../assets/img/utiles/utilMarcador.jpg",
       categoria: "utiles",
    },
    {
      palabraIngles: "plastic",
      palabraEspaniol: "plasticola",
      urlImagen: "../../../assets/img/utiles/utilPlasticola.png",
       categoria: "utiles",
    },
    {
      palabraIngles: "clay",
      palabraEspaniol: "plastilina",
      urlImagen: "../../../assets/img/utiles/utilPlastilina.jpg",
       categoria: "utiles",
    }] */
  
  }

  obtenerPalabras(){
    return this.palabras;
  }


  obtenerPalabrasPorCategoria(categoria: string){
    var retorno = new Array<Palabra>();
    for(var i= 0; i < this.palabras.length ; i++){
      if(this.palabras[i].categoria == categoria)
        retorno.push(this.palabras[i]);
    }
    return retorno;
  }

  ordenarAlAzar(array: Array<Palabra>){
    var m = array.length,t, i; 
    // mientras halla elementos
    while (m) { 
      // elegir un elemento restante
      i = Math.floor(Math.random() * m--); 
      // e intercambiarlo
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
}
