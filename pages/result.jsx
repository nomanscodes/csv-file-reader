import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
const Result = () => {
    const router = useRouter()
    const [parseData, setParseData] = useState([])

    useEffect(() => {
        const totalData = localStorage.getItem('totalData')
        if (totalData) {
            // const arrayOfObjects = Object.entries(JSON.parse(totalData)).map(([key, value]) => ({ key, value }));
            setParseData(JSON.parse(totalData))
        }
    }, [])


    const downloadPDF = () => {
        const capture = document.querySelector(".actual-receipt");

        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL("/img/png");
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeaight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeaight)
            doc.save("receipt.pdf")

        })
    }


    const gobackHandler = () => {
        router.push("/")
        localStorage.removeItem("totalData")
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='bg-[#eff3fc] w-[70%]  m-auto mt-10 p-8 overflow-hidden overflow-y-auto'>
                <div className='actual-receipt bg-white p-10 rounded'>
                    <div className='flex items-center justify-between border-b-2 py-3'>
                        <h1 className="font-[900] text-[35px] text-[#67798b] tracking-wide rounded-sm">
                            K<span className='text-[#397eb6]'>O</span>ICE
                        </h1>
                        <h1 className="font-[700] text-[24px] text-[#376071] tracking-wide rounded-sm">
                            Invoice
                        </h1>
                    </div>
                    <div className='flex justify-between py-4 border-b-2 mb-4'>
                        <p className='text-[14px] font-semibold text-[#67798b]'><span className='text-[#6f6a61] font-bold'>Date:</span> 22/01/2023</p>
                        <p className='text-[14px] font-semibold text-[#67798b]'><span className='text-[#6f6a61] font-bold'>ID NO:</span> 5461654</p>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p className='text-[15px] text-[#6f6a61] font-bold mb-2'>Project Information :</p>
                            <div className='flex items-center gap-1'>
                                <p className='font-[700] text-[14px] text-[#6f6a61]'>Project Name :</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.project_name}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <p className='font-[700] text-[14px] text-[#6f6a61]'>Project Description:</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.project_description}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <p className='font-[700] text-[14px] text-[#6f6a61]'>Client :</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.client}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <p className='font-[700] text-[14px] text-[#6f6a61]'>Contractor :</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.contractor}</p>
                            </div>
                        </div>
                        <div className='flex flex-col text-right'>
                            <p className='text-[15px] text-[#6f6a61] font-bold mb-2'>Made By </p>
                            <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>Battery Low Interactive Ltd.</p>
                            <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>House - 8, Road - 2 Baridhara J Block</p>
                            <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'> Dhaka 1212</p>
                            <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>batterylowinteractive.com</p>
                        </div>
                    </div>

                    <div className='mt-4 border rounded-sm'>
                        <div className='flex justify-evenly bg-[#f7f7f7] py-3 border-b'>
                            <p className='text-[#6f6a61] font-bold'>Maximum</p>
                            <p className='text-[#6f6a61] font-bold'>Minimum</p>
                        </div>
                        <div className='flex justify-evenly py-4 border-b'>
                            <div className='flex items-center gap-3'>
                                <p className='font-[700] text-[15px] text-[#424242]'>X :</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.x_max}</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <p className='font-[700] text-[15px] text-[#424242]'>X :</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.x_min}</p>
                            </div>
                        </div>
                        <div className='flex justify-evenly py-4 border-b'>
                            <div className='flex items-center gap-3'>
                                <p className='font-[700] text-[15px] text-[#424242]'>Y :</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.y_max}</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <p className='font-[700] text-[15px] text-[#424242]'>Y :</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.y_min}</p>
                            </div>
                        </div>
                        <div className='flex justify-evenly py-4 border-b'>
                            <div className='flex items-center gap-3'>
                                <p className='font-[700] text-[15px] text-[#424242]'>Z :</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.z_max}</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <p className='font-[700] text-[15px] text-[#424242]'>Z :</p>
                                <p className='font-[500] text-[14px] capitalize text-[#6f6a61]'>{parseData?.z_min}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-8'>
                <button onClick={gobackHandler} className="font-[600] text-[18px] px-6 py-2 bg-[#12695e] rounded-sm text-[#fff] mt-4 border-none ">Go Back</button>
                <button onClick={downloadPDF} className="font-[600] text-[18px] px-6 py-2 bg-[#f0a500] rounded-sm text-[#fff] mt-4 border-none ">Download PDF</button>
            </div>
        </div>
    )
}

export default Result