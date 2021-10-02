document.addEventListener("DOMContentLoaded", () => {
  const levelMap = [
    ["Water", "Water", "Player", "Water", "Water"],
    ["Water", "Water", "Croc", "Water", "Water"],
    ["Croc", "Croc", "Water", "Croc", "Croc"],
    ["Croc", "Croc", "Water", "Croc", "Croc"],
  ];

  const gameGrid = document.querySelector(".grid");

  function createBoard() {
    for (let row = 0; row < levelMap.length; row++) {
      for (let col = 0; col < levelMap[row].length; col++) {
        let tile = document.createElement("img");
        if (levelMap[row][col] === "Croc") {
          tile.setAttribute("src", "./images/croc.png");
        } else if (levelMap[row][col] === "Player") {
          tile.setAttribute("src", "./images/swimmer.png");
        } else {
          tile.setAttribute("src", "./images/water.png");
        }
        tile.setAttribute("row", row); // might not need this
        tile.setAttribute("col", col); // might not need this
        gameGrid.appendChild(tile);
      }
      // let breaker = document.createElement("div");
      // breaker.setAttribute("class", "break");
      // gameGrid.appendChild(breaker);
    }
  }

  createBoard();

  // create river: 4 rows of 5 columns - done
  // create crocs -
  // create player
  // create ui - 3 buttons
  // handle player movement
  // handle collision detection: walls
  // handle collision detection: crocs
  // handle end game
});
