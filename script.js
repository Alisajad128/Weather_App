let getCity = document.getElementsByClassName("container-1");
let state = document.getElementById("state");
let city = document.getElementById("city");
let check = document.getElementById("check");
let checkLocation = document.getElementById("checkLocation");

let api;
check.addEventListener("click" ,e =>{
  if (city.value != ""){
    requestApi(city.value);
  }
  else{
    state.innerText = "Please Enter a City name";
  }
})

checkLocation.addEventListener("click", ()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  else{
    alert("Your Browser Can Not Support The Geolocation!")
  }
});
function onSuccess(position){
  const {latitude , longitude} = position.coords;
  api = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=af93a50fc7728955ec3b07923ff7954e";
  fetch(api).then(response => response.json())
.then(data => {
  document.getElementById("con-1").style.display = "none"
  document.getElementById("con-2").style.display = "block"
  document.getElementById("weather-icon").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon+".png";
  document.getElementById("displayTemp").innerText = Number(data.main.temp).toFixed(1)+"◦";
  document.getElementById("location").innerText = data.name;
  document.getElementById("weather-state").innerText = "wether"+data.weather[0].description;
  document.getElementById("feels").innerText = Number(data.main.feels_like).toFixed(1)+"◦C"+"\nFeels like";
  document.getElementById("humidity").innerText = Number(data.main.humidity).toFixed(1)+"%"+"\nHumifity";
})};
function onError(error){
  state.innerText = error.message;
  state.style.backgroundColor = "rgb(240, 162, 107)";
}
function requestApi(cityName){
  api = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=af93a50fc7728955ec3b07923ff7954e';
  fetch(api).then(response => response.json())
.then(data => {
  if (data.cod == "404"){
    document.getElementById("state").innerText = "The City Name Is Invalid!"
  }
  else{
    document.getElementById("con-1").style.display = "none"
    document.getElementById("con-2").style.display = "block"
    document.getElementById("state").innerText = "Getting weather details...";
    document.getElementById("weather-icon").src = "http://openweathermap.org/img/wn/" + data.list[1].weather[0].icon+".png";
    document.getElementById("displayTemp").innerText = Number(data.list[1].main.temp).toFixed(1)+"◦";
    document.getElementById("location").innerText = cityName;
    document.getElementById("weather-state").innerText = "wether"+data.list[1].weather[0].description;
    document.getElementById("feels").innerText = Number(data.list[1].main.feels_like).toFixed(1)+"◦C"+"\nFeels like";
    document.getElementById("humidity").innerText = Number(data.list[1].main.humidity).toFixed(1)+"%"+"\nHumifity";
  }
  })};
   