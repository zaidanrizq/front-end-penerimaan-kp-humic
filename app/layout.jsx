"use client"

import "@styles/global.css"
import Topmost from "@components/Topmost";
import LoggedInAdminNavBar from "@components/LoggedInAdminNavBar";
import AdminNavBar from "@components/AdminNavBar";
import UserNavBar from "@components/UserNavBar";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import Loading from "@components/Loading";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const RootLayout = ({ children }) => {
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isAdminRoute = pathname.startsWith('/admin/');
    const isAdminLoggedIn = false;

    useEffect(() => {
        const checkAuth = async () => {
            const REST_API_ENDPOINT = "http://localhost:5000/verify-token";
            const token = localStorage.getItem('authToken');

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(REST_API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'authToken': token,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (!response.ok || !data.valid) {
                    setIsLoading(false);
                } else {
                    
                    setIsLoggedIn(true);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <html lang="en">
            <body>
                <main>
                    <Topmost/>
                    { isAdminRoute ? (
                        isAdminLoggedIn ? (
                            <LoggedInAdminNavBar/>
                        ) : (
                            <AdminNavBar/>
                        )
                    ) : isLoggedIn ? (
                        <UserNavBar/>
                    ) : (
                        <NavBar/>
                    )}
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    )
    /* return isLoggedIn ? (
        <html lang="en">
            <body>
                <main>
                    <Topmost />
                    <UserNavBar />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    ) : (
        <html lang="en">
            <body>
                <main>
                    <Topmost />
                    <NavBar />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    ); */
};

export default RootLayout;
