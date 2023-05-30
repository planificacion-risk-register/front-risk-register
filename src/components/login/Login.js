import { React, useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'
import { LoginModel } from '../../models/Login'
import costa from '../../statics/img/costa-rica.jpg'
import logo from '../../statics/img/slogan2.png'
import { newLogin, loginGoogle, loginPage } from '../../services/LoginService'
import { saveUser } from '../../services/UserService'
import { toastSucces, toastInfo, toastError, toastWarning } from '../utils/ToastNotify'
import { Link, useNavigate } from 'react-router-dom'
import './style/create.css'

export const Login = () => {

    const clientID = "481489586127-t28bb9ijuf6tdeet2kv93q4nb4bpvuel.apps.googleusercontent.com"
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(LoginModel())
    const navigate = useNavigate()

    const onSuccess = async (response) => {
        let result = false
        const userConst = {
            email: await response.profileObj.email,
            firstName: await response.profileObj.familyName,
            lastName: await response.profileObj.givenName,
            rol: "usuario",
            userName: await response.profileObj.name,
            password: "chocolate"
        }

        const dato = await response.profileObj
        setUser(dato);
        document.getElementsByClassName("btn").hidden = true;

        await saveUser(userConst).then((data) => {
  
            //si no existe el usuario y vamos a registrarlo por primera vez con google
            if(data.msg==="Usuario guardado con éxito"){
                console.log("usuario creado succes")
                toastSucces(data.msg+', favor iniciar sesión otra vez')
                localStorage.setItem("email", userConst.email)
            }else if(data.response.status===400){
                result = true
                localStorage.setItem("google",true)
                console.log("ya existe el usuario: ", result)
            }
        })
        //Cuando existe la cuenta google y nada mas logueamos
        if(result){
            //Para poder loguear con una cuenta google ya creada
            const google = {
                email: await response.profileObj.email,
                password: userConst.password
            }
            await loginGoogle(google).then((data)=>{
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", google.email)
                toastInfo(`Sesión iniciada en ${google.email}`)
                navigate("/list")
            })
        }
        
    }

    const onFailure = (response) => {
        console.log("Something went wrong");
    }
 
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientID,
            });
        }
        gapi.load("client:auth2", start);
    }, []);

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setLogin({ ...login, [name]: value })
    }
 
    const handleLogin = async () => {
        const email_expresion = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if(login.email === ''|| login.password === ''){
            toastWarning('Todos los campos son obligatorios')
            return
        }
        if(!email_expresion.test(login.email)){
            toastError('El email no es válido')
            return
        }

        await newLogin(login).then((data)=>{
            if(data.status===200){
                //console.log("desde login",data.data.token)
                localStorage.setItem("token", data.data.token)
                localStorage.setItem("email", login.email)
                toastInfo(`Sesión iniciada en ${login.email}`)
                navigate("/list")
            } else if(data.response.status===400){
                console.log("mal")
                toastError(data.response.data.error)
            }
        })
        //Cuando existe el interceptor
        /*await loginPage(login).then((data)=> {
            localStorage.setItem(data.data.token)
            localStorage.setItem("email", login.email)
            toastInfo(`Sesión iniciada en ${login.email}`)
            navigate("/list")
        }).catch((error)=> {
            console.log('error login',error)
        })*/
    }

    return (
        <div className="center">
            <div className="grapper">
                <section className="vh-100" style={{ backgroundColor: '#295bace8' }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card" style={{ borderRadius: '1rem',}}>
                                    <div className="row g-0">
                                        <div className="col-md-6 col-lg-5 d-none d-md-block" style={{marginTop: '6%'}}>
                                            <img id="fondo" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem', marginTop: '40%' }}/>
                                        </div>
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5 text-black">
                                                <div className="text-center">
                                                    <img className="logo" src={logo} alt="logo" />
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px', fontFamily: 'sans-serif' }}>
                                                    Init session in your account
                                                </h5>

                                                <div className="form-floating mb-4">
                                                    <input type="email" name="email" onChange={handleChange} className="form-control mt-3" id="floatingInput" placeholder="Ingrese usuario"
                                                    />
                                                    <label htmlFor="floatingInput">Email</label>
                                                </div>

                                                <div className="form-floating mb-4">
                                                    <input type="password" name="password" onChange={handleChange} className="form-control" id="floatingPassword" placeholder="Ingrese contraseña"
                                                    />
                                                    <label htmlFor="floatingPassword">Password</label>
                                                </div>

                                                <div className="d-grid gap-2 mt-3">
                                                    <button type="button" className="btn btn-secondary btn-lg mt-lg-2" onClick={handleLogin}>
                                                        Init session
                                                    </button>
                                                </div>

                                                <a className="small text-muted" href="#!">
                                                    ¿Forgot password?
                                                </a>
                                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                                    ¿You don't have account? <Link to={'/createUser'} style={{ color: '#f64343' }}>Register now</Link>
                                                </p>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <GoogleLogin
                                                        clientId={clientID}
                                                        onSuccess={onSuccess}
                                                        onFailure={onFailure}
                                                        buttonText="Continue  with Google"
                                                        cookiePolicy={"single_host_origin"}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
