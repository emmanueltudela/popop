const food = [... "🍇🍈🍉🍊🍋🍋‍🟩🍌🍍🥭🍎🍏🍐🍑🍒🍓🫐🥝🍅🫒🥥🥑🍆🥔🥕🌽🌶️🫑🥒🥬🥦🧄🧅🍄‍🟫🍄🥜🫘🌰🍞🥐🥖🫓🥨🥯🥞🧇🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🫔🥙🧆🍳🥘🍲🥣🥗🍿🧂🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🥮🍡🥟🥠🥡🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯🍼🥛☕🫖🍵🍶🍾🍷🍸🍹🍺🍻🥂🥃🥤🧋🧃🧉🧊"];

const min_size = 50;
const max_size = 100;
const max_food = 50;
const gravity = 10;
const spawn_rate = 500;

let foods = [];
let score = 0;

const cat = document.querySelector("#cat");
const score_e = document.querySelector("#score");

function random_food() {
  return food[Math.floor(Math.random() * food.length)];
}

function random_size() {
  return Math.floor(Math.random() * (max_size - min_size)) + min_size;
}

function random_pos() {
  return Math.floor(Math.random() * window.innerWidth);
}

function new_food_element() {
  let element = document.createElement("div");
  element.setAttribute("class", "food");
  element.innerHTML = random_food();
  element.style.fontSize = random_size() + "px";
  element.left = random_pos();
  element.style.left = element.left + "px";
  return element;
}

document.onmousemove = (e) => {
  cat.left = e.clientX - 128 / 2;
  cat.style.left = e.clientX - 128 / 2 + "px";
};

let last_update = 0;
let last_spawn = 0;
function update() {
  if (foods.length < max_food && Date.now() - last_spawn >= spawn_rate) {
    last_spawn = Date.now();
    let food_e = new_food_element();
    food_e.top = 0;
    food_e.style.top = "0px";
    document.body.appendChild(food_e);
    foods.push(food_e);
  }

  if (Date.now() - last_update >= 1000 / 60) {
    last_update = Date.now();
    for (let i = foods.length - 1; i >= 0; i--) {
      let food_e = foods[i];

      food_e.top = food_e.top + gravity;
      food_e.style.top = food_e.top + "px";
      if (food_e.top >= window.innerHeight) {
        foods.splice(i, 1);
      } else if (food_e.left > cat.left - 128 / 2 && food_e.left < cat.left + 128/2 && food_e.top >= window.innerHeight - 128) {
        foods.splice(i, 1);
        food_e.remove();
        score++;
        score_e.innerText = score;
      }
    }
  }
  requestAnimationFrame(update);
}

update();
