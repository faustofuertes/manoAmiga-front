import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../interfaces/publicacion';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  publicacion?: Publicacion;
  id?: string;

  constructor(
    private _publiService: PublicacionesService,
    private _ar: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this._ar.snapshot.paramMap.get('id')!;

    this._publiService.getPublicacionxId(this.id).subscribe(data => {
      this.publicacion = data;
      console.log(this.publicacion)
    })
  }
}
