"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import SubHead from "@components/SubHead"
import UbahProfileForm from "@components/UbahProfileForm"
import BerhasilEditProfileModal from "@components/BerhasilEditProfileModal"
import GagalEditProfileModal from "@components/GagalEditProfileModal"
import TarikLamaranModal from "@components/TarikLamaranModal"

const UbahProfile = () => {

    const router = useRouter()
    const token = localStorage.getItem('authToken')
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showBerhasilEditProfileModal, setShowBerhasilEditProfileModal] = useState(false)
    const [showGagalEditProfileModal, setShowGagalEditProfileModal] = useState(false)
    const [application, setApplication] = useState(null);
    const [tarikLamaran, setTarikLamaran] = useState(false);
    const [showTarikLamaran , setShowTarikLamaran] = useState(false);

    const handleTarikLamaran = () => {
      setShowTarikLamaran(true);
    }

    useEffect(() => {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        router.push("/login");
        setTimeout(() => {
          location.reload()
        }, 200);
        return;
      }
  
      const fetchUser = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
  
          const result = await response.json();
  
          if (response.ok) {
            setUser(result.data);
          } else {
            if (response.status === 403) {
                localStorage.removeItem("authToken");
                router.push('/login');
                setTimeout(() => {
                  location.reload()
                }, 200);
            }
            throw new Error(result.message || "Failed to fetch user data.");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setTimeout(() => {
            setIsLoading(false)
          }, 250)
        }
      };
  
      fetchUser();
    }, []);

    useEffect(() => {

      const fetchApplication = async () => {

          const token = localStorage.getItem('authToken');

          if (!token) {

              router.push('/login');
              location.reload();
          }

          try {

              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application-kp/${user.kp_application.application_id}`, {
                  method: 'GET',
                  headers: {
                      'Authorization' : `Bearer ${token}`,
                  }
              });

              const result = await response.json();

              if (response.ok) {
                  setApplication(result.data);
              } else {
                  throw new Error(result.message || "Error fetching user application.");
              }

          } catch (err) {

              setError(err.message)
              alert(err)

          }
      };

      if (user.kp_application) {
          fetchApplication();
      }
      
  }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSimpan = async (e) => {

        e.preventDefault()

        try {

          if (tarikLamaran) {
            
            const responseDelete = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application-kp/${application.application_id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })

            const result = await responseDelete.json();

            if (!responseDelete.ok) {
              throw new Error(result.message);
            }
          }

            const formData = new FormData();

            Object.keys(user).forEach((key) => {
              formData.append(key, user[key]);
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                method: "PUT",
                headers : {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                setUser(result.data)
                setShowBerhasilEditProfileModal(true)
            } else {
                throw new Error(result.message || "Failed to update user data.")
            }

        } catch (err) {

            setError(err.message);
            setShowGagalEditProfileModal(true)
        }

    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-profile.svg"
                title="Data"
                subTitle="Profile / Data"
            />
            <div className="flex justify-center items-center">
                <UbahProfileForm
                    userData={user}
                    application={application}
                    handleChange={handleChange}
                    handleTarikLamaran={handleTarikLamaran}
                    handleSimpan={handleSimpan}
                />
            </div>
            <BerhasilEditProfileModal
                show={showBerhasilEditProfileModal}
                onConfirm={() => location.reload()}
            />
            <GagalEditProfileModal
                show={showGagalEditProfileModal}
                error={error}
                onConfirm={() => setShowGagalEditProfileModal(false)}
            />
            <TarikLamaranModal
              show={showTarikLamaran}
              onBatal={() => setShowTarikLamaran(false)}
              onClose={() => setShowTarikLamaran(false)}
              onConfirm={() => {setTarikLamaran(true);setShowTarikLamaran(false)}}
            />
        </>
    )
}

export default UbahProfile