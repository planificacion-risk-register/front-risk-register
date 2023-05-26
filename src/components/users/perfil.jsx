import React, { useEffect, useState } from 'react'
import { ModelUser } from '../../models/User'
import { getUserEmail } from '../../services/UserService'
import { Card } from 'react-bootstrap'

export const Perfil = () => {
    const [user, setUsers] = useState(ModelUser())
    const email = localStorage.getItem("email")

    useEffect(() => {
        if (email !== null) {
            getUserEmail(email).then((data) => {
                console.log(data.data)
                const result = data.data
                setUsers(result[0])
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [])

    return (
        <div className='container'>
            
            <div className='card-center'>
            <h2 className='mt-3 text-center'>Perfil</h2>
                <Card className='align-items-center' style={{backgroundColor: '#ff629e'}}>
                    <Card.Body style={{backgroundColor: '#ff629e'}}>
                        <Card.Title>Información del Usuario:</Card.Title>
                        <Card.Text>
                            <p>Nombre de Usuario: {user.userName}</p>
                            <p>Correo Electrónico: {user.email}</p>
                            <p>Nombre: {user.firstName}</p>
                            <p>Apellido: {user.lastName}</p>
                            <p>Rol: {user.rol}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
