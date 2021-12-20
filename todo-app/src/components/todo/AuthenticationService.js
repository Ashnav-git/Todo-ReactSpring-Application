import axios from 'axios'
class AuthenticationService {
    executeBasicAuthenticationService(username,password)
    {
         
        return axios.get(`http://localhost:8080/basicauth`,{headers : {authorization : this.createBasicAuthToken(username,password)}})
    }
    createBasicAuthToken(username,password)
    {
        return 'Basic '+ window.btoa(username + ":" +password)
        
    }
    registerSuccesfullLogin(Username,password)
    {
         
        sessionStorage.setItem('authenticatedUser',Username);
        this.setUpAxiosInterceptors(this.createBasicAuthToken(Username,password))
    }
    logout()
    {
    sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn()
    {
        let User  =  sessionStorage.getItem('authenticatedUser');
        if(User === null) return false
        return true
        
    }
    getLoggedInUser()
    {
        let User  =  sessionStorage.getItem('authenticatedUser');
        if(User === null) return ''
        return User;
        
    }
 
    setUpAxiosInterceptors(basicAuthHeader)
    {
       
        axios.interceptors.request.use(

            config => {
                if(this.isUserLoggedIn)
                {
                config.headers.authorization =basicAuthHeader
                }
                return config;
            }
        )
       
    }
}



export default new AuthenticationService()
