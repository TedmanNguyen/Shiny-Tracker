# Shiny Tracker
Shiny Tracker is a website designed to help Pokemon players catch shiny Pokemon.   

>>>>> include photo


Developed in 3 weeks in collaboration with [Cjt101](https://github.com/cjt101) and [sezavala](https://github.com/sezavala), during our time as a Software Intern w/ CodeDay & Computing Talent Intiative. 

### 🎥 Demo Video: 



## Deliverables:
- [x] Flow of Control for User actions
- [x] Wireframe / Mockup that demonstrates the UI/UX
- [x] Video demo of functional website on local machine
- [x] Readme that helps people how to install the program

### Flow of Control: 


### Resources: 
- 3 Computer Science Students w/ meeting virtually
- 20 hours per week per student for 3 weeks
- 1 Software Engineering Mentor  
- Github Copilot 
- Angular Library  

## Scope:

### In-Scope:
1. Allow the user to create an instance of a hunt, which comes with drop down menus and buttons to select the game they’re playing, methods used, whether they have the Shiny Charm, and pokemon they’re hunting
2. Create a Main Page that stores all hunts. Users should be able to delete hunts and add more hunts.
3. Each initiated hunt should have a counter and the rate of obtaining a shiny Pokemon with the given method displayed. It should also have an image of the Pokemon to hunt for.
4. Shiny Hunting Methods should only include Generations 2 - 7 
5. Includes a 2nd page that provides an overview regarding the topic of “shiny hunting” and a short description of each shiny hunting method. Consider using Angular Material for this, as well as for other UI components.

### Out-of-Scope:
1. Shiny-hunting-methods for Generations 8 and after
2. Tracking the amount of time that the user has spent on hunting for that pokemon
3. Specific checks on whether a Pokemon can be obtained by the method chosen. Example: shiny legendary Pokemon cannot be obtained by Masuda Method since they cannot be hatched from eggs

### Constraints:
1. Must be Complete by August 16, 2024.
2. Limited Understanding of Angular & Typescript after working with these technologies on an [Oppia](https://github.com/sezavala/oppia), an open-source project
   
### Requirements:
1. Utilizing API Calls to retrieve Pokemons and Pokemon Images available
2. Storing Information from API response to be used again during single instance of hunt
3. Data persistence between hunts

## Roadmap & Milestones:
| Timeline | To-do |
| ----------- | ----------- |
| Week 0: 7/22 - 7/26 | <ul><li>- [x] Choose a project idea </li><li>- [x] Learn basics of Angular, CSS, HTML
| Week 1: 7/29 - 8/2 | <ul><li>- [x] **Deliverable**: Create Flow of Control for User Actions </li><li>- [x] **Deliverable**: Create Wireframe for UI/UX </li><li>- [x] Create a homepage </li><li>- [x] Get a successful API Response. </li><li>- [x] Create a hunt instance </li><li>- [x] Get Pokemon Sprites from API </li><li>- [x] Create a Shiny Hunt Info Page|
| Week 2: 8/5 - 8/9 | <ul><li>- [x] Create Multiple Hunt Instances </li><li>- [x] Store Hunt in stances into cookies </li><li>- [x] Define Methods and their rates </li><li>- [x] Retrieve Rates depending on generation </li><li>- [x] Data persistance between sessions w/ encounters| 
| Week 3: 8/12 - 8/16 | <ul><li>- [x] Found button </li><li>- [x] Delete Hunt Instance button </li><li>- [x] Cleanup code and Fix UI issues </li><li>- [x] Resolve bugs </li><li>- [x] **Deliverable**: Video Demo </li><li>- [x] **Deliverable**: Readme file | 






## Development server
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

