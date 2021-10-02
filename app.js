"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const levelMap = [
    ["W", "W", "P", "W", "W"],
    ["W", "W", "C", "W", "W"],
    ["C", "C", "W", "C", "C"],
    ["C", "C", "W", "C", "C"],
  ];

  let playerX = 2;
  let playerY = 0;
  let deathcount = 0;
  let wincount = 0;
  const LEFT_BOUNDARY = -1;
  const RIGHT_BOUNDARY = levelMap[0].length;

  document.getElementById("left").addEventListener("click", function () {
    movePlayer(-1);
  });
  document.getElementById("straight").addEventListener("click", function () {
    movePlayer(0);
  });
  document.getElementById("right").addEventListener("click", function () {
    movePlayer(1);
  });

  function initialiseGrid() {
    const gameGrid = document.querySelector(".grid");
    for (let row = 0; row < levelMap.length; row++) {
      for (let col = 0; col < levelMap[row].length; col++) {
        let tileType = levelMap[row][col];
        let tile = makeTile(row, col, tileType);
        gameGrid.appendChild(tile);
      }
    }
  }

  function makeTile(row, col, tileType) {
    let tile;
    if (tileType === "C") {
      tile = attributeSetter("./images/croc.png", "croc");
    } else if (tileType === "P") {
      tile = attributeSetter("./images/swimmer.png", "player");
    } else {
      tile = attributeSetter("./images/water.png");
    }
    tile.setAttribute("row", row);
    tile.setAttribute("col", col);
    return tile;
  }

  function attributeSetter(image, id = "") {
    let tile = document.createElement("img");
    tile.setAttribute("src", image);
    tile.setAttribute("id", id);
    return tile;
  }

  function movePlayer(xCoordShift) {
    if (wallCollision(playerX, xCoordShift)) {
      return;
    }
    if (crocCollision(xCoordShift)) {
      gameOver(xCoordShift);
      return;
    }
    removeOldLocation();
    playerX += xCoordShift;
    playerY += 1;
    drawNewLocation();
    if (checkWin()) {
      winGame();
    }
  }

  function removeOldLocation() {
    let currentLocation = document.querySelector(
      `img[col="${playerX}"][row="${playerY}"]`
    );
    console.log(currentLocation);
    currentLocation.src = "./images/water.png";
  }

  function drawNewLocation(image = "./images/swimmer.png") {
    let newLocation = document.querySelector(
      `img[col="${playerX}"][row="${playerY}"]`
    );
    newLocation.src = image;
  }

  function wallCollision(currentX, xCoordShift) {
    let newX = (currentX += xCoordShift);
    return newX === LEFT_BOUNDARY || newX === RIGHT_BOUNDARY;
  }

  function crocCollision(xCoordShift) {
    let crocCheck = document.querySelector(
      `img[col="${playerX + xCoordShift}"][row="${playerY + 1}"]`
    );
    return crocCheck.id === "croc";
  }

  function checkWin() {
    return playerY === 3;
  }

  function winGame() {
    document.querySelector("span[class=wincount]").innerText = wincount += 1;
    setTimeout(function () {
      newGame();
    }, 1500);
  }

  function gameOver(xCoordShift) {
    removeOldLocation();
    playerX += xCoordShift;
    playerY += 1;
    drawNewLocation("./images/blood.png");
    document.querySelector("span[class=deathcount]").innerText =
      deathcount += 1;
    setTimeout(function () {
      newGame();
    }, 1500);
  }

  function newGame() {
    const gameGrid = document.querySelector(".grid");
    gameGrid.innerHTML = "";
    playerX = 2;
    playerY = 0;
    initialiseGrid();
  }

  newGame();

  // create river: 4 rows of 5 columns - done
  // create crocs - done
  // create player - done
  // create ui - 3 buttons - done
  // handle player movement - done
  // handle collision detection: walls - done
  // handle collision detection: crocs - done
  // handle end game
});
