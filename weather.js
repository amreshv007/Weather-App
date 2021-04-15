function add_cities(city1){
  console.log("=================");
  console.log("A"+city1+"B");
	let weather_data = [];
	console.log("Helloooo");
	var apikey = "15283fb4d31e8682ce4b82b09ada9fd1";
	var current = new Date();
	var curr_hr = current.getHours();
	console.log(curr_hr);
	var x = curr_hr%3;
	var time; // time for other days' data
	if(x === 1){
		time = curr_hr - 1;
	}
	else if(x === 2){
		time = curr_hr + 1;
	}
	else{
		time = curr_hr;
	}
	// find current weather details
	curr_link = "https://api.openweathermap.org/data/2.5/weather?q="+city1+"&appid="+apikey+"&units=metric";
	fetch(curr_link).then(response => response.json()).then(data => {
    console.log(data);
    	let today_data = {
    		city_name	: data.name,
        day       : [{
                    id          : data.id,
                    temp        : Math.round(data.main.temp),
                    temp_min    : Math.round(data.main.temp_min),
                    temp_max    : Math.round(data.main.temp_max),
                    wind_speed  : data.wind.speed,
                    weather     : {
                                    main        : data.weather[0].main,
                                    description : data.weather[0].description,
                                  },
                    }]
    	};
    	weather_data.push(today_data);
  	}).catch(() => {
    	alert("Please search for a valid city");
  	});
	// find next 5 days weather data
	next_days_link = "https://api.openweathermap.org/data/2.5/forecast?q="+city1+"&appid="+apikey+"&units=metric";
	fetch(next_days_link).then(response => response.json()).then(data => {
    	console.log(data);
    	var day_count = 0;
    	console.log("TTT"+time);
    	if(time == "24"){
    		time = "00";
    	}
    	for(var i=0;i<data.cnt;i++){
    		var date_txt = data.list[i].dt_txt;
    		var time_arr = date_txt.split(" ");
    		var time_txt = time_arr[1];
    		var hr_txt = time_txt.split(":")[0];
    		if(hr_txt == time){
    			if(day_count > 0){
    				let next_data = {
			    		id 			    : data.city.id,
			    		temp 		    : Math.round(data.list[i].main.temp),
			    		temp_min	  : Math.round(data.list[i].main.temp_min),
			    		temp_max	  : Math.round(data.list[i].main.temp_max),
			    		wind_speed	: data.list[i].wind.speed,
              weather     : {
                              main        : data.list[i].weather[0].main,
                              description : data.list[i].weather[0].description,
                            },
			    	};
            try{
			    	  weather_data[0].day.push(next_data);
            }
            catch(e){
              console.log(e);
            }
    			}
    			day_count = day_count + 1;
    		}
    	}
    	console.log(weather_data);
      let check_val = JSON.parse(localStorage.getItem('Weather_Data'));
      if(check_val == null){
        console.log("If no data!");
          localStorage.setItem('Weather_Data', JSON.stringify(weather_data));
      }
      else{
        console.log("If some data!");
        let getWeather = JSON.parse(localStorage.getItem('Weather_Data'));
        let temp = 0;
        for(let i=0;i<getWeather.length;i++){
          let city_name1 = getWeather[i].city_name;
          if(city_name1 === data.city.name){
            temp = 1;
            break;
          }
        }
        if(temp === 0){
            getWeather.push(weather_data[0]);
            localStorage.clear();
            localStorage.setItem('Weather_Data', JSON.stringify(getWeather));
        }
        else{
          console.log(city1+" is already added!");
          alert(city1+" is already added!");
          return;
        }
      }
      let getWeather1 = JSON.parse(localStorage.getItem('Weather_Data'));
      console.log(getWeather1);
      location.reload();
  	}).catch(() => {
    	console.log("Please search for a valid city");
      alert("Please search for a valid city");
  });
}
// Add One City
function add_this_city(){
  let get_city1 = document.getElementById("add_city10");
  add_cities(get_city1.value);
}
// Refresh the city data by passing the index of city object[stored on localstorage] as an argumant.
function refreshData(){
  let getWeather01 = JSON.parse(localStorage.getItem('Weather_Data'));
  console.log(getWeather01.length);
  localStorage.clear();
  for(let i=0;i<getWeather01.length;i++){
    let each_city = getWeather01[i].city_name;
    add_cities(each_city);
  }
}
// To fet the data from localstorage and displaying on 2nd screen row wise
function get_cityTable(){
  try{
    let getWeather = JSON.parse(localStorage.getItem('Weather_Data'));
    console.log("+++++++");
    console.log(getWeather);
    for(let i=0;i<getWeather.length;i++){
      let city = getWeather[i].city_name;
      let temp = getWeather[i].day[0].temp;
      var citytable = document.getElementById("citytable");
      var newcontent = document.createElement('div');
      newcontent.innerHTML = "<div style='margin-bottom:5px;padding: 0px 0px 5px 6px;'><input type='checkbox' style='margin-right:5px;' class='eachcheck1' name='dlt_checks' value='"+city+"' /><p id='city_button"+i+"' value='"+city+"'>"+city+" - "+temp+"<sup>&deg;</sup></p><hr style='margin-top: revert;'></div>";
      citytable.appendChild(newcontent.firstChild);
    }
  }
  catch(e){
    console.log("No Data in localStorage");
  }
}
// Toggle the Search Button
$('#btnclick').on('click', function(){
  let x = document.getElementById("city_search");
  $('#city_search').toggle();
});
// To show the city details on pressing the left or right button on first screen
var slideIndex = 0;
function showDivs(n) {
  let x = JSON.parse(localStorage.getItem('Weather_Data'));
  let len = x.length;
  if(n >= len){ slideIndex = 0 }
  if(n < 0){ slideIndex = len - 1 }
  autoRefresh(slideIndex);
}
function plusDivs(n) {
  showDivs(slideIndex += n);
}

function delete_city(ctyarr){
  let storedata = [];
  let getW = JSON.parse(localStorage.getItem('Weather_Data'));
  localStorage.removeItem('Weather_Data');
  for(let j=0;j<getW.length;j++){
    let city00 = getW[j].city_name;
    let t = 0;
    for(let i=0;i<ctyarr.length;i++){
      if(city00 === ctyarr[i]){
        t = 1;
        break;
      }
    }
    if(t === 0){
      storedata.push(getW[j]);
    }
  }
  try{
    localStorage.setItem('Weather_Data', JSON.stringify(storedata));
  }
  catch(e){
    console.log("Data not saved!");
  }
  location.reload();
}
$("#delete_bnt").on('click', function(){
  $("#cancel_bnt").show();
   $(".eachcheck1").show();
  let check0 = document.getElementsByClassName('eachcheck1');
  let cityarr = [];
  let y = 0;
  for(let i=0;i<check0.length;i++){
    if(check0[i].checked){
      cityarr.push(check0[i].value);
      y = 1;
    }
  }
  if(y === 1){
    delete_city(cityarr);
  }
});
$("#cancel_bnt").on('click', function(){
  let check0 = document.getElementsByClassName('eachcheck1');
  for(let i=0;i<check0.length;i++){
    check0[i].checked = false;
  }
  location.reload();
});
