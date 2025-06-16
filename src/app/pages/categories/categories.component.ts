import { Component, OnInit } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../interfaces/publicacion';

@Component({
  selector: 'app-categories',
  imports: [ListComponent, CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  location: string | null = '';
  job: string | null = '';
  list?: Publicacion[];


  constructor(
    private _publiService: PublicacionesService,
    private _ar: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getJob(); // Carga inicial
  
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getJob();  // se ejecuta al terminar navegación
      }
    });
  }
  
  getJob() {
    this.location = this._ar.snapshot.paramMap.get('ubicacion');
    this.job = this._ar.snapshot.paramMap.get('trabajo');
    this._publiService.getPublicacionesPorTrabajoYUbi(this.job, this.location)
  .subscribe(data => {
    this.list = this.shuffleArray([...data]); // copia y mezcla
  });

  }

  switchJob(job: string) {
    if (this.job === job) return;
  
    this.job = job;
    this._router.navigate(['/categorias/Mar del Plata', job]);
  }
  
   shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
}
