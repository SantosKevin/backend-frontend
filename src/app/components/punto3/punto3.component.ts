import { Component, OnInit } from '@angular/core';
import { Pasaje } from 'src/app/models/pasaje';
import { PasajeService } from 'src/app/services/pasaje.service';
import { ResumenPunto3 } from 'src/app/models/resumen-punto3';
import { ToastrService } from 'ngx-toastr';
import { Adelanto } from 'src/app/models/adelanto';

@Component({
  selector: 'app-punto3',
  templateUrl: './punto3.component.html',
  styleUrls: ['./punto3.component.css']
})

export class Punto3Component implements OnInit {

  adelanto: Adelanto;
  adelantosPorPasaje: Array<Adelanto>;
  pasajeBorrar: Pasaje;
  pasaje: Pasaje;
  pasajes: Array<Pasaje>;

  categorias:string[];
  mostrarPrecio: boolean = false;
  precioFinal: number;

  btnGuardar: boolean = true;
  btnModificar: boolean = false;
  btnGuardarAdelanto: boolean = true;
  btnModificarAdelanto: boolean = false;
  precioCorrecto: boolean = true; //esta variable es para verificar que los montos no excedan los precios
  //este objeto es para rellenar la tabla resumen
  resumen: Array<ResumenPunto3>;

  constructor(private pasajeService: PasajeService, private toastr: ToastrService) { 
    this.resumen = new Array<ResumenPunto3>();
    this.pasaje = new Pasaje();
    this.pasaje.adelantos = new Array<Adelanto>();
    this.pasajes = new Array<Pasaje>();
    this.adelantosPorPasaje = new Array<Adelanto>();
    this.adelanto = new Adelanto();
    this.pasajeBorrar = new Pasaje();
    this.refrescarPasajes();
  }

  ngOnInit(): void {
    this.categorias = this.pasajeService.obtenerCategorias();
    this.establecerValorDefectoSelect();
  }

  establecerValorDefectoSelect(){
    //valor por defecto en el select
    this.pasaje.categoriaPasajero = "Adulto";
  }

  //reestablece el valor de las variables
  limpiar(){
    this.toastr.info("Limpiado","Info Pasaje");
    this.pasaje = new Pasaje();
    this.pasaje.adelantos = new Array<Adelanto>();
    this.precioFinal = 0;
    this.mostrarPrecio = false;
    this.btnModificar = false; this.btnGuardar = true;
    this.precioCorrecto = true;
    this.establecerValorDefectoSelect();
  }

  agregarPasaje(){
    this.pasaje.fechaCompra = new Date();
    this.pasaje.precioPasaje = this.precioFinal;
    this.pasajeService.addPasaje(this.pasaje).subscribe(
      (result)=>{
        this.toastr.info("Agregado","Info Pasajes");
        this.refrescarPasajes();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.pasaje = new Pasaje();
    this.pasaje.adelantos = new Array<Adelanto>();
    this.mostrarPrecio = false;
    this.adelanto = new Adelanto();
    this.establecerValorDefectoSelect();
  }

  //obtiene la lista de pasajes desde el service
  refrescarPasajes(){
    this.pasajes = new Array<Pasaje>();
    this.pasajeService.getPasajes().subscribe(
      (result)=>{
        var psj: Pasaje = new Pasaje();
        result.forEach(element => {
          Object.assign(psj, element);
          this.pasajes.push(psj);
          psj = new Pasaje();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  //se selecciona un pasaje del array y lo carga en el formulario para edicion
  seleccionar(pasaje: Pasaje){
    var vPasaje = new Pasaje();
    Object.assign(vPasaje,pasaje)
    this.pasaje = vPasaje;
    this.pasaje.adelantos = pasaje.adelantos;
    this.precioFinal = this.pasaje.precioPasaje; //establezco primero el precioFinal ya calculado
    this.establecerPrecioReal(this.pasaje);
    this.btnGuardar = false;
    this.btnModificar = true;
    this.mostrarPrecio = true;
  }

  //establezco el precio real que se cobró sin el descuento correspondiente
  public establecerPrecioReal(psj: Pasaje){
    if(psj.categoriaPasajero == "Menor")
      this.pasaje.precioPasaje = psj.precioPasaje * 4;
    else{
      if(psj.categoriaPasajero == "Jubilado")
        this.pasaje.precioPasaje = psj.precioPasaje * 2;
      else
        this.pasaje.precioPasaje = psj.precioPasaje;
    }
  }

  modificarPasaje(){
    this.pasaje.precioPasaje = this.precioFinal;
    this.pasajeService.updatePasaje(this.pasaje).subscribe(
      (result)=>{
        this.toastr.info("Actualizado","Info Pasaje");
        this.refrescarPasajes();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.pasaje = new Pasaje();
    this.pasaje.adelantos = new Array<Adelanto>();
    this.establecerValorDefectoSelect();
    this.btnGuardar = true; this. btnModificar = false;
    this.mostrarPrecio = false;

  }

  cargarPasajeBorrar(pasajeB: Pasaje){
    this.pasajeBorrar = pasajeB;
  }

  eliminarPasaje(){
    this.pasajeService.deletePasaje(this.pasajeBorrar).subscribe(
      (result)=>{
        this.toastr.info("Borrado","Info Pasaje");
        this.refrescarPasajes();
      }, 
      (error)=>{
        console.log(error);
      }
    )
    this.pasajeBorrar = new Pasaje();
  }

  //se determina si se muestra o no el precio final
  onCambio(val:any){ 
    if(this.pasaje.precioPasaje != null && this.pasaje.categoriaPasajero != null){
        this.mostrarPrecio = true;
        this.actualizarPrecioFinal();
        this.actualizarPrecioCorrecto();
    }
    else{
      this.mostrarPrecio = false;
    }
  }

  actualizarPrecioCorrecto(){
    var total = 0;
    for(var i=0; i< this.pasaje.adelantos.length; i++){
      total += this.pasaje.adelantos[i].montoAdelanto;
    }
    if(total > this.precioFinal)
      this.precioCorrecto = false;
    else
      this.precioCorrecto = true;
  }
  actualizarPrecioFinal(){
    if(this.pasaje.categoriaPasajero == "Menor")
      this.precioFinal = this.pasaje.precioPasaje * 0.25;
    else{
      if(this.pasaje.categoriaPasajero == "Jubilado")
        this.precioFinal = this.pasaje.precioPasaje * 0.5;
      else
        this.precioFinal = this.pasaje.precioPasaje;
    }
  }

  public comprobarExcesoMonto(){
    var sum=0;
    for(var i=0; i< this.pasaje.adelantos.length; i++){
      sum += this.pasaje.adelantos[i].montoAdelanto;
    }
    sum += this.adelanto.montoAdelanto; //tambien le sumo el monto a cargar
    if(sum <= this.precioFinal)
      return true;
    else
      return false;
  }

  establecerNumeroAdelanto(){
    var maxid: number;
    maxid = 0;
    for ( var i = 0; i < this.pasaje.adelantos.length;i++){
      if(maxid < this.pasaje.adelantos[i].numero){
      maxid = this.pasaje.adelantos[i].numero;
      }
    }
    return (maxid + 1);
    }

  public agregarAdelanto(){
    if(this.adelanto.montoAdelanto == 0 || this.adelanto.montoAdelanto < 0)
      this.toastr.error("El monto debe ser mayor a cero")
    else{
      if(this.comprobarExcesoMonto() == true){
        this.adelanto.fecha = new Date();
        this.adelanto.numero = this.establecerNumeroAdelanto();
        this.pasaje.adelantos.push(this.adelanto); //lo agrego a la lista temporal de adelantos
        this.adelanto = new Adelanto();
        this.toastr.info("Agregado","Info Adelanto");
      }
      else
        this.toastr.error("El monto ingresado supera el precio del pasaje","Error Monto");
    }
  }

  public modificarAdelanto(){
    this.adelanto.fecha = new Date();
    var idModi = this.pasaje.adelantos.findIndex((element: Adelanto) => element.numero == this.adelanto.numero);
    this.pasaje.adelantos.splice(idModi,1,this.adelanto);
    this.toastr.info("Modificado","Info Adelanto");
    this.adelanto = new Adelanto();
    this.btnGuardarAdelanto = true; this.btnModificarAdelanto = false;
  }

  public seleccionarAdelanto(adelanto: Adelanto){
    var vAdelanto = new Adelanto();
    Object.assign(vAdelanto,adelanto)
    this.adelanto = vAdelanto;
    this.btnGuardarAdelanto = false;
    this.btnModificarAdelanto = true;
  }

  public cancelarModificarAdelanto(){
    this.adelanto = new Adelanto();
    this.toastr.info("Cancelado","Info Adelanto");
    this.btnGuardarAdelanto = true; this.btnModificarAdelanto = false;
  }

  public eliminarAdelanto(adelanto: Adelanto){
    var idBorrar = this.pasaje.adelantos.findIndex((element: Adelanto) => element.numero == adelanto.numero);
    this.pasaje.adelantos.splice(idBorrar,1);
  }

  public cargarAdelantoMostrar(psj: Pasaje){
    this.adelantosPorPasaje = psj.adelantos;
  }

  actualizarResumen(){
    this.resumen = new Array<ResumenPunto3>();
    this.trabajarResumen();
    this.toastr.info("Resumen Actualizado","Info Resumen");
  }

  //se establece los valores para la tabla de seccion resumen
  trabajarResumen(){   
    var res = new ResumenPunto3();
    res.cantidad = 0; res.total = 0;
    for(var i = 0; i < this.categorias.length ; i++){
      res.categoria = this.categorias[i];
      for(var j=0; j < this.pasajes.length; j ++){
        if(res.categoria == this.pasajes[j].categoriaPasajero){
          res.cantidad ++;
          res.total += this.pasajes[j].precioPasaje;
        }
      }
      this.resumen.push(res); 
      res = new ResumenPunto3();
      res.cantidad = 0; res.total = 0;
    }
  }

}
