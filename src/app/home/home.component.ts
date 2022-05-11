import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPet } from '../state/pet.model';
import { PetService } from '../state/pet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pets: IPet[];
  public states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];
  public statuses = ["Missing", "Found"];
  filterForm: FormGroup;
  
  constructor(private petService: PetService) {
    
  }

  ngOnInit(): void {
    this.petService.pets$.subscribe((pets: IPet[]) => {
      this.pets = pets;
      console.log(this.pets); 
    });

    this.filterForm = new FormGroup({
      state: new FormControl(),
      status: new FormControl()
    });
  }

  filterState() {
    console.log(this.filterForm.value.state);
    this.petService.filterPetState(this.filterForm.value.state);
  }

  filterStatus() {
    console.log(this.filterForm.value.status);
    this.petService.filterPetStatus(this.filterForm.value.status);
  }

  showAll() {
    this.petService.loadPets();
  }

}
