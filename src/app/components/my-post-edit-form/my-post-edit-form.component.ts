import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Publicacion } from '../../interfaces/publicacion';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      }

      this._myPubliService.putPublicacion(this.post._id, publiActualizada).subscribe();
    }

  }

  eliminarProducto() {
    this._myPubliService.deletePublicacion(this.post?._id).subscribe();
  }
}
