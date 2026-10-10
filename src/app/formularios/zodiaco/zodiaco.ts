import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface IResultadoZodiaco {
  nombreCompleto: string;
  edad: number;
  signo: string;
  imagen: string;
}

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class Zodiaco implements OnInit {
  formZodiaco!: FormGroup;
  resultado: IResultadoZodiaco | null = null;

  private signosChinos: { [key: number]: { nombre: string; imagen: string } } = {
    0: { nombre: 'Mono', imagen: '/zodiaco/mono.png' },
    1: { nombre: 'Gallo', imagen: '/zodiaco/gallo.png' },
    2: { nombre: 'Perro', imagen: '/zodiaco/perro.png' },
    3: { nombre: 'Cerdo', imagen: '/zodiaco/cerdo.png' },
    4: { nombre: 'Rata', imagen: '/zodiaco/rata.png' },
    5: { nombre: 'Buey', imagen: '/zodiaco/buey.png' },
    6: { nombre: 'Tigre', imagen: '/zodiaco/tigre.png' },
    7: { nombre: 'Conejo', imagen: '/zodiaco/conejo.png' },
    8: { nombre: 'Dragón', imagen: '/zodiaco/dragon.png' },
    9: { nombre: 'Serpiente', imagen: '/zodiaco/serpiente.png' },
    10: { nombre: 'Caballo', imagen: '/zodiaco/caballo.png' },
    11: { nombre: 'Cabra', imagen: '/zodiaco/cabra.png' }
  };

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
  }

  imprimir(): void {
    if (this.formZodiaco.invalid) {
      this.formZodiaco.markAllAsTouched();
      return;
    }

    const { nombre, apaterno, amaterno, dia, mes, anio } = this.formZodiaco.value;

    const hoy = new Date();
    const fechaNac = new Date(anio, mes - 1, dia);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesDiferencia = hoy.getMonth() - fechaNac.getMonth();

    if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    const residuo = Number(anio) % 12;
    const signoInfo = this.signosChinos[residuo];

    this.resultado = {
      nombreCompleto: `${nombre} ${apaterno} ${amaterno}`,
      edad: edad,
      signo: signoInfo.nombre,
      imagen: signoInfo.imagen
    };
  }
}