const render = function () {
  $(".frogs").empty();
  const frogs = frog.getFrogs();
  frogs.forEach((frog) => {
    const frogHTML = `<div id="${frog.id}" class="frog"><i class="fa-solid fa-frog" style="color: ${frog.color}; font-size: ${frog.fontSize}; position: absolute; top: ${frog.top}; left: ${frog.left}"></i></div>`;
    $(".frogs").append(frogHTML);
  });
  removeFrogClick();
};

const random_rgba = function () {
  let o = Math.round,
    r = Math.random,
    s = 255,
    opacity = Math.random() * (1 - 0.5) + 0.5;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    opacity.toFixed(1) +
    ")"
  );
};

const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const flash = function (color) {
  $(".time").toggleClass(color);
  setTimeout(function () {
    $(".time").toggleClass(color);
  }, 500);
};

const frogGenerator = function (
  startFontSize,
  finishFontSize,
  startTop,
  finishTop
) {
  const frogID = frog.numFrogs() + 1;
  const frogColor = random_rgba();
  const frogFontSize = `${randomNumber(startFontSize, finishFontSize)}px`;
  const frogTop = `${randomNumber(startTop, finishTop)}px`;
  const frogLeft = `${randomNumber(0, 620)}px`;
  return {
    id: frogID,
    color: frogColor,
    fontSize: frogFontSize,
    top: frogTop,
    left: frogLeft,
  };
};

const frogsRenderer = function () {
  const frogsNumber = randomNumber(1, 4);
  $(".frogNumber").text(frogsNumber);
  const level = frog.newLevel();
  $(".levelNumber").text(level);
  flash("yellow");

  const everyFontSize = parseInt((50 / frogsNumber).toFixed(0));
  let startFontSize = 10;
  let finishFontSize = everyFontSize;

  const everyTop = parseInt((330 / frogsNumber).toFixed(0));
  let startTop = 0;
  let finishTop = everyTop;

  for (let i = 0; i < frogsNumber; i++) {
    const newFrog = frogGenerator(
      startFontSize,
      finishFontSize,
      startTop,
      finishTop
    );

    startFontSize = finishFontSize + 1;
    finishFontSize = finishFontSize + everyFontSize;

    startTop = finishTop + 1;
    finishTop = finishTop + everyTop;

    frog.addFrog(newFrog);
  }
  render();
};

let timeOut = "";
let timeNow = 0;

const timeEnded = function () {
  $(".timeNumber").text(0);
  $(".looseMessage").addClass("show");
  $(".start").toggleClass("hide");
  $(".afterStart").toggleClass("show");
  frog.emptyFrogs();
  render();
};

const changeTime = function (time) {
  $(".timeNumber").text(time);
  timeNow = time;
  timeOut = window.setTimeout(function () {
    time -= 1;
    if (time > 0) {
      changeTime(time);
    } else {
      timeEnded();
    }
    if (time >= 1 && time <= 3) {
      flash("red");
    }
  }, 1000);
};

const addOneSec = function () {
  window.clearTimeout(timeOut);
  changeTime(timeNow + 1);
};
