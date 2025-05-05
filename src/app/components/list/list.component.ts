import { Component, Input, OnInit } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../interfaces/publicacion';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  list?: Publicacion[];
  ubicacion: string | null = '';
  trabajo: string | null = '';

  constructor(
    private _publiService: PublicacionesService,
    private _ar: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ubicacion = this._ar.snapshot.paramMap.get('ubicacion');
    this.trabajo = this._ar.snapshot.paramMap.get('trabajo');
    this._publiService.getPublicacionesPorTrabajoYUbi(this.trabajo, this.ubicacion).subscribe(data => {
      this.list = data;
    })
  }
}
