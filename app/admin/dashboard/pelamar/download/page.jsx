"use client"

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import SubHead from "@components/SubHead";
import ErrorModal from "@components/ErrorModal";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";



const DownloadPDF = () => {

    const router = useRouter();
    
    const [applications, setApplications] = useState([]);
    const [batches, setBatches] = useState([]);
    const statusPenerimaan = ['Proses', 'Lulus', 'Gagal'];
    const [batchNumber, setBatchNumber] = useState(null);
    const [status, setStatus] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const [selectedBatch, setSelectedBatch] = useState('Pilih Batch');
    const [selectedRole, setSelectedRole] = useState('Pilih Posisi Magang')
    const [selectedStatus, setSelectedStatus] = useState('Pilih Status Penerimaan')

    const [showError, setShowError] = useState(false)
    const [showDropdownBatches, setShowDropdownBatches] = useState(false);
    const [showDropdownStatus, setShowDropdownStatus] = useState(false);

    const handleBatchChange = async(batch) => {

        setSelectedBatch(`Batch ${batch.number} Semester ${batch.semester} ${batch.year}`);
        setBatchNumber(batch.number);

        setShowDropdownBatches(false);
    };

    const handleStatusChange = (status) => {

        setSelectedStatus(status);
        setStatus(status)

        setShowDropdownStatus(false);
    };

    const handleDownload = async () => {

        try {

            if (applications.length === 0) {
                throw new Error("No Data")
            }

            const sortedApplications = applications.sort((a, b) => {
                const roleComparison = (a.kp_role?.name || "").localeCompare(b.kp_role?.name || "");
                if (roleComparison !== 0) {
                    return roleComparison; // Sort by role name if they are different
                }
                // If role names are the same, sort by full name
                return (a.user?.full_name || "").localeCompare(b.user?.full_name || "");
            });
        
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4",
            });
        
            doc.text("Internship Applications", 14, 15);
        
            doc.autoTable({
                startY: 20,
                head: [['No','Nama Lengkap','NIM','Posisi Magang','Status Penerimaan']],
                body: sortedApplications.map((application, index) => [
                    index + 1,                                      // No
                    application.user?.full_name || "",              // Nama Lengkap
                    application.user?.nim || "",                    // NIM
                    application.kp_role?.name || "",                // Posisi Magang
                    application.status || ""                        // Status Penerimaan
                ]),
                theme: "grid",
                styles: { fontSize: 10 },
                headStyles: { fillColor: [22, 160, 133] },
                columnStyles: {
                    no: { cellWidth: 15 },
                    fullName: { cellWidth: 70 },
                    nim: { cellWidth: 40 },
                    roleName: { cellWidth: 70 },
                    status: { cellWidth: 40 },
                },
                margin: { top: 20, left: 10, right: 10 },
                didDrawPage: (data) => {
                    const pageCount = doc.internal.getNumberOfPages();
                    doc.setFontSize(10);
                    doc.text(`Page ${data.pageNumber} of ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
                }
            });
        
            doc.save("applications.pdf");
        } catch (err) {
            setError(err.message)
            setShowError(true)
        }
    };
    

    useEffect(() => {

        const fetchBatches = async () => {

            const token = sessionStorage.getItem('authToken');

            if (!token) {
                router.push('/admin/login');
                setTimeout(() => {
                    location.reload()
                }, 200);
                return;
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/batch`, {
                    method: 'GET',
                    headers: {
                        'Authorization' : `Bearer ${token}`,
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    setBatches(result.data);
                } else {
                    throw new Error (result.message || "Error fetching batches");
                }

            } catch (err) {
                setError(err.message);
                setShowError(true)
            }
        };

        fetchBatches();
    }, []);

    useEffect(() => {

        const getSelectedApplications = async () => {

            const token = sessionStorage.getItem('authToken');
    
            if (!token) {
                router.push('/admin/login');
                location.reload()
            }
    
            try {
    
                const queryParams = new URLSearchParams({
                    batchNumber: batchNumber,
                    status: status
                });
        
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application-kp/download?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    setApplications(result.data);
                } else {
                    throw new Error(result.message || "Failed to fetch applications");
                }
            } catch (err) {
                setError(err.message)
                setShowError(true)
            }
        };

        if (batchNumber && status) {
            getSelectedApplications();
        } else {
            setApplications([]);
        }

    }, [batchNumber,status]);

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-dashboard.svg"
                title="Download PDF"
                subTitle="Download PDF"
            />
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col my-[64px] justify-center items-left w-[60%] gap-[48px]">
                    <div className="relative flex flex-col justify-center items-start w-full gap-2">
                        <label htmlFor="batch-select" className="font-medium">
                            Batch Magang
                        </label>
                        <div className="flex flex-col outline outline-1 outline-slate-300 rounded-lg w-full hover:outline-primary">
                            <button 
                                type="button"
                                className="flex flex-row justify-start items-center w-full px-4 py-2"
                                onClick={() => setShowDropdownBatches(!showDropdownBatches)}
                                aria-required="true"
                            >
                                {selectedBatch || <span className="text-gray-500">Please select a batch</span>}
                                {showDropdownBatches ? (
                                    <FaAngleUp className="ml-2 text-accent" />
                                ) : (
                                    <FaAngleDown className="ml-2 text-accent" />
                                )}
                            </button>
                        </div>
                        <div className={`z-10 ${showDropdownBatches ? 'block' : 'hidden'} absolute top-full left-0 bg-white min-w-[275px] mt-1 rounded-md shadow-lg`}>
                            <ul className="text-sm text-gray-700 dark:text-gray-200">
                                {batches.map((batch, index) => (
                                    <li key={index}>
                                        <button 
                                            className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                                            type="button"
                                            onClick={() => handleBatchChange(batch)}
                                        >
                                            {`Batch ${batch.number} Semester ${batch.semester} ${batch.year}`}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {!selectedBatch && (
                            <p className="text-red-500 text-sm mt-1">This field is required.</p>
                        )}
                    </div>
                    <div className="relative flex flex-col justify-center items-start w-full gap-2">
                        <label htmlFor="batch-select" className="font-medium">
                            Status Penerimaan
                        </label>
                        <div className="flex flex-col outline outline-1 outline-slate-300 rounded-lg w-full hover:outline-primary">
                            <button 
                                type="button"
                                className="flex flex-row justify-start items-center w-full px-4 py-2"
                                onClick={() => setShowDropdownStatus(!showDropdownStatus)}
                                aria-required="true"
                            >
                                {selectedStatus || <span className="text-gray-500">Please select a batch</span>}
                                {showDropdownStatus ? (
                                    <FaAngleUp className="ml-2 text-accent" />
                                ) : (
                                    <FaAngleDown className="ml-2 text-accent" />
                                )}
                            </button>
                        </div>
                        <div className={`z-10 ${showDropdownStatus ? 'block' : 'hidden'} absolute top-full left-0 bg-white min-w-[275px] mt-1 rounded-md shadow-lg`}>
                            <ul className="text-sm text-gray-700 dark:text-gray-200">
                                {statusPenerimaan.map((status, index) => (
                                    <li key={index}>
                                        <button 
                                            className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                                            type="button"
                                            onClick={() => handleStatusChange(status)}
                                        >
                                            {status}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {!selectedBatch && (
                            <p className="text-red-500 text-sm mt-1">This field is required.</p>
                        )}
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <button
                            className="bg-accent w-[225px] h-[40px] rounded-lg text-white hover:bg-primary transistion-all duration-300"
                            type="button"
                            onClick={() => router.push('/admin/dashboard/pelamar')}
                        >
                            Batal
                        </button>
                        <button
                            className="bg-accent w-[225px] h-[40px] rounded-lg text-white hover:bg-primary transistion-all duration-300"
                            type="button"
                            onClick={handleDownload}
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
            <ErrorModal
                show={showError}
                title="Error"
                message={error}
                onConfirm={() => setShowError(false)}
            />
        </>
    );
};

export default DownloadPDF;