# LostPet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Use the application

Application running on port 4200.

Starting the application:
	- cd to client folder and run 'npm install', then 'npm start'
	- cd to api folder and run 'npm install express --save', then 'node .'

Home Page: displays all the pets already added to the database. Each pet has a card showing their names, a picture, their location, and whether or not they are missing or have been found.

Filters: the user can filter the search by choosing a state or a status. By clicking the button 'filter' for each one will make their search filter what they want to see. By clicking the 'Show All', the user will see all the pets in the database again.

Pet cards: By clicking a pet card, the user will be send to the pet page that will show aditional details, such as their age, the pet's type, and different functionalities.

Delete Pet: Once on the pet page, the user has the possibility to delete the pet from the database by clicking the 'Delete Pet' button. Once it is done, the user is send back to the home page automaticaly and the pet will no longer appear on it.

Mark as Found: Once the pet has been found, the user has the possibility to mark it as such by clicking the button 'Mark as Found'. By doing so, the status of the pet will instantanely change to 'Found'.

Back to Home: Once on the pet page, the user can also go back home by pressing that button.

Add Page: the user can fill out a form and enter their pet details, then by submitting it the pet will be added to the database and the user will be send back to home page where their pet now appears.

About Page: Information about the application.