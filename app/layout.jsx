"use client";

import "@styles/global.css";
import Topmost from "@components/Topmost";
import LoggedInAdminNavBar from "@components/LoggedInAdminNavBar";
import AdminNavBar from "@components/AdminNavBar";
import UserNavBar from "@components/UserNavBar";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import Loading from "@components/Loading";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Utility function to check token validity
const fetchUserData = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        return response.ok && data.valid ? data.data : null;
    } catch (error) {
        console.error("Error verifying token:", error);
    }
};

const validateToken = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok) {
            return result
        } else {
            return null
        }

    } catch (error) {
        console.error("Erro verifying token:", error);
    }
}

const useAuthCheck = (intervalTime, setAuthState, isAdminPath) => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {

            if (isAdminPath) {

                const token = sessionStorage.getItem('authToken');

                if (!token) {
                    setAuthState({ isLoggedIn: false });
                    return;
                }

                const validatedAdmin = await validateToken(token);

                if (!validatedAdmin) {
                    sessionStorage.removeItem("authToken");
                    router.push('/admin/login');
                    setAuthState({ isLoggedIn: false})
                } else {
                    setAuthState({ isLoggedIn: true})
                }

            } else {

                const token = localStorage.getItem('authToken');
            
                if (!token) {
                    setAuthState({ isLoggedIn: false });
                    return;
                }

                const userData = await fetchUserData(token);
                
                if (!userData) {
                    localStorage.removeItem("authToken");
                    router.push('/login');
                    setAuthState({ isLoggedIn: false });
                } else {
                    setAuthState({ isLoggedIn: true, profilePicture: userData.profile_picture });
                }
            }
        };

        checkAuth();

        const intervalId = setInterval(() => {
            checkAuth();
        }, intervalTime);

        return () => clearInterval(intervalId);
    }, [router, intervalTime, setAuthState]);
};

const RootLayout = ({ children }) => {
    const pathname = usePathname();
    const [authState, setAuthState] = useState({ isLoggedIn: false, profilePicture: null, isLoading: true });
    const isAdminRoute = pathname.startsWith('/admin/');
    const intervalTime = 5 * 60 * 1000;

    useAuthCheck(intervalTime, setAuthState, isAdminRoute);

    if (authState.isLoading) {
        return <Loading />;
    }

    return (
        <html lang="en">
            <body>
                <main>
                    <Topmost />
                    {isAdminRoute ? (
                        authState.isLoggedIn ? <LoggedInAdminNavBar /> : <AdminNavBar />
                    ) : authState.isLoggedIn ? (
                        <UserNavBar profile_picture={authState.profilePicture} />
                    ) : (
                        <NavBar />
                    )}
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
};

export default RootLayout;