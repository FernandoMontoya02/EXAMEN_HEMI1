// busqueda.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  resultadosBusqueda: any[] = [];

  constructor() { }
}
