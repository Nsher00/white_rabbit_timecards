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

clockoutBtn.style.display = 'none'

const clockIn = () =>{
    let d = new Date().toLocaleTimeString()
    time.innerHTML = d
    alert(`clocked in at ${d}`)
    pause()
    cron = setInterval(()=>{timer()}, 60000)
    clockinBtn.style.display = 'none'
    clockoutBtn.style.display = 'block'
  }

const clockOut = () =>{
  let d = new Date().toLocaleTimeString()
  time.innerHTML = d
  alert(`clocked in at ${d}`)
  pause()
  clockinBtn.style.display = 'block'
  clockoutBtn.style.display = 'none'
}

const pause = ()=>{
  clearInterval(cron)
}

  const timer = ()=>{
    console.log('min passed');
    minute++
    hour = minute / 60
    let t = parseFloat(hour + totalTime)
    t = t.toFixed(2)
    totalTime.innerHTML = t
  }

  //on page load check if user is logged in

  const checkIfLogged = ()=>{
    let useremail = window.localStorage.getItem('user')
    if(useremail){
        //do the stuff you need to do if there is a valid user
        welcomeUserTxt.innerHTML = window.localStorage.getItem('user')
        alert(useremail + ' has been logged in')
        totalTime.innerHTML = window.localStorage.getItem('hours')
    }else{
        //do the stuff you need to do if someone reached this page without being logged in
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
  let timeUpdate
  timeUpdate = setInterval(()=> {timeUpdater()}, 1000)
  