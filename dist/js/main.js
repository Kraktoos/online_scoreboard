let swap_button;
let grid_container;
let add_buttons;
let last_play;
const game_container = document.querySelector("#game-container");
let relative_elements;

function startGame(players, max_points, max_sets) {
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

  if (red_btn.innerHTML >= max_points && red_btn.innerHTML - blue_btn.innerHTML >= 2) {
    red_sets_count.innerHTML = parseInt(red_sets_count.innerHTML) + 1;
    red_btn.innerHTML = 0;
    blue_btn.innerHTML = 0;
    if (red_sets_count.innerHTML == max_sets) {
      alert("Red player won!");
    }
  } else if (blue_btn.innerHTML >= max_points && blue_btn.innerHTML - red_btn.innerHTML >= 2) {
    blue_sets_count.innerHTML = parseInt(blue_sets_count.innerHTML) + 1;
    red_btn.innerHTML = 0;
    blue_btn.innerHTML = 0;
    if (blue_sets_count.innerHTML == max_sets) {
      alert("Blue player won!");
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

document.addEventListener("DOMContentLoaded", function (event) {
  startGame(
    [
      {
        name: "Player 1",
      },
      {
        name: "Player 2",
      },
    ],
    11,
    3
  );
});
