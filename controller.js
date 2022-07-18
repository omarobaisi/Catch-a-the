const removeFrogClick = function () {
  $(".frog").each(function () {
    $(this).click(function () {
      const id = $(this).attr("id");
      frog.removeFrog(id);
      render();
      $(".frogNumber").text(frog.numFrogs());
      if (frog.numFrogs() === 0) {
        frogsRenderer();
        addOneSec();
      }
    });
  });
};

const startGame = function () {
  $(".start").click(function () {
    changeTime(5);
    $(".looseMessage").removeClass("show");
    $(".start").toggleClass("hide");
    $(".afterStart").toggleClass("show");
    frogsRenderer();
  });
};
startGame();
