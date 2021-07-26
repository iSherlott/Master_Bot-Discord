module.exports = (value) => {
  let newValue = parseInt(value);
  newValue = [...newValue.toString()].reverse();
  let finalValue = [];
  let cont = 0;

  for (let key of newValue) {
    finalValue.push(key);

    cont += 1;
    if (cont == 3) {
      finalValue.push(" ");
      cont = 0;
    }
  }

  finalValue = finalValue.reverse();
  return finalValue.toString().replace(/[,]/g, "").trim();
};
