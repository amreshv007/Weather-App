function autoRefresh(cnt){
	var citycount = cnt;
	var time3 = new Date();
	let x23 = String(time3);
	let x11 = x23.split(" ");
	try{
		let getWeather = JSON.parse(localStorage.getItem('Weather_Data'));
		console.log('cityname: ',getWeather[citycount].city_name);
		console.log(getWeather);
		var cityname3 = document.getElementById("city_name");
		cityname3.innerHTML = ""+getWeather[citycount].city_name+"<i class='fa fa-map-marker'></i><span class='today'>Today</span>";
		var weather_report = document.getElementById("weather_state");
		var w_report = getWeather[citycount].day[0].weather.description;
		weather_report.innerHTML = w_report;
		var curr = document.getElementById("curr_temp");
		curr.innerHTML = ""+getWeather[citycount].day[0].temp+"<sup>°</sup><span class='unit'>c</span>";
		var day1 = document.getElementById("tomor_temp");
		day1.innerHTML = "<i class='wi wi-night-cloudy'></i>"+getWeather[citycount].day[1].temp+"<sup>&deg;</sup>";
		var day2 = document.getElementById("day2_temp");
		day2.innerHTML = "<i class='wi wi-night-cloudy'></i>"+getWeather[citycount].day[2].temp+"<sup>&deg;</sup>";
		var day3 = document.getElementById("day3_temp");
		day3.innerHTML = "<i class='wi wi-night-cloudy'></i>"+getWeather[citycount].day[3].temp+"<sup>&deg;</sup>";
		var day4 = document.getElementById("day4_temp");
		day4.innerHTML = "<i class='wi wi-night-cloudy'></i>"+getWeather[citycount].day[4].temp+"<sup>&deg;</sup>";
		var time1 = document.getElementById("curr_time");
		time1.innerHTML = x11[0]+" "+x11[1]+" "+x11[2]+" "+x11[3]+" "+x11[4]+"";
		 dayarr = ["Mon","Tues","Wed","Thurs","Fri","Sat","Sun"];
		 let temp = 0;
		 for(let i=0;i<dayarr.length;i++){
		 	if(dayarr[i] === x11[0]){
		 		temp = i+1;
		 		break;
		 	}
		 }
		// Write days in Weather App
		let day01 = document.getElementById("day01");
		let day02 = document.getElementById("day02");
		let day03 = document.getElementById("day03");
		let day04 = document.getElementById("day04");
		day01.innerHTML = dayarr[temp%7];
		day02.innerHTML = dayarr[(temp+1)%7];
		day03.innerHTML = dayarr[(temp+2)%7];
		day04.innerHTML = dayarr[(temp+3)%7];
	}
	catch(e){
		alert("No Data Saved. Please add cities.")
	}
}
autoRefresh(0);