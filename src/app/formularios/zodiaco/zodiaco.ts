import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablaZodiacoComponent } from './tabla-zodiaco.component';

export interface IResultadoZodiaco {
  nombreCompleto: string;
  edad: number;
  signo: string;
  imagen: string;
  sexo: string;
  fechaNacimiento: string;
}

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaZodiacoComponent],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class Zodiaco implements OnInit {
  formZodiaco!: FormGroup;
  resultadoActual: IResultadoZodiaco | null = null;
  listaConsultas: IResultadoZodiaco[] = [];
  indiceEdicion: number = -1;

  // Control de vistas: 'calculo' (formulario + resultado) o 'registros' (la tabla independiente)
  vistaActual: 'calculo' | 'registros' = 'calculo';

  signosChinos = [
    { nombre: 'Mono', imagen: 'zodiaco/mono.png' },
    { nombre: 'Gallo', imagen: 'zodiaco/gallo.png' },
    { nombre: 'Perro', imagen: 'zodiaco/perro.png' },
    { nombre: 'Cerdo', imagen: 'zodiaco/cerdo.png' },
    { nombre: 'Rata', imagen: 'zodiaco/rata.png' },
    { nombre: 'Buey', imagen: 'zodiaco/buey.png' },
    { nombre: 'Tigre', imagen: 'zodiaco/tigre.png' },
    { nombre: 'Conejo', imagen: 'zodiaco/conejo.png' },
    { nombre: 'Dragón', imagen: 'zodiaco/dragon.png' },
    { nombre: 'Serpiente', imagen: 'zodiaco/serpiente.png' },
    { nombre: 'Caballo', imagen: 'zodiaco/caballo.png' },
    { nombre: 'Cabra', imagen: 'zodiaco/cabra.png' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formZodiaco = this.fb.group({
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      anio: ['', [Validators.required, Validators.min(1900)]],
      sexo: ['Masculino', Validators.required]
    });

    this.cargarDesdeStorage();
  }

  cambiarVista(vista: 'calculo' | 'registros'): void {
    console.log('Cambiando a vista:', vista);
    this.vistaActual = vista;
  }

  imprimirYGuardar(): void {
    if (this.formZodiaco.invalid) {
      this.formZodiaco.markAllAsTouched();
      return;
    }

    const { nombre, apaterno, amaterno, dia, mes, anio, sexo } = this.formZodiaco.value;

    const hoy = new Date();
    const fechaNac = new Date(Number(anio), Number(mes) - 1, Number(dia));
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesDiferencia = hoy.getMonth() - fechaNac.getMonth();

    if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    const residuo = Number(anio) % 12;
    const signoInfo = this.signosChinos[residuo];

    const datosCalculados: IResultadoZodiaco = {
      nombreCompleto: `${nombre} ${apaterno} ${amaterno}`,
      edad: edad,
      signo: signoInfo.nombre,
      imagen: signoInfo.imagen,
      sexo: sexo,
      fechaNacimiento: `${dia}/${mes}/${anio}`
    };

    if (this.indiceEdicion !== -1) {
      this.listaConsultas[this.indiceEdicion] = datosCalculados;
      this.indiceEdicion = -1;
    } else {
      this.listaConsultas.push(datosCalculados);
    }

    this.resultadoActual = datosCalculados;
    localStorage.setItem('consultas_zodiaco', JSON.stringify(this.listaConsultas));
  }

  cargarDesdeStorage(): void {
    const datos = localStorage.getItem('consultas_zodiaco');
    if (datos) {
      this.listaConsultas = JSON.parse(datos);
    }
  }

  prepararEdicion(index: number): void {
    this.indiceEdicion = index;
    const item = this.listaConsultas[index];
    const partesFecha = item.fechaNacimiento.split('/');
    const nombres = item.nombreCompleto.split(' ');

    this.formZodiaco.patchValue({
      nombre: nombres[0] || '',
      apaterno: nombres[1] || '',
      amaterno: nombres[2] || '',
      dia: partesFecha[0] || '',
      mes: partesFecha[1] || '',
      anio: partesFecha[2] || '',
      sexo: item.sexo
    });

    this.resultadoActual = item;
    this.vistaActual = 'calculo'; // Regresa a la vista principal para editar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarConsulta(index: number): void {
    this.listaConsultas.splice(index, 1);
    localStorage.setItem('consultas_zodiaco', JSON.stringify(this.listaConsultas));
    if (this.indiceEdicion === index) {
      this.indiceEdicion = -1;
      this.formZodiaco.reset({ sexo: 'Masculino' });
      this.resultadoActual = null;
    }
  }

  limpiar(): void {
    this.formZodiaco.reset({ sexo: 'Masculino' });
    this.resultadoActual = null;
    this.indiceEdicion = -1;
  }
}