async function login(event)
{
    event.preventDefault();
       
    const emailorphone = event.target.emailorphone.value;
    const password = event.target.password.value;

    try{
        
        const response = await axios.post('/user/login',{emailorphone,password});
        alert('account created successful');
     }
  catch(error){
      document.getElementById('errorMessage').innerHTML=error.response ?
      error.response.data : 'An unexpected error occurred';
  }   

}