import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionesService } from '../../services/publicaciones.service';
import { scheduled } from 'rxjs';
import { Publicacion } from '../../interfaces/publicacion';

@Component({
  selector: 'app-admin-post-menu',
  imports: [ReactiveFormsModule

  ],
  templateUrl: './admin-post-menu.component.html',
  styleUrl: './admin-post-menu.component.css'
})
export class AdminPostMenuComponent implements OnInit {
  form: FormGroup;
  post?: Publicacion;
  cant?: number;

  constructor(
    private fb: FormBuilder,
    private _myPubliService: PublicacionesService
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
      job: ['', Validators.required],
      phone: ['', Validators.required],
      schedule: ['', Validators.required],
      pricing: ['', Validators.required],
      experience: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._myPubliService.getCantPublicacionesInactivas().subscribe(data => {
      this.cant = data;
    })
    this.loadFormData()
  }

  loadFormData() {
    this._myPubliService.getPublicacionInactivas().subscribe(data => {
      this.post = data;

      if (this.post) {
        this.form.patchValue({
          description: this.post.description,
          name: this.post.userName,
          job: this.post.job,
          phone: this.post.phone,
          schedule: this.post.schedule,
          pricing: this.post.pricing,
          experience: this.post.experience,
          location: this.post.location
        });
      }
    })
  }


  acceptPost() {
    if (this.post) {

      const publiActualizada: Publicacion = {
        userId: this.post.userId,
        userName: this.form.value.name,
        job: this.form.value.job,
        location: this.form.value.location,
        phone: this.form.value.phone,
        description: this.form.value.description,
        schedule: this.form.value.schedule,
        pricing: this.form.value.pricing,
        experience: this.form.value.experience,
        isActive: true
      }

      this._myPubliService.putPublicacion(this.post._id, publiActualizada).subscribe(() => {
        this.loadFormData();
        if (this.cant && this.cant > 0)
          this.cant--
      });
    }
  }

  deletePost() {
    this._myPubliService.deletePublicacion(this.post?._id).subscribe(() => {
      this.loadFormData();
      if (this.cant && this.cant > 0)
        this.cant--
    });

  }
}
