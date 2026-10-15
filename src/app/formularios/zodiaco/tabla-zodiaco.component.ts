import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IResultadoZodiaco } from './zodiaco'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-tabla-zodiaco',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-zodiaco.component.html',
})
export class TablaZodiacoComponent {
  @Input() lista: IResultadoZodiaco[] = [];
  @Output() editar = new EventEmitter<number>();
  @Output() eliminar = new EventEmitter<number>();

  onEditar(index: number): void {
    this.editar.emit(index);
  }

  onEliminar(index: number): void {
    this.eliminar.emit(index);
  }
}