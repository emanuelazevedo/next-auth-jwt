"use client";

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface UserResponse {
    user?: string;
    error?: AxiosError
    
}

const DashboardLayout = ({children}: {children: React.ReactNode}) => {

    const {push} = useRouter()

    const [success, setSuccess] = useState<boolean>(false)

    const [userData, setUserData] = useState<any>()

    const checkAuth = async ()=>{
        const {user, error} = await getUserProfile()
        console.log('user >>', user)
        if(error){
            push('/')
            return;
        }
        setUserData(user)
        setSuccess(true)
    }

    useEffect(()=>{
        checkAuth()
    }, [])

    if(!success) {
        return <p>Loading...</p>
    }

    const handleOnClickLogout = async () => {
        const {data} = await axios.get("/api/auth/logout")
        if(data) {
            push("/")
            return;
        }
    }

    console.log('userData >>', userData)


  return (
        <div>
            <header>Hello {userData.user.name}!</header>
            <div>Your email is {userData.user.email}</div>
            {children}
            
            <button
                onClick={handleOnClickLogout}
                className="p-2 bg-orange-600 text-white w-fit rounded"
            >
                Logout
            </button>
        </div>
    )
}

const getUserProfile = async (): Promise<UserResponse> => {

    try {
        const {data} = await axios.get("/api/auth/profile")

        console.log('getUserProfile >> api >>', data)

        return {
            user: data,
            error: undefined
        }
    } catch (error) {
        const err = error as AxiosError;

        return {
            user:undefined,
            error:err
        }
    }
}

export default DashboardLayout