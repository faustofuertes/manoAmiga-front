import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacion } from '../interfaces/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  //baseURL = 'http://localhost:4000/api/publicaciones'
  baseURL = 'https://manoamiga-back.onrender.com/api/publicaciones'

  constructor(private _http: HttpClient) { }

  getPublicacionesDeUsuario(userId: string | undefined): Observable<Publicacion[]> {
    return this._http.get<Publicacion[]>(`${this.baseURL}/${userId}`);
  }

  getPublicacionesPorTrabajoYUbi(job: string | null, location: string | null): Observable<Publicacion[]> {
    return this._http.get<Publicacion[]>(`${this.baseURL}/filtrar?job=${job}&location=${location}`);
  }

  getPublicacionxId(id: string): Observable<Publicacion> {
    return this._http.get<Publicacion>(`${this.baseURL}/publicacion/${id}`);
  }

  postPublicacion(publi: Publicacion): Observable<Publicacion> {
    return this._http.post<Publicacion>(this.baseURL, publi);
  }
}
