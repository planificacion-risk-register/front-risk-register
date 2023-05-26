import React, { useEffect, useState } from 'react'
import { getUsers } from '../../services/pruebaToken'

export const ListUsers = () => {
    const [users, setUsers] = useState({})

    useEffect(() =>{
        getUsers().then((data)=> {
            setUsers(data.data)
        }).catch((error)=> {
            console.log("error: ",error)
            //toastError("Acceso no autorizado", error)
        })            

    }, [])
    return(
        <div>
            <li>
                <h2>Lista de usuarios</h2>
                {JSON.stringify(users)}
            </li>
        </div>
    )
}
