# __Blind Printing Simulator__

# [Current website](https://qbr-dude.github.io/blind-printing-simulator) on _Github Pages_

## Technology Stack
    - React
    - Redux
    - Bootstrap
    - Axios

## Deployment
Download project, install dependencies (using `npm install`), run application (using `npm start`)

## App Description
The application performs the functions of a blind printing simulator. 

Text is loaded from the API, which is divided into separate characters for convenient work with their highlighting. Correct input is _green_, incorrect input is _red_. Pressing the function keys (**Shift**, **Alt**, **Ctrl**) is ignored, so uppercase letters may not work when typing quickly. If you enter incorrectly, you cannot go back, the letter is marked as incorrect and the input continues.

When printing, information is displayed on the right: 
- the current speed per second
- the number of incorrectly entered characters
- the accuracy of the input. Additionally - total time and total speed.

When the text ends, a new one is loaded and the information is reset to zero.