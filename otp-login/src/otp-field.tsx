import React, { useState, useRef, useEffect } from "react";

interface OTPFieldProps {
    length?: number;
    onOtpSubmit: (otp: string) => void;
}
function OTPField({ length = 4, onOtpSubmit }: OTPFieldProps) {
    const [otp, setOtp] = useState<string[]>(Array.from({ length }, () => ""));
    const inputRef = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join("");

        if (combinedOtp.length === length) {
            onOtpSubmit(combinedOtp);
        }

        if (value && index < length - 1 && inputRef.current[index + 1]) {
            inputRef.current[index + 1].focus();
        }

        if (value && index < length - 1) {
            const nextIndex = newOtp.findIndex((otpValue, i) => !otpValue && i > index);
            if (nextIndex !== -1 && inputRef.current[nextIndex]) {
                inputRef.current[nextIndex].focus();
            }
        }
    };

    const handleClick = (index: number) => {
        inputRef.current[index].setSelectionRange(1, 1);

        if (index > 0 && !otp[index - 1]) {
            const nextIndex = otp.indexOf("");
            if (inputRef.current[nextIndex]) {
                inputRef.current[nextIndex].focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRef.current[index - 1]) {
            inputRef.current[index - 1].focus();
        }
    };

    return (
        <div>
            {otp.map((value, index) => {
                return (
                    <input
                        key={index}
                        type="text"
                        className="otp-field"
                        value={value}
                        ref={(input) => (inputRef.current[index] = input as HTMLInputElement)}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                );
            })}
        </div>
    );
}

export default OTPField;
