import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Publicacion } from '../../interfaces/publicacion';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionesService } from '../../services/publicaciones.service';

@Component({
  selector: 'app-my-post-edit-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-post-edit-form.component.html',
  styleUrl: './my-post-edit-form.component.css'
})
export class MyPostEditFormComponent implements OnChanges {
  @Input() post?: Publicacion;

  locations: string[] = ['Mar del Plata'];
  form: FormGroup;

  loadingDelete = false;
  loadingUpdate = false;
  updated = false;

  constructor(
    private fb: FormBuilder,
    private _myPubliService: PublicacionesService
  ) {
    this.form = this.fb.group({
      location: ['', Validators.required],
      phone: ['', Validators.required],
      description: ['', Validators.required],
      schedule: ['', Validators.required],
      pricing: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.form = this.fb.group({
        location: [this.post.location, Validators.required],
        phone: [this.post.phone, Validators.required],
        description: [this.post.description, Validators.required],
        schedule: [this.post.schedule, Validators.required],
        pricing: [this.post.pricing, Validators.required],
        experience: [this.post.experience, Validators.required]
      });
    }
  }

  actualizarProducto() {
    if (this.post) {
      this.loadingUpdate = true;

      const publiActualizada: Publicacion = {
        userId: this.post.userId,
        userName: this.post.userName,
        job: this.post.job,
        location: this.form.value.location,
        phone: this.form.value.phone,
        description: this.form.value.description,
        schedule: this.form.value.schedule,
        pricing: this.form.value.pricing,
        experience: this.form.value.experience
      };

      this._myPubliService.putPublicacion(this.post._id, publiActualizada).subscribe(() => {
        this.loadingUpdate = false;
        this.updated = true;

        // Después de 1.2s vuelve al botón normal
        setTimeout(() => {
          this.updated = false;
        }, 1200);
      });
    }
  }


  eliminarProducto() {
    this.loadingDelete = true;

    this._myPubliService.deletePublicacion(this.post?._id).subscribe(() => {
      // Esperá un poco para mostrar el spinner
      setTimeout(() => {
        this.loadingDelete = false;
        window.location.reload();
      }, 1000);
    });
  }

  get descriptionControl(): AbstractControl {
    return this.form.get('description')!;
  }

  get descriptionErrorMessage(): string {
    const value = this.descriptionControl.value || '';
    const length = value.length;

    if (length === 0) {
      return 'Mínimo 50 caracteres';
    }

    if (length > 0 && length < 50) {
      return `Faltan ${50 - length} caracteres`;
    }

    return '';
  }
}
