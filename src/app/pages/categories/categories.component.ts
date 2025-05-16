import { Component, OnInit } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [ListComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  job = ''

  constructor(private _ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.job = this._ar.snapshot.paramMap.get('trabajo')!;
  }
}
