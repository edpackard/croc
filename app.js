"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const levelMap = [
    ["W", "W", "P", "W", "W"],
    ["W", "W", "C", "W", "W"],
    ["C", "C", "W", "C", "C"],
    ["C", "C", "W", "C", "C"],
  ];

  let playerX;
  let playerY;
  let deathCount = 0;
  let winCount = 0;
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
    removeOldLocation();
    playerX += xCoordShift;
    playerY += 1;
    if (crocCollision()) {
      endGame("./images/blood.png", "deathcount");
      return;
    }
    drawNewLocation();
    if (checkWin()) {
      endGame("./images/trophy.png", "wincount");
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

  function crocCollision() {
    let crocCheck = document.querySelector(
      `img[col="${playerX}"][row="${playerY}"]`
    );
    console.log(crocCheck);
    return crocCheck.id === "croc";
  }

  function checkWin() {
    return playerY === 3;
  }

  function endGame(img, count) {
    drawNewLocation(img);
    let countType =
      count === "deathcount" ? (deathCount += 1) : (winCount += 1);
    document.querySelector(`span[class=${count}]`).innerText = countType;
    resetGame();
  }

  function resetGame() {
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
});
