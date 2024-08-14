# Shiny Tracker <img src="./readme-assets/pikachu.png" alt="pikachu" width ="50" />  
This website is designed to help Pokemon players catch shiny Pokemon.  

Shiny Pokemon are a special variant from the regular Pokemon, featuring a different color scheme and battle animation. The odds of encountering one are extremely low (1 in 8192 in some games). Player can keep track of their hunts, their chances of finding a shiny, and mark when they are found.   

Developed in 3 weeks in collaboration with [Cjt101](https://github.com/cjt101) and [sezavala](https://github.com/sezavala), during our time as a Software Intern w/ CodeDay & Computing Talent Intiative. Our mentor was Principal Software Engineer [Milton Wong](https://www.linkedin.com/in/miltonwong2000/).

## 🎥 Demo Videos: 
### Infopage:

https://github.com/user-attachments/assets/a88a9146-fd9c-4709-b225-4eba75cfb3d5

## 📷 Screenshots: 

# Running This Website: <img src="./readme-assets/jigglypuff.png" alt="jigglypuff" width="50" /> 
Make sure to install dependencies before downloading the repo. Note that, upon running the website locally, the file size will approximately be 350mb. 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2, [Node.js v20.16.0](https://nodejs.org/en). Below are instructions for Windows 10 / 11. 

### A. Install Dependencies:
1. Download and install [Nodejs](https://nodejs.org/en).
2. Download and install a Integrated Development Environment. e.g. [Visual Studio Code](https://code.visualstudio.com/download). 

### B. Download the Repo:
1. Click on "<> Code" in the top right corner of the repository.
2. Click on the "Local" tab.
3. Click on "Download ZIP" and extract.

### C. Load the server:
1. Open your integrated development environment
2. In your IDE, open the folder and, using the terminal, navigate to the root folder.
3. In your terminal, run $ `npm install`.
4. Followed by $ `ng serve` to load dev server.
5. Navigate to `http://localhost:4200/`.

### D. How to Use:
1. Start a hunt by clicking on "Start".
2. Select your generation, pokemon, and the method to catch the pokemon.
3. Repeat for more hunts.

# Project Design:  <img src="./readme-assets/wobuffet.png" alt="wobbuffet" width="50" />  

## Deliverables:
- [x] Flow of Control for User actions
- [x] Wireframe / Mockup that demonstrates the UI/UX
- [x] Video demo of functional website on local machine
- [x] Readme that helps people how to install the program


## Resources: 
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

## Constraints:
1. Must be Complete by August 16, 2024.
2. Limited Understanding of Angular & Typescript after working with these technologies on an [Oppia](https://github.com/sezavala/oppia), an open-source project
   
## Requirements:
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

## UI Design:

### Flow of Control:
<p align="center">
<img src="./readme-assets/User Flow of Control.png" alt="Flow of Control" width ="600" />
</p>

### Home Page Mockup:
<p align="center">
<img src="./readme-assets/Homepage Mockup.png" alt="Home Page Mockup" width="600"/>
</p>

### Hunt Mockup:
<p align="center">
<img src="./readme-assets/Hunt Instance Mockup.png" alt="Hunt Mockup" width="600"/>
</p>

# Credits:
Pokemon and Pokemon character names are trademarks of the Pokemon Company.

Special thanks to [PokeAPI](https://pokeapi.co/), which was used for the retrieval of games and Pokemon.
