import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../interfaces/publicacion';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnChanges {
  @Input() list?: Publicacion[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['list']) {
      // Usar changes['list'].currentValue o hacer algo para actualizar vista o lógica
      this.list = changes['list'].currentValue;
    }
  }
}
