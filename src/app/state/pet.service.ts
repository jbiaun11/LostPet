import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPet } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private _pets = new BehaviorSubject<IPet[]>([]);
  public readonly pets$: Observable<IPet[]> = this._pets.asObservable();

  constructor(private http: HttpClient) {
    this.loadPets();
   }

  loadPets() {
    this.http.get('api/getAllPets').subscribe((response) => {
      this._pets.next((response as any).result); 
      console.log(response);
    });
  }


 addPet(type: string, state: string, status: string, name: string, age: string, imageUrl: string) {
  let newPet = {
    type: type,
    state: state,
    status: status,
    name: name,
    age: age,
    imageUrl: imageUrl
  }

  this.http.post('api/addPet', newPet).subscribe((response) => {
    console.log(response);
    this.loadPets();
  })
  console.log(`New pet name = ${name}`);
}

deletePet(_id: string) {

  this.http.post('api/deletePet', {_id}).subscribe((response) => {
    console.log(response);
    this.loadPets();
  })
  console.log(`Deleting ${_id}`);
}

updatePet(_id: string) {

  this.http.post('api/updatePet', {_id}).subscribe((response) => {
    console.log(response);
    this.loadPets();
  })
  console.log(`Updating ${_id} `);
}

filterPetState(state: string) {
  this.http.post('api/getPetsByState', {state}).subscribe((response) => {
    this._pets.next((response as any).result);
    console.log(response);
  })
  console.log(`Getting pets in ${state} `);
}

filterPetStatus(status: string) {
  this.http.post('api/getPetsByStatus', {status}).subscribe((response) => {
    this._pets.next((response as any).result);
    console.log(response);
  })
  console.log(`Getting ${status} pets `);
}

}


