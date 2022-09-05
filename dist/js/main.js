let swap_button;
let grid_container;
let add_buttons;
let last_play;
const game_container = document.querySelector("#game-container");
const create_game = document.querySelector("#create-game");
let relative_elements;

function startGame(players, max_points, max_sets) {
  create_game.innerHTML = ``;
  create_game.style.display = "none";

  game_container.innerHTML = `
  <button id="swap-button">
    <iconify-icon icon="fluent:arrow-swap-24-regular"></iconify-icon>
  </button>
  <div id="grid-container">
    <div class="grid-item">
      <div class="relative-element">
        <div class="player-name" id="red-player-name">${players[0].name}</div>
        <button class="btn red" id="red-btn">0</button>
        <div class="sets-count left red" id="red-sets-count">0</div>
      </div>
    </div>
    <div class="grid-item">
      <div class="relative-element">
        <div class="player-name" id="blue-player-name">${players[1].name}</div>
        <button class="btn blue" id="blue-btn">0</button>
        <div class="sets-count right blue" id="blue-sets-count">0</div>
      </div>
    </div>
  </div>
  `;

  swap_button = document.querySelector("#swap-button");
  grid_container = document.querySelector("#grid-container");
  add_buttons = document.querySelectorAll(".btn");

  for (let button of add_buttons) {
    button.addEventListener("click", function () {
      button.innerHTML = parseInt(button.innerHTML) + 1;
      checkWinner(max_points, max_sets);
    });
  }

  swap_button.addEventListener("click", () => {
    swapElements(max_points, max_sets);
  });
}

function checkWinner(max_points, max_sets) {
  const red_btn = document.querySelector("#red-btn");
  const blue_btn = document.querySelector("#blue-btn");
  const red_sets_count = document.querySelector("#red-sets-count");
  const blue_sets_count = document.querySelector("#blue-sets-count");

  console.log(red_btn.innerHTML, blue_btn.innerHTML);

  if (parseInt(red_btn.innerHTML) >= max_points && parseInt(red_btn.innerHTML) - parseInt(blue_btn.innerHTML) >= 2) {
    red_sets_count.innerHTML = parseInt(red_sets_count.innerHTML) + 1;
    red_btn.innerHTML = 0;
    blue_btn.innerHTML = 0;
    if (red_sets_count.innerHTML == max_sets) {
      alert("Red player won!");
      resetGame();
    }
  } else if (parseInt(blue_btn.innerHTML) >= max_points && parseInt(blue_btn.innerHTML) - parseInt(red_btn.innerHTML) >= 2) {
    blue_sets_count.innerHTML = parseInt(blue_sets_count.innerHTML) + 1;
    red_btn.innerHTML = 0;
    blue_btn.innerHTML = 0;
    if (blue_sets_count.innerHTML == max_sets) {
      alert("Blue player won!");
      resetGame();
    }
  }
}

swapElements = (max_points, max_sets) => {
  relative_elements = document.querySelectorAll(".relative-element");
  relative_elements.forEach((element) => {
    element.querySelector(".sets-count").classList.toggle("left");
    element.querySelector(".sets-count").classList.toggle("right");
  });
  const swapped_content = `
    <div class="grid-item">
      <div class="relative-element">
        ${relative_elements[1].innerHTML}
      </div>
    </div>
    <div class="grid-item">
      <div class="relative-element">
        ${relative_elements[0].innerHTML}
      </div>
    </div>
    `;
  grid_container.innerHTML = swapped_content;

  add_buttons = document.querySelectorAll(".btn");
  for (let button of add_buttons) {
    button.addEventListener("click", function () {
      button.innerHTML = parseInt(button.innerHTML) + 1;
      checkWinner(max_points, max_sets);
    });
  }
};

function resetGame() {
  game_container.innerHTML = ``;
  create_game.style.display = "flex";

  create_game.innerHTML = `
  <div class="name-picker">
    <input type="text" id="player1-name" value="Player 1" />
    <input type="text" id="player2-name" value="Player 2" />
    <input type="number" id="max-points" value=11 />
    <input type="number" id="max-sets" value=3 />
    <button id="start-game">Start</button>
  </div>
  `;
  const startGameButton = document.querySelector("#start-game");
  startGameButton.addEventListener("click", () => {
    const players = [{ name: document.querySelector("#player1-name").value }, { name: document.querySelector("#player2-name").value }];
    const max_points = document.querySelector("#max-points").value;
    const max_sets = document.querySelector("#max-sets").value;
    startGame(players, max_points, max_sets);
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  resetGame();
});
