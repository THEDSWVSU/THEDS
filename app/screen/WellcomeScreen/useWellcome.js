import React from 'react';

function useLogin(props) {
    
    const login = ()=>{
        props.navigation.navigate("login")
        
    }
    const register = ()=>{
        props.navigation.navigate("register")
    }
    return {login, register}
}

export default useLogin;