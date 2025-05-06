import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../interfaces/publicacion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  imports: [RouterLink],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit {
  @Input() usuario?: Usuario;
  @Output() postClickedEmitter = new EventEmitter<Publicacion>();

  publicaciones?: Publicacion[];

  constructor(private _myPubliService: PublicacionesService) { }

  ngOnInit(): void {
    if (this.usuario) {
      this._myPubliService.getPublicacionesDeUsuario(this.usuario._id).subscribe(data => {
        this.publicaciones = data;
      })
    }
  }


  emitPostClicked(post: Publicacion) {
    this.postClickedEmitter.emit(post);
  }
}
