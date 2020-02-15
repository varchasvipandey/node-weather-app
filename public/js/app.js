const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");
const msg3 = document.querySelector("#msg-3");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  msg1.textContent = `Loading....`;
  msg2.innerHTML = "";
  msg3.innerHTML = "";

  //make api call
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        msg1.innerHTML = `Errror: ${data.error}`;
        msg2.innerHTML = "";
        msg3.innerHTML = "";
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast.summary;
        msg3.innerHTML = `<strong>Temperature</strong>: ${data.forecast.temperature}`;
      }
    });
  });
});

//modified one
