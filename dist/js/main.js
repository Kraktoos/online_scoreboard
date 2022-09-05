let swap_button;
let grid_container;
const game_container = document.querySelector("#game-container");
let relative_elements;

function startGame(players, max_points, best_of) {
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

  swap_button.addEventListener("click", () => {
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
    relative_elements = document.querySelectorAll(".relative-element");
  });
}

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
