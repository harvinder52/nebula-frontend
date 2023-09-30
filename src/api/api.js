import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../features/formSlice";
import axios from "axios";

async function fetchData(id) {
  const dispatch = useDispatch();
  const GOOGlE_FORM_URL = `https://docs.google.com/forms/d/e/${id}/viewform`;
  console.log(GOOGlE_FORM_URL);
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/?url=${GOOGlE_FORM_URL}`
    );
    const result = response.data;

    dispatch(setFormData(result));
  } catch (error) {
    console.error("API request error:", error);
  } finally {
    console.log("true param url");
  }
}
export default fetchData;
