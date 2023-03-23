'use strict';

// prettier-ignore

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


let map;
let mapEvent;


class Workout{
    date =new Date();
//id=()
id = (Date.now() + '').slice(-10);

    constructor(coords,distance ,duration){
        this.coords=coords;
        this.distance=distance;
        this.duration=duration;
    }


    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
          months[this.date.getMonth()]
        } ${this.date.getDate()}`;
      }
    
}

class Running extends Workout{
type='running';
    constructor(coords,distance ,duration,cadence){
        super(coords,distance ,duration);
        this.cadence=cadence;
        this.clacPace();
        this._setDescription();
        
    }

   clacPace(){
    this.pace=this.duration / this.distance;
    return this.pace;

   } 
}
class Cycling extends Workout{
type='cycling';
    constructor(coords,distance ,duration,elevationGain){
        super(coords,distance ,duration);
        this.elevationGain=elevationGain;
        this.clacSpeed
        this._setDescription();
    }

    clacSpeed(){
        this.speed=this.distance / (this.duration/60);
        return this.speed;
       } 
}



class App{
#map;
#mapEvent;
#workouts=[];
    
    constructor(){


        console.log('hello');
        this._getposition();
 this.getLocalStoage();
        form.addEventListener('submit',this._newWorkout.bind(this));
        inputType.addEventListener('change',this._toggleElevationField);
        containerWorkouts.addEventListener('click',this._moveToPopup.bind(this));
       
    }

    _getposition(){
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){
console.log('access denied');
        });
    }


    _loadMap(position){


   
            console.log(position);// 
            console.log(position.coords)
        const latitude=position.coords.latitude;   //is same as this one 
        // const {latitude}=position.coords; 
        const longitude=position.coords.longitude; 
        //coordinate of the live location where we are
        
        console.log(latitude);
        console.log(longitude);
        //console.log(` https://www.google.co.in/maps/@26.823135,75.867416,16z`);
        //const coords=[latitude,longitude];
         this.#map = L.map('map').setView([latitude,longitude], 13);
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        
        
        
        //when we click on the map then this event will appear 
        this.#map.on('click',this._showForm.bind(this)
        //{
          //  console.log(mape);
       

         //     mapEvent=mape;
            //  form.classList.remove('hidden'); // this willremove the class from the element 
        
        
            //  inputDistance.focus(); //the distance input will get focus when we write on it otherwise blur
        // const {lat,lng}=mapEvent.latlng;
        
        //     L.marker([lat,lng]).addTo(map)
        //     .bindPopup(L.popup({
        //         maxWidth:250,minWidth:100,
        //         autoClose:false,
        //         closeOnClick:false,
        //         className: 'running-popup',
        //     }))
        //     .setPopupContent('running')
        //      .openPopup();
     //  }
       );

    }

    _showForm(mape){
    //     
    this.#mapEvent=mape;
    form.classList.remove('hidden'); // this willremove the class from the element 
        
        
    inputDistance.focus();

    
}

_hideForm() {
    // Empty inputs
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 3000);
  }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e){
        

        e.preventDefault();//this will avoid the condition from refreshing the page 
        const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//get data from form
        const type=inputType.value;
        const distance=+inputDistance.value;
        const duration=+inputDuration.value;
        let workout;
        const {lat,lng}=this.#mapEvent.latlng;

        //if workout running ,create running object
if(type==='running'){
const cadence=+inputCadence.value;

 if(//!Number.isFinite(distance)      this is same as the function we write above 
// || !Number.isFinite(duration)||
// !Number.isFinite(cadence)
!validInputs(distance,duration,cadence)
|| !allPositive(distance,duration,cadence)

){
 return alert('hey you have insert wrong input');
}

 workout=new Running([lat,lng],distance ,duration,cadence );
 console.log("Gfdgfdv");
 console.log(workout.coords);

}

        //check if data is valid
        //if workout cycling ,create running object
if(type==='cycling'){
    const elevation=+inputElevation.value;
    if(//!Number.isFinite(distance)      this is same as the function we write above 
// || !Number.isFinite(duration)||
// !Number.isFinite(cadence)
!validInputs(distance,duration,elevation) ||
!allPositive(distance,duration)
){
 return alert('hey you have insert wrong input');
}
 workout=new Cycling([lat,lng],distance ,duration,elevation );

}


//Add new object to workout array

this.#workouts.push(workout);
console.log('hello2'+this.#workouts);


//inputDistance.value=inputDuration.value=inputCadence.value=inputElevation.value='';
this._hideForm();      


//Render workout on map as marker


        // console.log('hello');
    //     console.log(mapEvent);
    // console.log(map); 3
           // L.marker([lat,lng]).addTo(this.#map) //L.marker will mark the palce 
            // .bindPopup(L.popup({
            //     maxWidth:250,minWidth:100,
            //     autoClose:false,
            //     closeOnClick:false,
            //     className: `${workout.type}-popup`,
            // }))
            // .setPopupContent(
            //     `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
            //   )
            //  .openPopup();
             this.renderWorkoutMarker(workout); 
           
             this._renderWorkout(workout);
             this.setLocalStorage();  
             
    }



    _renderWorkout(workout) {
       
        let html = `
          <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
              <span class="workout__icon">${
                workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
              }</span>
              <span class="workout__value">${workout.distance}</span>
              <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⏱</span>
              <span class="workout__value">${workout.duration}</span>
              <span class="workout__unit">min</span>
            </div>
        `;
    
        if (workout.type === 'running')
          html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
            </div>
          </li>
          `;
    
        if (workout.type === 'cycling')
          html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⛰</span>
              <span class="workout__value">${workout.elevationGain}</span>
              <span class="workout__unit">m</span>
            </div>
          </li>
          `;
    
        form.insertAdjacentHTML('afterend', html);
     }

    renderWorkoutMarker(workout){
      
        L.marker(workout.coords).addTo(this.#map) //L.marker will mark the palce 
        .bindPopup(L.popup({
            maxWidth:250,minWidth:100,
            autoClose:false,
            closeOnClick:false,
            className: `${workout.type}-popup`,
        }))
        .setPopupContent(
                `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
              )
             .openPopup();
     }

_moveToPopup(e){
const workoutEl=e.target.closest('.workout');
if(!workoutEl) return ;

const workout=this.#workouts.find(work => work.id ===workoutEl.dataset.id);

}

setLocalStorage(){
  localStorage.setItem('workouts',JSON.stringify(this.#workouts));
   
}
getLocalStoage(){
  const data =localStorage.getItem('workouts'); 
  console.log();
  if(!data) return;

  this.#workouts=data;
  this.#workouts.forEach(work => {
    this._renderWorkout(work);
  } );
}

    }
const app=new App(); 













































































// if(navigator.geolocation)
// navigator.geolocation.getCurrentPosition(function(position){
//     console.log(position);// 
//     console.log(position.coords)
// const latitude=position.coords.latitude;   //is same as this one 
// // const {latitude}=position.coords; 
// const longitude=position.coords.longitude; 
// //coordinate of the live location where we are

// console.log(latitude);
// console.log(longitude);
// //console.log(` https://www.google.co.in/maps/@26.823135,75.867416,16z`);
// //const coords=[latitude,longitude];
//  map = L.map('map').setView([latitude,longitude], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);



// //when we click on the map then this event will appear 
// map.on('click',function(mape){
//     console.log(mape);
// mapEvent=mape;
//      form.classList.remove('hidden'); // this willremove the class from the element 


//      inputDistance.focus(); //the distance input will get focus when we write on it otherwise blur
// // const {lat,lng}=mapEvent.latlng;

// //     L.marker([lat,lng]).addTo(map)
// //     .bindPopup(L.popup({
// //         maxWidth:250,minWidth:100,
// //         autoClose:false,
// //         closeOnClick:false,
// //         className: 'running-popup',
// //     }))
// //     .setPopupContent('running')
// //      .openPopup();
// });
// },function(){
//     console.log("permission denied");
// });


//when we submit the form then the arrow will appear on the map
// form.addEventListener('submit',function(e){
//    e.preventDefault();//this will avoid the condition from refreshing the page 

//     const {lat,lng}=mapEvent.latlng;

//         L.marker([lat,lng]).addTo(map) //L.marker will mark the palce 
//         .bindPopup(L.popup({
//             maxWidth:250,minWidth:100,
//             autoClose:false,
//             closeOnClick:false,
//             className: 'running-popup',
//         }))
//         .setPopupContent('running')
//          .openPopup();
// });


//this will change the name in the form when we choose the option in form 
// inputType.addEventListener('change',function(){
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

// });
   
