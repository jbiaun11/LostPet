import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPet } from '../state/pet.model';
import { PetService } from '../state/pet.service';


@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  pets: IPet[];
  addForm: FormGroup;
  public states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];
  public statuses = ["Missing", "Found"];

  constructor(public petService: PetService) {
    this.petService.pets$.subscribe(pets => {
      this.pets = pets;
    })
    }

  
  ngOnInit(): void {
    this.addForm = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.minLength(2)]),
      state: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      age: new FormControl('', [Validators.required, Validators.minLength(2)]),
      imageUrl: new FormControl('', [Validators.required]),
      status: new FormControl()
    });
   
  }

  
  
  submitForm() {

    this.petService.addPet(this.addForm.value.type, this.addForm.value.state, this.addForm.value.status, this.addForm.value.name, this.addForm.value.age, this.addForm.value.imageUrl);
  
    console.log(`Type: ${this.addForm.value.type}`);
    console.log(`State: ${this.addForm.value.state}`);
    console.log(`Name: ${this.addForm.value.name}`);
    console.log(`Age: ${this.addForm.value.age}`);
    console.log(`Status: ${this.addForm.value.status}`);
    
  }
  
}
