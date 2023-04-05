const loginForm = document.querySelector('.login_form')
const loginUsername = document.querySelector('.username')
const loginPassword = document.querySelector('.password')
const loginBtn = document.querySelector('#loginBtn')
const createUserForm = document.querySelector('.create_user_form')
const enterUserPassword = document.querySelector('#enter_user_password')
const reenterUserPassword = document.querySelector('#reenter_user_password')
const createEmail = document.querySelector('#create_email')
const createBtn = document.querySelector('#create_btn')
const titleTxt = document.querySelector('.title_txt')

//this is using the form on the frontend to submit the info to the backend through event listeners for the creation of users
if (createUserForm) {
    
    createUserForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        let myBody = {
            useremail: createEmail.value,
            password: enterUserPassword.value,
            repassword: reenterUserPassword.value
        }
    
        axios.post(`/newuser`, myBody).then((res)=>{
        alert('New account created!');
        window.location = '../pages/index.html'
        }).catch((err)=>{
            console.log(err);
        })
    
    })
}

//this is using the form on the frontend to submit the info to the backend through event listeners for loging in users
if(loginForm){
    loginForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        

        let email = loginUsername.value
        let password = loginPassword.value
       
        axios.get(`/user/${email}/${password}`).then((res)=>{
            if(res.data.length === 1){
                let useremail = res.data[0].useremail
                window.localStorage.setItem('user', useremail)
                window.location = '../pages/user.html'
            }
            console.log(res.data.length);
        }).catch((err)=>{
            console.log(err);
        })
    })
  }

