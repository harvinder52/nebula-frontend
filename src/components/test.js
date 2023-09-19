// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
var url =
  "https://docs.google.com/forms/d/e/1FAIpQLSdMcf4ie0pBmM4gG77dtgw2mNjUB6q_lxaXlfKEuYlLgi5EDA/formResponse"; //action url

fetch(url, {
  method: "POST",
  mode: "no-cors",
  header: {
    "Content-Type": "application/json",
  },
  body: getInputData(),
})
  .then((data) => {
    console.log(data);
    alert("Form Submitted");
  })
  .catch((err) => console.error(err));

//populating input data
function getInputData() {
  let dataToPost = new FormData(); //formdata API

  //fill name attributes to corresponding values
  dataToPost.append("entry.227649005", "harvindergeek@gmail.com");
  dataToPost.append("entry.790080973", "asjfsbf@gmail.com");
  dataToPost.append("entry.790080973", "asjfsbf@gmail.com");
  dataToPost.append("entry.1633920210", "Harvinder Singh");
  dataToPost.append("entry.1846923513", "jndlbGLJB@gmail.com");

  return dataToPost;
}
