import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MyToken } from '../../interfaces/my-token';
import { jwtDecode } from 'jwt-decode';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario';
import { ProfileCardComponent } from "../../components/profile-card/profile-card.component";
import { UserHeaderComponent } from '../../components/user-header/user-header.component';
import { MyPostPanelControlComponent } from '../../components/my-post-panel-control/my-post-panel-control.component';
import { AdminHeaderComponent } from "../../components/admin-header/admin-header.component";
import { AdminPostMenuComponent } from '../../components/admin-post-menu/admin-post-menu.component';


@Component({
  selector: 'app-my-profile',
  imports: [
    MyPostPanelControlComponent,
    ProfileCardComponent,
    UserHeaderComponent,
    AdminHeaderComponent,
    AdminPostMenuComponent
],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {

  usuario?: Usuario;
  selectedOption = 1;
  userRoles: string[] = [];

  constructor(
    public _auth: AuthService,
    private _myUsuService: UsuariosService
  ) { }

  ngOnInit(): void {

    this._auth.idTokenClaims$.subscribe(claims => {
      const token = claims?.__raw;

      if (token) {
        const decoded = jwtDecode<MyToken>(token);

        this.userRoles = decoded['https://manoamiga.com.ar/roles'];

        this._myUsuService.getUsuarioXId(decoded.sub).subscribe(data => {
          this.usuario = data;
          if (this.usuario._id && this.usuario.name) {
            localStorage.setItem('userID', this.usuario._id);
            localStorage.setItem('userName', this.usuario.name);
          }


        }, error => {

          this.usuario = {
            auth0Id: decoded.sub,
            name: decoded.name,
            email: decoded.email
          }

          this._myUsuService.postUsuario(this.usuario).subscribe(() => {
            window.location.reload();
          });
        });
      }

    });
  }

  recivedSelectedOption(option: number) {
    this.selectedOption = option;
  }

}
