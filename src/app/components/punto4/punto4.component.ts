import { Component, OnInit ,ViewChild } from '@angular/core';
import { Palabra } from 'src/app/models/palabra';
import { PalabraService } from 'src/app/services/palabra.service';
/* import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; */
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-punto4',
  templateUrl: './punto4.component.html',
  styleUrls: ['./punto4.component.css']
})

export class Punto4Component implements OnInit {

  //alertas
  alertaSeleccion: boolean;

  palabra: Palabra;
  palabras: Array<Palabra>;
  
  tematica: string;
  iniciarOK: boolean; //activa el boton "iniciar juego"
  mostrarInputs: boolean;

  palabraActual: Array<any>;
  palabraArray: Array<any>;
  indice: number;
  vidas: number;
  puntaje: number;

  constructor(private palabraService: PalabraService,private toastr: ToastrService) { 
    this.palabraActual = new Array<string>();
    this.palabraArray = new Array<string>();
    this.palabra = new Palabra();
    this.palabras = new Array<Palabra>();
    this.indice = 0;
    this.vidas = 6;
    this.puntaje = 0;
    this.iniciarOK = true;
    this.alertaSeleccion = true;
    this.mostrarInputs = false;
  }

  ngOnInit(): void {
  }


  actualizarTematica(){
    this.refrescarPalabras();
    this.toastr.info("Banco de Palabras cargada","Info Juego");
    this.mostrarInputs = false;
    this.iniciarOK = false; this.alertaSeleccion = false;
  }

  //obtiene el array de palabras desde el service, y ordena al azar
  refrescarPalabras(){
    this.palabras = this.palabraService.obtenerPalabrasPorCategoria(this.tematica);
    this.palabraService.ordenarAlAzar(this.palabras);
  }

  iniciarJuego(){
    if(this.palabras.length == 0)
      this.iniciarOK = true;
    else{
      this.mostrarInputs = true;
      this.vidas = 6;
      this.puntaje = 0;
      this.indice = -1;
      this.toastr.info("Iniciemos!","Info Juego");
      this.cambiarIndice();
    }
  }

  //transforma la palabraIngles (en juego) a un array para poder recorrelo segun la cantidad de letras que posea
  cargarPalabra(palabra: Palabra){ 
    this.palabraArray = Array.from(palabra.palabraIngles);
    //inicializar la palabraActual
    this.palabraActual = new Array<Palabra>();
    for(var i=0; i < this.palabraArray.length ; i ++){
      this.palabraActual[i] = "";
    }
  }

  //activa el boton de perdio o gano para mostrar el modal de fin de juego
  public activarBoton(estado: string){
    if(estado == "perdio"){
      this.palabraArray = new Array<string>();
      this.palabraActual = new Array<string>();
      console.log("perdio");
      document.getElementById("modalBtnPerdio").click();
    }
    else{
      document.getElementById("modalBtn").click();
    }
  }

  /* public abrirModalGanado(contendio: any) {
      this.modalService.open(contendio);  
  } */

  //cada vez que acierte la palabra se  cambia a la siguiente
  cambiarIndice(){
    this.indice = this.indice + 1;
    if(this.indice > this.palabras.length -1){
      this.activarBoton("gano");
    }
    else
      this.cargarPalabra(this.palabras[this.indice]);
  }

  //determina si se cargaron todos los inputs y se determina si son iguales
  estanCargadasTodas(){
    var cargadas = true; var iguales = false;
    for(var i=0; i < this.palabraActual.length ; i++){
      if(this.palabraActual[i] == "")
        cargadas = false;
    }
    if(cargadas == true && JSON.stringify(this.palabraActual)==JSON.stringify(this.palabraArray))
      iguales = true;

    return iguales;
  }

  //comprueba si la letra ingresada es correcta
  comprobarLetra(i: number, palabra:Palabra){
    var comprobar = Array.from(palabra.palabraIngles);
    if(this.palabraActual[i] != ""){
      //se transforma a lowercase porque en el array del service la palabra esta en minuscula
      if(String(this.palabraActual[i].toLowerCase()) == String(comprobar[i].toLowerCase())){ 
        if( this.estanCargadasTodas() == true){
          this.puntaje ++;
          this.toastr.info("Pasamos a la siguiente","Info Juego");
          this.cambiarIndice();
        }
      }
      else{
        this.toastr.warning("Error *_* 1 vida menos","Info Juego");
        this.vidas --;
        if(this.vidas == 0){
          this.activarBoton("perdio");
        }
      }
    }
  }

}
