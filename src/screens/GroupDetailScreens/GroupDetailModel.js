export async function _GET_PAGE(endPoint, oldData, setData, setPage) {
  try {
    const response = await fetch(endPoint);
    const json = await response.json();
    let newData = oldData.concat(json);
    setData(newData);
    setPage((prev) => prev + 1);
  } catch (e) {}
}
