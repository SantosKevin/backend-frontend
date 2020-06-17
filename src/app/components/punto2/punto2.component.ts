import { Component, OnInit } from '@angular/core';
import { Asistente } from './../../models/asistente';
import { AsistenteService } from '../../services/asistente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-punto2',
  templateUrl: './punto2.component.html',
  styleUrls: ['./punto2.component.css']
})
export class Punto2Component implements OnInit {

  asistente: Asistente;
  asistenteBorrar: Asistente;
  asistentes: Array<Asistente>;

  btnGuardar: Boolean = true;
  btnModificar: Boolean = false;

  constructor(private asistenteService: AsistenteService, private toastr: ToastrService) { 
    this.asistenteBorrar = new Asistente();
    this.asistente = new Asistente();
    this.asistentes = new Array<Asistente>();
    this.refrescarAsistentes();
  }

  ngOnInit(): void {
  }

  //registra las respuestas del asistente
  public registrar(){  
    this.asistenteService.addAsistente(this.asistente).subscribe(
      (result)=>{
        this.mostrarToastAgregar();
        this.refrescarAsistentes();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.asistente = new Asistente();
  }

  refrescarAsistentes(){
    this.asistentes = new Array<Asistente>();
    this.asistenteService.getAsistentes().subscribe(
      (result)=>{
        var asist: Asistente = new Asistente();
        result.forEach(element => {
          Object.assign(asist, element);
          this.asistentes.push(asist);
          asist = new Asistente();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  elegirAsistente(asistente: Asistente){
    var vAsist = new Asistente();
    Object.assign(vAsist,asistente);
    this.asistente = vAsist;
    this.btnGuardar = false;
    this.btnModificar = true;
  }

  borrarAsistente(){
    this.asistenteService.deleteAsistente(this.asistenteBorrar).subscribe(
      (result)=>{
        this.mostrarToastBorrar();
        this.asistenteBorrar = new Asistente();
        this.refrescarAsistentes();
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  limpiarAsistente(){
    this.asistente = new Asistente();
  }

  cancelarModificacion(){
    this.asistente = new Asistente();
    this.btnModificar = false;
    this.btnGuardar = true;
  }

  modificarAsistente(){
    this.mostrarToastActualizar();
    this.asistenteService.updateAsistente(this.asistente).subscribe(
      (result)=>{
        this.refrescarAsistentes()
      },
      (error)=>{
        console.log(error);
      }
    );
    this.asistente = new Asistente();
    this.btnModificar = false;
    this.btnGuardar = true;
  }

  public cargarAsistenteModal(asistente: Asistente){
    this.asistenteBorrar = asistente;
  }

  /* public abrirModalConfirmacion(contenido) {
    this.modalService.open(contenido);
  } */

  public mostrarToastBorrar(){
    this.toastr.info("Borrando ", "Info Asistente", {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
  public mostrarToastActualizar(){
    this.toastr.info("Actualizando ", "Info Asistente");
  }
  public mostrarToastAgregar(){
    this.toastr.info("Agregando ", "Info Asistente");
  }
}
