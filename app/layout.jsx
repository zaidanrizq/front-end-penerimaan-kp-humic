"use client"

import "@styles/global.css"
import Topmost from "@components/Topmost";
import UserNavBar from "@components/UserNavBar";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import Loading from "@components/Loading";
import {useState, useEffect} from "react"

const RootLayout = ({ children }) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {


        const token = localStorage.getItem('authToken')

        if (token) {
            setIsLoggedIn(true)
        }

        setIsLoading(false);
    }, [])

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return isLoggedIn ? (
        <html lang="en">
            <body>
                <main>
                    <Topmost/>
                    <UserNavBar/>
                    {children}
                    <Footer/>
                </main>
            </body>
        </html>
    ) : (
        <html lang="en">
            <body>
                <main>
                    <Topmost/>
                    <NavBar/>
                    {children}
                    <Footer/>
                </main>
            </body>
        </html>
    )
}

export default RootLayout;