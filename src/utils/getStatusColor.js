
module.exports = (status) => {
  if (status == 0) return "green";
  if (status == 1) return "lightgrey";
  if (status == 2) return "yellow";
  if (status == 3) return "#D46905";
  if (status == 4) return "white";
  if (status == 5) return "red";
  return false
};
