const frogModel = function () {
  let frogs = [];
  let length = frogs.length;
  let level = 0;

  const getFrogs = () => frogs;

  const addFrog = function (newFrog) {
    frogs.push(newFrog);
    length += 1;
  };

  const removeFrog = function (frogID) {
    for (let i = 0; i < frogs.length; i++) {
      if (frogs[i].id == frogID) {
        frogs.splice(i, 1);
        length -= 1;
      }
    }
  };

  const emptyFrogs = () => (frogs = []);

  const numFrogs = () => length;

  const newLevel = () => {
    level += 1;
    return level;
  };

  return {
    getFrogs: getFrogs,
    addFrog: addFrog,
    removeFrog: removeFrog,
    emptyFrogs: emptyFrogs,
    numFrogs: numFrogs,
    newLevel: newLevel,
  };
};

const frog = frogModel();
