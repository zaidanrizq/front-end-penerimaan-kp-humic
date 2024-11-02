"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "@components/LogoutModal";
import SubHead from "@components/SubHead";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setTimeout(() => {
      location.reload()
    }, 200);
  };

  // Fetch user profile
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
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <SubHead
        imagePath="/assets/images/sub-head-profile.svg"
        title="Profile"
        subTitle="Profile"
      />

      <div className="flex flex-col justify-center items-center">
        <div className="font-workSans font-medium text-[26px] text-left text-black mt-[64px] mb-[24px] mr-[610px]">
          <h2>Data Pribadi</h2>
        </div>

        <div className="absolute top-[490px] left-1/2 transform -translate-x-1/2">
          <img
            src={
              user.profile_picture
                ? user.profile_picture
                : "/assets/icons/profile.svg"
            }
            alt="Profile Icon"
            className="w-[124px] h-[124px] object-cover rounded-full"
          />
        </div>

        <div className="pt-[92px] pb-[64px] px-[64px] bg-primary rounded-[30px] flex flex-col mb-[92px]">
          <table className="table-auto text-left w-[600px]">
            <tbody className="font-workSans font-normal text-[16px] text-white">
              <tr>
                <td className="pr-[48px] pb-[24px] whitespace-nowrap">Nama Lengkap</td>
                <td className="pb-[24px]">:</td>
                <td className="pl-2 pb-[24px]">{user.full_name}</td>
              </tr>
              <tr>
                <td className="pb-[24px]">NIM</td>
                <td className="pb-[24px]">:</td>
                <td className="pl-2 pb-[24px]">{user.nim}</td>
              </tr>
              <tr>
                <td className="pb-[24px]">Prodi</td>
                <td className="pb-[24px]">:</td>
                <td className="pl-2 pb-[24px]">{user.prodi}</td>
              </tr>
              <tr>
                <td className="pb-[24px]">Nomor Handphone</td>
                <td className="pb-[24px]">:</td>
                <td className="pl-2 pb-[24px]">{user.phone_number}</td>
              </tr>
              <tr>
                <td className="pb-[24px]">Email</td>
                <td className="pb-[24px]">:</td>
                <td className="pl-2 pb-[24px]">{user.email}</td>
              </tr>
              <tr>
                <td className="pb-[24px]">Status Pendaftaran</td>
                <td className="pb-[24px]">:</td>
                <td className="pl-2 pb-[24px]">
                  <p 
                    className={
                      !user.kp_application 
                        ? "" 
                        : `w-[100px] rounded-full text-center ${
                            user.kp_application.status === "Proses" 
                              ? "bg-accent" 
                              : user.kp_application.status === "Lulus"
                              ? "bg-[#2FB425]" 
                              : user.kp_application.status === "Gagal" 
                              ? "bg-white text-primary" 
                              : ""
                          }`
                    }
                  >
                    {user.kp_application?.status || "-"}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="pb-[24px]">CV</td>
                <td className="pb-[24px]">:</td>
                <td className="pl-2 pb-[24px]">
                  {
                    user.portfolio ?
                      ( <a 
                        href={`${user.portfolio}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className= "hover:underline underline-offset-4"
                        >
                          Click Here
                        </a>
                      ) : 
                      ( "-" )
                  }
                </td>
              </tr>
              <tr>
                <td>Portfolio</td>
                <td>:</td>
                <td className="pl-2 inline-block align-top">
                  {
                    user.portfolio ?
                      ( <a 
                        href={`${user.portfolio}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className= "hover:underline underline-offset-4"
                        >
                          Click Here
                        </a>
                      ) : 
                      ( "-" )
                  }
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-row justify-between mt-[64px] mx-[32px]">
            <Link
              href="/profile/ubah-profile"
              className="nav-white-btn hover:bg-primary hover:text-white transition-all duration-[200ms]"
            >
              Edit
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="nav-white-btn hover:bg-primary hover:text-white transition-all duration-[200ms]"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      <LogoutModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Profile;
