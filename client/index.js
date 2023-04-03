const loginForm = document.querySelector('.login_form')
const loginUsername = document.querySelector('.username')
const loginPassword = document.querySelector('.password')
const loginBtn = document.querySelector('#loginBtn')
const createUserForm = document.querySelector('.create_user_form')
const enterUserPassword = document.querySelector('#enter_user_password')
const reenterUserPassword = document.querySelector('#reenter_user_password')
const createEmail = document.querySelector('#create_email')
const createBtn = document.querySelector('#create_btn')


if (createUserForm) {
    
    createUserForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        let myBody = {
            useremail: createEmail.value,
            password: enterUserPassword.value,
            repassword: reenterUserPassword.value
        }
    
        axios.post(`/newuser`, myBody).then((res)=>{
        alert(res.data);
        window.location = '../pages/index.html'
        }).catch((err)=>{
            console.log(err);
        })
    
    })
}
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
