import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('buscarTexto') buscarTexto: any;
  listaClientes: any[] = [];

    constructor(private router:Router){ 
    }
    buscarCliente(termino: string) {
      if (termino.trim() !== '') {
        this.router.navigate(['listac', termino]);
      } else {
        this.router.navigate(['listac']);
      }
    }
}
