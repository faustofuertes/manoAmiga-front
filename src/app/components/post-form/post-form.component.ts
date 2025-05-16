import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Publicacion } from '../../interfaces/publicacion';
import { PublicacionesService } from '../../services/publicaciones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  jobs: string[] = ['Electricista', 'Plomero', 'Jardinero', 'Pintor', 'Cerrajero', 'Tecnico', 'Carpintero', 'Limpieza'];
  locations: string[] = ['Mar del Plata'];
  currentStep = 1;

  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  step4Form: FormGroup;
  step5Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _myPubliService: PublicacionesService,
    private _router: Router
  ) {
    this.step1Form = this.fb.group({
      job: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.step2Form = this.fb.group({
      description: [
        '',
        [
          Validators.required,
          (control: AbstractControl) => {
            const value = control.value || '';
            const words = value
              .trim()
              .split(/\s+/)
              .filter((word: string) => word.length > 0);
            return words.length >= 20 ? null : { minWords: true };
          }
        ]
      ]
    });

    this.step3Form = this.fb.group({
      pricing: ['', Validators.required]
    });

    this.step4Form = this.fb.group({
      schedule: ['', Validators.required],
      experience: ['', Validators.required]
    });

    this.step5Form = this.fb.group({
      phone: ['', Validators.required]
    });
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  onSubmit() {

    if (this.step1Form.valid && this.step2Form.valid) {

      const publicacion: Publicacion = {
        userId: localStorage.getItem('userID'),
        userName: localStorage.getItem('userName'),
        job: this.step1Form.value.job,
        location: this.step1Form.value.location,
        description: this.step2Form.value.description,
        schedule: this.step4Form.value.schedule,
        pricing: this.step3Form.value.pricing,
        experience: this.step4Form.value.experience,
        phone: this.step5Form.value.phone
      };

      this._myPubliService.postPublicacion(publicacion).subscribe(() => {
        this._router.navigate(['publicacion-exitosa']);
      }, error => {
        this._router.navigate(['publicacion-fallida']);
      });
    }
  }
}
