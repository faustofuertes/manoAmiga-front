import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Publicacion } from '../interfaces/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  baseURL = 'http://localhost:4000/api/publicaciones'
  //baseURL = 'https://manoamiga-back.onrender.com/api/publicaciones'

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

  putPublicacion(idPubli: string | undefined, publi: Publicacion): Observable<Publicacion> {
    return this._http.put<Publicacion>(`${this.baseURL}/${idPubli}`, publi);
  }

  deletePublicacion(idPubli: string | undefined): Observable<Publicacion> {
    return this._http.delete<Publicacion>(`${this.baseURL}/${idPubli}`);
  }

  getPublicacionesActivas(): Observable<Publicacion[]> {
    return this._http.get<Publicacion[]>(`${this.baseURL}/activas`);
  }

  getPublicacionesInactivas(): Observable<Publicacion[]> {
    return this._http.get<Publicacion[]>(`${this.baseURL}/inactivas`);
  }

  getPublicacionInactivas(): Observable<Publicacion> {
    return this._http.get<Publicacion>(`${this.baseURL}/inactiva/una`);
  }

  getCantPublicacionesInactivas(): Observable<number> {
    return this._http.get<{ cantidad: number }>(`${this.baseURL}/inactivas/count`)
      .pipe(map(res => res.cantidad));
  }
}
