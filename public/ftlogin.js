async function login(event)
{
    event.preventDefault();
       
    const emailorphone = event.target.emailorphone.value;
    const password = event.target.password.value;

    try{
        const response = await axios.post('/user/login',{emailorphone,password});
        console.log(response.data);
        localStorage.setItem('token',response.data.token);
        alert('Login successful');
        window.location.href = 'chat.html'
     }
  catch(error){
      document.getElementById('errorMessage').innerHTML=error.response ?
      error.response.data : 'An unexpected error occurred';
  }   

}