import React from 'react';

const InputField = ({ label, name, placeholder, value, onChange, grid, disabled, ...rest }) => {
    return (
        <div className=" flex flex-col mb-5">
            <label className="font-semibold text-[15px] text-[#424242] whitespace-nowrap mb-2">{label}</label>
            <input
                className="px-2 py-[7px] text-[16px] font-semibold text-[#424242] tracking-[.5px] border border-[#e2e2e5] rounded-sm focus:outline-none w-[500px] bg-[#f8f8f8]"
                name={name}
                
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}
                {...rest}
            />
        </div>
    );
};

export default InputField;