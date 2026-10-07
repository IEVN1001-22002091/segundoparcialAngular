import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
 
export interface IAlumno {
  matricula: string;
  nombre: string;
  correo: string;
  materia: string;
}
 
@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css',
})
export class ListaAlumnos implements OnInit {
  formulario!: FormGroup;
 
  alumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: '',
  };
 
  ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });
  }
 
  muestraAlumnos(): void {
    this.alumno.matricula = this.formulario.value.matricula;
    this.alumno.nombre = this.formulario.value.nombre;
    this.alumno.correo = this.formulario.value.correo;
    this.alumno.materia = this.formulario.value.materia;
 
  }
}
 
