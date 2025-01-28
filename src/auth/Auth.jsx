import { useDispatch, useSelector } from "react-redux"
import { setAuth} from "./AuthSlice"
import { useState } from "react"

export default function Auth(){
    const dispatch = useDispatch()
    const [auth,setAuthData] = useState({
        idInstance: '',
        apiTokenInstance: ''
    });

    const idInstance = useSelector(state=>state.auth.idInstance)
    const apiTokenInstance = useSelector(state=>state.auth.apiTokenInstance)

    const AuthClick = (e,idInstance,apiTokenInstance) => {
        e.preventDefault()
        // console.log(auth)
        dispatch(setAuth({idInstance,apiTokenInstance}))
    }

    console.log(idInstance,apiTokenInstance);

    return(
        <div className="auth_container">
            <h2>Green Api Test</h2>
            <form>
                <input type="text" placeholder="idInstance..." name="idInstance" onChange={(e)=>setAuthData({...auth,idInstance:e.target.value})}/>
                <input type="text" placeholder="apiTokenInstance..." name="apiTokenInstance" onChange={(e)=>setAuthData({...auth,apiTokenInstance:e.target.value})}/>
                <input type="submit" value="Войти" onClick={(e)=>AuthClick(e,auth.idInstance,auth.apiTokenInstance)}/>
            </form>
        </div>
    )
}