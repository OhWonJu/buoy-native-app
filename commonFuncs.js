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
  if (rule(dom, sub) === "Q1") {
    return "#eb2f06";
  } else if (rule(dom, sub) === "Q2") {
    return "#E87C40";
  } else if (rule(dom, sub) === "Q3") {
    return "#9EEF14";
  }
  return "#3897f0";
}

export function getAperB(A, B) {
  return getQuartile(A, B, commonRule);
}
