import React, { useContext } from 'react'
import { AuthUserContext } from '../Context/AuthContextApi'

const PrivateRoutes = ({children}) => {
    let {authUser}=useContext(AuthUserContext);
    if(authUser==null){
        return<Navigate to={"/auth/login"}/>
    }else{
        return<>{children}</>
    }
}

export default PrivateRoutes