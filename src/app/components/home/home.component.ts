import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenService } from '../../services/examen.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from '../models/clientes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  form: FormGroup;
  loading = false;
  titulo = 'Comprar Boleto';
  id: string | null;
  peliculas:any=['Ant Man 3', 'Avatar', 'Minions 2', 'Gato con Botas 2', 'Megan', 'Historias de honor', 'Juego Perfecto', 'Cenicienta'];
  
   constructor(private fb: FormBuilder, private examenservice: ExamenService, private toastr: ToastrService, private router: Router, private aRoute: ActivatedRoute){
    this.form = this.fb.group({
      codigo: ['',Validators.required],
      fecha: ['',Validators.required],
      cliente: ['',Validators.required],
      celular: ['',Validators.required],
      descripcion: ['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  
  }
  
    ngOnInit(): void {
      this.getCliente();
  
    }
    guardarCliente(){
      if(this.id == null){
        this.agregarCliente();
      }else{
    this.editarCliente(this.id);
      }
      
    }
    agregarCliente(){
      const Client:Clientes = {
        codigo: this.form.value.codigo,
        fecha: this.form.value.fecha,
        cliente: this.form.value.cliente,
        celular: this.form.value.celular,
        descripcion: this.form.value.descripcion,
      }
      this.loading = true;
      this.examenservice.guardarCliente(Client).then(() => {
        this.loading = false;
        console.log('Cliente Registrado');
        this.toastr.success('El cliente fue comprado con exito!', 'Cliente Comprado')
        this.router.navigate(['listac']);
        this.form.reset();
      }, error =>{
        
        this.toastr.error('Opps... ocurrio un error', 'Error');
        console.log(error);
      })
    }
    editarCliente(id:string){
      const Client:Clientes = {
        codigo: this.form.value.codigo,
        fecha: this.form.value.fecha,
        cliente: this.form.value.cliente,
        celular: this.form.value.celular,
        descripcion: this.form.value.descripcion,
      }
      this.loading = true;
      this.examenservice.editarCliente(id, Client).then(() =>{
        this.loading = false;
        this.toastr.info('El Cliente fue modificado con exito', 'Cliente Modificado', {
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['listac']);
      })
    }
    getCliente(){
      this.titulo = 'Agregar Cliente'
      if(this.id !== null){
        this.titulo = 'Editar Cliente'
        this.loading = true;
        this.examenservice.getClienteEdit(this.id).subscribe(data =>{
          this.loading = false;
          console.log(data.payload.data()['codigo']);
          this.form.setValue({
              codigo: data.payload.data()['codigo'],
              fecha: data.payload.data()['fecha'],
              cliente: data.payload.data()['cliente'],
              celular: data.payload.data()['celular'],
              descripcion: data.payload.data()['descripcion'],
          })
        })
      }
    }
  
  }
  
