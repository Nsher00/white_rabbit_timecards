const totalTime = document.querySelector('.total_time')
const time = document.querySelector('.time')
const welcomeUserTxt = document.querySelector('.w_usr_txt')
const logoutBtn = document.querySelector('#logout_btn')
const clockinBtn = document.querySelector('#clockin_btn')
const clockinBox = document.querySelector('.clockin_box')
const clockoutBtn = document.querySelector('#clockout_btn')




let hour = 0
let minute = 0
let cron

//this is function that lets the user know what time they logged in at and starts the timer function then hides the clock in button and displays the clocked out button
const clockIn = () =>{
    let d = new Date().toLocaleTimeString()
    time.innerHTML = d
    alert(`clocked in at ${d}`)
    pause()
    cron = setInterval(()=>{timer()}, 60000)
    clockinBtn.style.display = 'none'
    clockoutBtn.style.display = 'block'
  }


//this is a function that stops the timer function and states the time the user logged out and displays the clockin button and hides the logout button
const clockOut = () =>{
  let d = new Date().toLocaleTimeString()
  time.innerHTML = d
  alert(`clocked out at ${d}`)
  pause()
  clockinBtn.style.display = 'block'
  clockoutBtn.style.display = 'none'
}

//this is the pause function that the clock out function uses
const pause = ()=>{
  clearInterval(cron)
}

//this is the timer function that the clockin function uses to run it measures the time in minutes since the last time you logged in.
  const timer = ()=>{
    console.log('min passed');
    minute++
    hour = minute / 60
    let t = parseFloat(hour + totalTime)
    t = t.toFixed(2)
    totalTime.innerHTML = t
  }

  //This checks that on page load if user is logged in

  const checkIfLogged = ()=>{
    clockoutBtn.style.display = 'none'
    totalTime.innerHTML = '0.00'
    let useremail = window.localStorage.getItem('user')
    if(useremail){
        //this stores the users data in local storage as long as they are logged in and then displays the email of the user
        welcomeUserTxt.innerHTML = window.localStorage.getItem('user')
        alert(useremail + ' has been logged in')
        totalTime.innerHTML = window.localStorage.getItem('hours')
    }else{
        //alerts the user that they are not logged in with a valid account
        alert('not logged in')
    }
  }

  const timeUpdater = ()=>{
    let d = new Date().toLocaleTimeString()
    time.innerHTML = d
  }

  const logout = ()=>{
    localStorage.clear()
    window.location = '../pages/index.html'
  }


  logoutBtn.addEventListener('click', logout)
  clockinBtn.addEventListener('click', clockIn)
  clockoutBtn.addEventListener('click', clockOut)



  checkIfLogged()
  timeUpdate = setInterval(()=> {timeUpdater()}, 1000)
  