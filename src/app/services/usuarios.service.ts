import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseURL = "https://manoamiga-back.onrender.com/api/usuarios"

  constructor(private _http: HttpClient) { }

  getUsuarioXId(id: string): Observable<Usuario> {
    return this._http.get<Usuario>(`${this.baseURL}/${id}`);
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this._http.post<Usuario>(this.baseURL, usuario);
  }

}
