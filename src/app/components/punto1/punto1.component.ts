import { Component, OnInit } from '@angular/core';
import { Mensaje } from './../../models/mensaje';
import { MensajeService } from 'src/app/services/mensaje.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from './../../models/empresa';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';

@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.component.html',
  styleUrls: ['./punto1.component.css']
})
export class Punto1Component implements OnInit {

  nombreEmpresa = '';
  mensaje: Mensaje;
  tamMaxTexto: number = 120;
  tamTexto: number = 120;
  mensajes: Array<Mensaje>;
  empresas: Array<Empresa>; 

  btnGuardar = true;
  btnModificar = false;
  mensajeBorrar: Mensaje;

  constructor(private mensajeService: MensajeService, private empresaService: EmpresaService,private toastr: ToastrService) { 
    this.mensaje = new Mensaje();
    this.mensajes = new Array<Mensaje>();
    this.empresas = new Array<Empresa>();
    this.mensajeBorrar = new Mensaje();
    this.refrescarMensajes();
    this.refrescarEmpresas();
  }

  ngOnInit(): void {
  }

  //a medida que se escribe en el textarea va cambiando el tamaño de texto disponible
  public cambiarTamTexto(){
    if(this.mensaje.texto != null){
      this.tamTexto = 120;
      this.tamTexto -= this.mensaje.texto.length;
    }
    
  }

/*   establecerNumero(){
    var para = this.mensaje.para.toString();
    para = para.replace(/-/, '');
    this.mensaje.para = parseInt(para);
    //desde
    var desde = this.mensaje.desde.toString();
    desde = desde.replace(/-/, '');
    this.mensaje.desde = parseInt(desde);
  } */
  //guarda el mensaje y creamos un nuevo objeto mensaje
  public enviarMensaje(){
    this.mensaje.fecha = new Date();
/*     this.establecerNumero(); */
    this.mensajeService.addMensaje(this.mensaje).subscribe(
      (result)=>{
        this.toastr.info("Guardado","Info Mensaje");
        this.refrescarMensajes();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.mensaje = new Mensaje();
    console.log(this.mensajes);
    this.tamTexto = 120;
  }

  public limpiarMensaje(){
    this.tamTexto = 120;
    this.mensaje.texto = "";
    this.toastr.info("Caja de texto limpiada.","Info Mensaje");
  }

  refrescarMensajes(){
    this.mensajes = new Array<Mensaje>();
    this.mensajeService.getMensajes().subscribe(
      (result)=>{
        var msj: Mensaje = new Mensaje();
        result.forEach(element => {
          Object.assign(msj, element);
          this.mensajes.push(msj);
          msj = new Mensaje();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  refrescarEmpresas(){
    this.empresas = new Array<Empresa>();
    this.empresaService.getEmpresas().subscribe(
      (result)=>{
        var vEmp: Empresa = new Empresa();
        result.forEach(element => {
          Object.assign(vEmp, element);
          this.empresas.push(vEmp);
          vEmp = new Empresa();
        });
      },
      (error)=>{
        console.log(error);
      }
    )    
  }

  elegirMensaje(mensaje: Mensaje){
    mensaje.empresa = this.empresas.find(element=>element._id == mensaje.empresa._id )
    var vMsj = new Mensaje();
    Object.assign(vMsj,mensaje);
    this.mensaje = vMsj;
    this.btnGuardar = false;
    this.btnModificar = true;
  }

  borrarMensaje(){
    this.mensajeService.deleteMensaje(this.mensajeBorrar).subscribe(
      (result)=>{
        this.toastr.info("Borrado","Info Mensaje");
        this.refrescarMensajes();
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  modificarMensaje(){
    //actualizo fecha ultima modificación
    this.mensaje.fecha = new Date();
    this.mensajeService.updateMensaje(this.mensaje).subscribe(
      (result)=>{
        this.toastr.info("Actualizado","Info Mensaje");
        this.refrescarMensajes()
      },
      (error)=>{
        console.log(error);
      }
    );
    this.mensaje = new Mensaje();
    this.btnModificar = false;
    this.btnGuardar = true;
  }

  public cargarNombreEmpresa(){
    this.nombreEmpresa = this.mensaje.empresa.nombre;
  }

  public cargarMensajeModal(mensaje: Mensaje){
    this.mensajeBorrar = mensaje;
    this.nombreEmpresa = this.mensajeBorrar.empresa.nombre;
  }

  public cancelarModificacion(){
    this.mensaje = new Mensaje();
    this.btnModificar = false;
    this.btnGuardar = true;
    this.toastr.info("Modificacion Cancelada");
  }

}
