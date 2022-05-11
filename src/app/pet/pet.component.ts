import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPet } from '../state/pet.model';
import { PetService } from '../state/pet.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  pets: IPet[];
  petId: string;
  pet: IPet;

  constructor(public petService: PetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.petId = params['id'];
      console.log(params);
    }),
    this.petService.pets$.subscribe((pets: IPet[]) => {
      this.pets = pets;
      this.setPet();
    })
  }

  setPet() {
    for(let i = 0; i< this.pets.length; i++) {
      if(this.pets[i]._id == this.petId) {
        this.pet = this.pets[i];
      }
    }
  }

  update() {
    this.petService.updatePet(this.petId);
  }

  delete() {
    this.petService.deletePet(this.petId);
  }

}
