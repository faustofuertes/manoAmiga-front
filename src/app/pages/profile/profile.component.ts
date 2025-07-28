import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../interfaces/publicacion';
import { PersonalReviewsComponent } from "../../components/personal-reviews/personal-reviews.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [PersonalReviewsComponent, RouterLink, CommonModule],
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
    window.scrollTo(0, 0);
    this.id = this._ar.snapshot.paramMap.get('id')!;

    this._publiService.getPublicacionxId(this.id).subscribe(data => {
      this.publicacion = data;
    })
  }

  abrirWhatsApp() {
    const numero = `549${this.publicacion?.phone}`;
    const mensaje = `Hola ${this.publicacion?.userName} vi tu publicacion de ${this.publicacion?.job} en manoamiga.com.ar y me gustaría hacerte una consulta...`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  }

  llamar() {
    window.location.href = `tel:${this.publicacion?.phone}`;
  }

}