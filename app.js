const apikey = '9082b3b6d1ff13b8f687c60a562404ea'
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
const months={0:"January",1:"February",2:"March",3:"April",4:"May",5:"June",
6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"}
const autodetect = document.getElementById('auto_detect')
const search_btn=document.getElementById('search')

const location2=document.getElementById('location2')
const date=document.getElementById('date')
const imgdescription=document.getElementById('img-description')
const description=document.getElementById('description')
const maintemp=document.getElementById('maintemp')
const feellike=document.getElementById('feellike')
const humidity=document.getElementById('humidity')
const pressure=document.getElementById('pressure')
const wind=document.getElementById('wind')

search_btn.addEventListener('click',getbysearch)

function domupdate(data,imgdata){
    location2.innerText=data.name
    const dt=new Date()
    date.innerText=`${dt.getDate()} ${months[dt.getMonth()]},${dt.getUTCFullYear()}`
    imgdescription.src=URL.createObjectURL(imgdata);
    description.innerText=`${data.weather[0].description}`;
    maintemp.innerText=`Temp : ${data.main.temp} °C`
    feellike.innerText=`Feels Like : ${data.main.feels_like} °C`
    humidity.innerText=`Humidity : ${data.main.humidity} %`
    pressure.innerText=`Pressure : ${data.main.pressure} hPa`
    wind.innerText=`Wind : ${data.wind.speed} m/s`

}

async function getbysearch(){
    const location=document.getElementById('location').value
    if(location==""){alert("Enter input Filed")}
    try {
        const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`)
        const data=await res.json()
        if(data.cod==="400")
        {alert("Invalid Location")}
        else{
            const imgres=await fetch(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            const imgdata=await imgres.blob()
            domupdate(data,imgdata)
        }
    }
     catch (error) {
        alert(error)
    }


}


async function getbyautodetect(position){
    const lat = position.coords.latitude.toFixed(2)
    const long = position.coords.longitude.toFixed(2)
    try {
        const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`)
        const data=await res.json()
        if(data.cod==="400")
        {alert("Invalid Location")}
        else{
            const imgres=await fetch(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            const imgdata=await imgres.blob()
            domupdate(data,imgdata)
        }
    } catch (error) {
        alert(error)
    }


}


autodetect.addEventListener('click', getlocation)
function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getbyautodetect, err, options);
    } else {
        alert("Your browser does not support Geolocation Feature")
    }
}


function err(error) { console.log(error) }

