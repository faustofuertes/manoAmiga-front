import { Component, Input } from '@angular/core';
import { MyPostsComponent } from "../my-posts/my-posts.component";
import { MyPostEditFormComponent } from "../my-post-edit-form/my-post-edit-form.component";
import { Usuario } from '../../interfaces/usuario';
import { Publicacion } from '../../interfaces/publicacion';

@Component({
  selector: 'app-my-post-panel-control',
  imports: [MyPostsComponent, MyPostEditFormComponent],
  templateUrl: './my-post-panel-control.component.html',
  styleUrl: './my-post-panel-control.component.css'
})
export class MyPostPanelControlComponent {
  @Input() usuario?: Usuario;
  postRecived?: Publicacion;

  recivePost(post: Publicacion) {
    this.postRecived = post;
  }
}
