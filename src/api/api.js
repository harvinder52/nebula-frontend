async function fetchData(id) {
  const GOOGlE_FORM_URL = `https://docs.google.com/forms/d/e/${id}/viewform`;

  const response = await fetch(`http://127.0.0.1:8000/?url=${GOOGlE_FORM_URL}`);
  const data = await response.json();
  console.log("fetcdata from API", data);

  return data;
}
export default fetchData;
