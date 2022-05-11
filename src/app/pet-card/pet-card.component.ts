import { Component, Input, OnInit } from '@angular/core';
import { IPet } from '../state/pet.model';


@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent implements OnInit {
  @Input('pet') pet: IPet;

  constructor() { }

  ngOnInit(): void {
  }

}
