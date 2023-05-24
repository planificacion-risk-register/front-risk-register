import React from 'react'
import { useState } from 'react'
import { ModelUser } from '../../models/User'
import costa from '../../statics/img/costa-rica.jpg'
import logo from '../../statics/img/slogan1.png'

export const CreateUser = () => {

  const [user, setUser] = useState(ModelUser())


  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setUser({...user, [name]: value})
  }
  return (
    <div className="grapper">
                <section className="vh-100" style={{ backgroundColor: '#b8f184' }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card" style={{ borderRadius: '1rem' }}>
                                    <div className="row g-0">
                                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                                            <img id="fondo" src={costa} alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem', marginTop: '40%' }}/>
                                        </div>
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5 text-black">
                                                <div className="text-center">
                                                    <img className="logo" src={logo} alt="logo" />
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                                    crear cuenta
                                                </h5>

                                                <div className="form-floating mb-4">
                                                    <input type="email" name="email" onChange={handleChange} className="form-control mt-3" id="floatingInput" placeholder="Ingrese usuario" />
                                                    <label htmlFor="floatingInput">Correo</label>
                                                </div>

                                                <div className="form-floating mb-4">
                                                    <input type="password" name="password" onChange={handleChange} className="form-control" id="floatingPassword" placeholder="Ingrese contraseña"/>
                                                    <label htmlFor="floatingPassword">Contraseña</label>
                                                </div>

                                                <div className="d-grid gap-2 mt-3">
                                                    <button type="button" className="btn btn-secondary btn-lg mt-lg-2">
                                                        Registrar
                                                    </button>
                                                </div>

                                                <a className="small text-muted" href="#!">
                                                    regresar
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
  )
}
