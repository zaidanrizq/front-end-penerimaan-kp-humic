"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SubHead from "@components/SubHead";
import ErrorModal from "@components/ErrorModal";
import BerhasilEditBatchModal from "@components/BerhasilEditBatchModal";

import Datepicker from "react-tailwindcss-datepicker";


const DetailBatch = ({ params }) => {

    const router = useRouter();
    const id = params.id

    const [batch, setBatch] = useState({});
    const [date, setDate] = useState({
        startDate: null,
        endDate: null
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorTitle, setErrorTitle] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target
        setBatch((prevBatch) => ({
            ...prevBatch,
            [name]: value
        }));
    }

    const handleDateChange = (newDate) => {
        
        setDate(newDate);

        const openedAt = newDate.startDate ? newDate.startDate.toISOString() : null;
        const closedAt = newDate.endDate ? newDate.endDate.toISOString() : null;

        handleChange({
            target: {
                name: 'opened_at',
                value: openedAt
            }
        });

        handleChange({
            target: {
                name: 'closed_at',
                value: closedAt
            }
        });
    }; 

    const handleSimpan = async (e) => {

        e.preventDefault();
        
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            router.push('/admin/login');
            setTimeout(() => {
                location.reload();
            }, 200)
        }

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/batch/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(batch)
            });

            const result = await response.json();

            if (response.ok) {
                setShowSuccess(true);
            } else {
                throw new Error(result.message || "Failed update batch information.")
            }

        } catch (err) {

            setError(`Error: ${err.message}`);
            setErrorTitle('Gagal Edit Batch!')
            setShowError(true);

        }
    };

    useEffect(() => {

        const validateToken = async () => {

            const token = sessionStorage.getItem('authToken');
            
            if (!token) {
                router.push('/admin/login')
                setTimeout(() => {
                    location.reload();
                }, 200);
                return;
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
                    method: 'GET',
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (!response.ok || !result.valid) {
                    sessionStorage.removeItem('authToken');
                    router.push('/admin/login');
                    setTimeout(() => {
                        location.reload();
                    }, 200);
                }

            } catch (err) {
                setError(`Error: ${err.message}`);
                setErrorTitle('Gagal Validasi Akun!')
                setShowError(error);
            }
        };

        validateToken();

    }, [router]);

    useEffect(() => {

        const fetchBatch = async () => {

            const token = sessionStorage.getItem('authToken');
            
            if (!token) {
                router.push('/admin/login')
                setTimeout(() => {
                    location.reload();
                }, 200);
                return;
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/batch/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    setBatch(result.data);
                    setDate({
                        startDate: result.data.opened_at ? new Date(result.data.opened_at) : null,
                        endDate: result.data.closed_at ? new Date(result.data.closed_at) : null
                    })
                } else {
                    throw new Error( result.message || "Failed to fetch batch.")
                }

            } catch (err) {
                setError(`Error: ${err.message}`);
                setErrorTitle('Gagal Memuat Batch!')
                setShowError(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            }
        };

        fetchBatch();
        
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <SubHead 
                imagePath={"/assets/images/sub-head-dashboard.svg"}
                title="Detail"
                subTitle="Batch Magang / Detail"
            />
            <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center my-[64px] w-[50%] gap-[32px]">
                    <h1 className="font-workSans font-medium text-[26px] text-black text-center self-start">
                        {`Batch ${batch.number} Semester ${batch.semester} ${batch.year}`}
                    </h1>
                    <form onSubmit={handleSimpan}  className="flex flex-col font-workSans font-normal text-[16px] text-black w-full gap-[24px]">
                        <div className="flex flex-col gap-[8px]">
                            <label className="self-start">Nomor Batch</label>
                            <p className="self-start text-[14px]">Berupa angka 0. Contoh: 2</p>
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
                            <p className="self-start text-[14px]">Ganjil / Genap. Contoh: Ganjil</p>
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
                            <p className="self-start text-[14px]">Berupa angka. Contoh: 2024</p>
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
                                    onChange={newValue => handleDateChange(newValue)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center text-white mt-[64px]">
                            <button
                                className="bg-accent rounded-lg w-[256px] h-[42px] hover:bg-primary transition-all duration-300"
                                type="button"
                                onClick={() => router.push('/admin/dashboard/batch')}
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
            <BerhasilEditBatchModal
                show={showSuccess}
                onConfirm={() => location.reload()}
            />
        </>
    )
};

export default DetailBatch;