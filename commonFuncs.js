function commonRule(dom, sub) {
  if (sub < dom / 4) {
    return "Q1";
  } else if (sub >= dom / 4 && sub < dom * (1 / 2)) {
    return "Q2";
  } else if (sub >= dom * (1 / 2) && sub < dom * (3 / 4)) {
    return "Q3";
  }
}

export function getQuartile(dom, sub, rule) {
  let quartile = ["Q1", "Q2", "Q3", "Q4"];

  if (rule(dom, sub) === "Q1") {
    return "#eb2f06";
  } else if (rule(dom, sub) === "Q2") {
    return "#E87C40";
  } else if (rule(dom, sub) === "Q3") {
    return "#5FBF1F";
  }
  0;
  return "#3897f0";
}

export function getAperB(A, B) {
  return getQuartile(A, B, commonRule);
}
