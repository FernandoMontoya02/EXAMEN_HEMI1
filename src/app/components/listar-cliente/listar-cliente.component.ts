import { Component } from '@angular/core';
import { Clientes } from '../models/clientes';
import { ExamenService } from '../../services/examen.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent {
  listCliente: Clientes[] = [];

  constructor(private examenservice:ExamenService, private toastr: ToastrService){
  
  }
  ngOnInit(): void {
    this.obtenerBoletos();
  }
  obtenerBoletos(){
    this.examenservice.listarCliente().subscribe(doc =>{
      this.listCliente = [];
      doc.forEach((element: any) => {
        this.listCliente.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.listCliente);
    });
  }
  eliminarBoleto(id:any){
    this.examenservice.eliminarCliente(id).then(() =>{
      this.toastr.error('Cliente Eliminado con exito', 'Registro Eliminado')
    }, error =>{
      this.toastr.error('Opss ocurrio un error', 'Error');
      console.log(error);
    })
  }
  editarBoleto(boleto: Clientes){
    this.examenservice.addClienteEdit(boleto);
  }
}
