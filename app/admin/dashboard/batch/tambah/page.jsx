"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SubHead from "@components/SubHead";
import ErrorModal from "@components/ErrorModal";
import BerhasilTambahBatchModal from "@components/BerhasilTambahBatchModal";

import Datepicker from "react-tailwindcss-datepicker";

const TambahBatch = () => {
    const router = useRouter();

    const [batch, setBatch] = useState({
        number: "",
        semester: "",
        year: "",
        opened_at: null,
        closed_at: null,
    });

    const [date, setDate] = useState({
        startDate: null,
        endDate: null,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorTitle, setErrorTitle] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBatch((prevBatch) => ({
            ...prevBatch,
            [name]: value,
        }));
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);

        let openedAt = null;
        if (newDate.startDate) {
            const startDate = new Date(newDate.startDate);
            startDate.setHours(0, 0, 0, 0); // Set to 23:59:59.999 for the end of the day
            openedAt = startDate.toISOString();
        }

        let closedAt = null;
        if (newDate.endDate) {
            const endDate = new Date(newDate.endDate);
            endDate.setHours(23, 59, 59, 999); // Set to 23:59:59.999 for the end of the day
            closedAt = endDate.toISOString();
        }

        handleChange({
            target: {
                name: "opened_at",
                value: openedAt,
            },
        });

        handleChange({
            target: {
                name: "closed_at",
                value: closedAt,
            },
        });
    };

    const handleSimpan = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("authToken");

        if (!token) {
            router.push("/admin/login");
            setTimeout(() => {
                location.reload();
            }, 200);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/batch`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(batch),
            });

            const result = await response.json();

            if (response.ok) {
                setShowSuccess(true);
            } else {
                throw new Error(result.message || "Failed adding new batch.");
            }
        } catch (err) {
            setError(err.message);
            setErrorTitle("Gagal Tambah Batch!");
            setShowError(true);
        }
    };

    useEffect(() => {
        const validateToken = async () => {
            const token = sessionStorage.getItem("authToken");

            if (!token) {
                router.push("/admin/login");
                setTimeout(() => {
                    location.reload();
                }, 200);
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/verify-token`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await response.json();

                if (!response.ok || !result.valid) {
                    sessionStorage.removeItem("authToken");
                    router.push("/admin/login");
                    setTimeout(() => {
                        location.reload();
                    }, 200);
                }
            } catch (err) {
                setError(`Error: ${err.message}`);
                setErrorTitle("Gagal Validasi Akun!");
                setShowError(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            }
        };

        validateToken();
    }, [router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-dashboard.svg"
                title="Tambah Batch"
                subTitle="Batch Magang / Tambah"
            />
            <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center my-[64px] w-[50%] gap-[32px]">
                    <h1 className="font-workSans font-medium text-[26px] text-black text-center self-start">
                        {`Batch ${batch.number} Semester ${batch.semester} ${batch.year}`}
                    </h1>
                    <form
                        onSubmit={handleSimpan}
                        className="flex flex-col font-workSans font-normal text-[16px] text-black w-full gap-[24px]"
                    >
                        <div className="flex flex-col gap-[8px]">
                            <label className="self-start">Nomor Batch</label>
                            <p className="self-start text-[14px]">
                                Berupa angka 0. Contoh: 2
                            </p>
                            <input
                                name="number"
                                type="number"
                                min={1}
                                value={batch.number}
                                onChange={handleChange}
                                required
                                className="text-input"
                            />
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <label className="self-start">Semester</label>
                            <p className="self-start text-[14px]">
                                Ganjil / Genap. Contoh: Ganjil
                            </p>
                            <input
                                name="semester"
                                type="text"
                                value={batch.semester}
                                onChange={handleChange}
                                required
                                className="text-input"
                            />
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <label className="self-start">Tahun</label>
                            <p className="self-start text-[14px]">
                                Berupa angka. Contoh: 2024
                            </p>
                            <input
                                name="year"
                                type="text"
                                value={batch.year}
                                onChange={handleChange}
                                required
                                className="text-input"
                            />
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <label className="self-start">Periode</label>
                            <div className="outline outline-[1px] py-[2px] outline-slate-300 rounded-lg">
                                <Datepicker
                                    value={date}
                                    onChange={(newValue) => handleDateChange(newValue)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center text-white mt-[64px]">
                            <button
                                className="bg-accent rounded-lg w-[256px] h-[42px] hover:bg-primary transition-all duration-300"
                                type="button"
                                onClick={() => router.push("/admin/dashboard/batch")}
                            >
                                Batal
                            </button>
                            <button
                                className="bg-accent rounded-lg w-[256px] h-[42px] hover:bg-primary transition-all duration-300"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ErrorModal
                show={showError}
                title={errorTitle}
                message={error}
                onConfirm={() => setShowError(false)}
            />
            <BerhasilTambahBatchModal
                show={showSuccess}
                onConfirm={() => {
                    router.push("/admin/dashboard/batch");
                }}
            />
        </>
    );
};

export default TambahBatch;
