export async function _GET(endPoint, setData, setLoading) {
  try {
    const response = await fetch(endPoint);
    const json = await response.json();
    setData(json);
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
}
