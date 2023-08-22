'use client'
import React, { useEffect, useState } from "react";
import Papa, { parse } from "papaparse";
import dynamic from "next/dynamic";
import { get_chart, get_results } from "@/utils";
import storedData from "../storage.json";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


function CSVToObjectConverter() {
  const router = useRouter()
  const [defaulTableChart, setDefaulTableChart] = useState({
    kp: [0, 0, 0, 0, 0, 0],
    x: [0, 0, 0, 0, 0, 0],
  });

  const [tableChart, setTableChart] = useState(null);
  const [resultData, setResultData] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        parseCSVToObject(content);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (!tableChart) {
      setTableChart(get_chart(defaulTableChart.kp, defaulTableChart.x));
    }
  }, [tableChart, defaulTableChart]);

  const parseCSVToObject = (csvString) => {
    Papa.parse(csvString, {
      header: true,
      complete: (result) => {
        let { data, kpData, xData } = get_results(result.data);
        setResultData(data);
        setTableChart(get_chart(kpData, xData));
      },
      error: (error) => {
        console.error("CSV parsing error:", error.message);
      },
    });
  };

  const [formData, setFormData] = useState({
    project_name: "",
    project_description: "",
    client: "",
    contractor: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const notify = () => toast('All Field Are Required');
  const handleSubmitData = () => {
    if (formData.client == "" || formData.contractor == "" ||
      formData.project_description == "" || formData.project_name == "" || resultData.x_max == "") {
      notify()
    } else {
      const totalData = JSON.stringify({ ...formData, ...resultData })
      localStorage.setItem("totalData", totalData)
      router.push(`/result`)
    }
  }

  return (
    <div className="">
      <Toaster />
      <div className="p-10">
        <div className="flex justify-between">
          <div>
            <h1 className="font-[700] text-[22px] tracking-wide text-[#f0a500] mb-5">
              Client Information
            </h1>
            <InputField
              placeholder={"Project Name"}
              name="project_name"
              value={formData?.project_name}
              label="Project Name"
              onChange={handleInputChange}
              type="text"
            />
            <InputField
              placeholder={"Project Description"}
              name="project_description"
              value={formData?.project_description}
              onChange={handleInputChange}
              label="Project Description"
              type="text"
            />
            <InputField
              placeholder={"Client"}
              name="client"
              value={formData?.client}
              label="Client"
              onChange={handleInputChange}
              type="text"
            />
            <InputField
              placeholder={"Contractor"}
              name="contractor"
              value={formData?.contractor}
              label="Contractor"
              onChange={handleInputChange}
              type="text"
            />
            <div className="flex flex-col mb-6">
              <label className="font-semibold text-[16px] text-[#424242] whitespace-nowrap mb-2">
                Upload CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="w-[800px]">
            <h1 className="font-[700] text-[22px] tracking-wide text-[#f0a500] mb-5">
              Chart View
            </h1>
            {tableChart && (
              <Chart
                height={450}
                options={tableChart?.options}
                series={tableChart?.series}
                type="bar"
              />
            )}
          </div>
        </div>
        <div className="border-t-2 pt-3">
          <h1 className="font-[700] text-[22px] tracking-wide text-[#f0a500] mb-5">
            All Information
          </h1>
          <div>
            <div className="flex items-start gap-10">
              <InputField
                label="Project name"
                disabled={true}
                value={formData?.project_name}
              />
              <InputField
                label="Project Descripton"
                disabled={true}
                value={formData?.project_description}
              />
            </div>
            <div className="flex items-start gap-10">
              <InputField
                label="Contractor"
                disabled={true}
                value={formData?.contractor}
              />
              <InputField
                label="Client"
                disabled={true}
                value={formData?.client}
              />
            </div>
            <div className="flex items-start gap-10">
              <InputField
                label="Maximum _X"
                disabled={true}
                value={resultData?.x_max}
              />
              <InputField
                label="Minimum _X"
                disabled={true}
                value={resultData?.x_min}
              />
            </div>
            <div className="flex items-start gap-10">
              <InputField
                label="Maximum _Y"
                disabled={true}
                value={resultData?.y_max}
              />
              <InputField
                label="Minimum _Y"
                disabled={true}
                value={resultData?.y_min}
              />
            </div>
            <div className="flex items-start gap-10">
              <InputField
                label="Maximum _Z"
                disabled={true}
                value={resultData?.z_max}
              />
              <InputField
                label="Minimum _Z"
                disabled={true}
                value={resultData?.z_min}
              />
            </div>
          </div>

          <button onClick={handleSubmitData} className="font-[600] text-[18px] px-6 py-2 bg-[#f0a500] rounded-sm text-[#fff] mt-4 border-none ">See Result</button>

        </div>
      </div>
    </div>
  );
}

export default CSVToObjectConverter;
