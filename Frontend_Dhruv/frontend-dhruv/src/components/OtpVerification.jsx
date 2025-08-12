import React, { useState, useRef, useEffect } from "react";

const OTP_LENGTH = 6;

const OtpVerification = ({ email, onVerificationSuccess, onResendOtp, isSignup, onBack }) => {
	const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [timer, setTimer] = useState(30);
	const inputRefs = useRef([]);

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => setTimer((t) => t - 1), 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	const handleChange = (e, idx) => {
		const val = e.target.value.replace(/[^0-9]/g, "");
		if (val.length > 1) return;
		const newOtp = [...otp];
		newOtp[idx] = val;
		setOtp(newOtp);
		if (val && idx < OTP_LENGTH - 1) {
			inputRefs.current[idx + 1].focus();
		}
	};

	const handleKeyDown = (e, idx) => {
		if (e.key === "Backspace" && !otp[idx] && idx > 0) {
			inputRefs.current[idx - 1].focus();
		}
	};

	const handlePaste = (e) => {
		const paste = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
		if (/^\d{6}$/.test(paste)) {
			setOtp(paste.split(""));
			inputRefs.current[OTP_LENGTH - 1].focus();
		}
		e.preventDefault();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		const otpCode = otp.join("");
		try {
			const { otpService } = await import("../services/otpService");
			const result = await otpService.verifyOtp(email, otpCode);
			setLoading(false);
			onVerificationSuccess(result);
		} catch (err) {
			setLoading(false);
			setError(err.message || "OTP verification failed");
		}
	};

	const handleResend = async () => {
		setError("");
		setLoading(true);
		try {
			await onResendOtp();
			setTimer(30);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError("Failed to resend OTP");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
			<form className="max-w-md w-full p-8 bg-white rounded shadow-lg" onSubmit={handleSubmit}>
				<h2 className="text-2xl font-bold mb-2 text-gray-800">Verify Your Email</h2>
				<p className="mb-4 text-gray-600">Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span></p>

				<div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
					{otp.map((digit, idx) => (
						<input
							key={idx}
							ref={(el) => (inputRefs.current[idx] = el)}
							type="text"
							inputMode="numeric"
							maxLength={1}
							value={digit}
							onChange={(e) => handleChange(e, idx)}
							onKeyDown={(e) => handleKeyDown(e, idx)}
							className="w-12 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
							autoFocus={idx === 0}
							aria-label={`OTP digit ${idx + 1}`}
						/>
					))}
				</div>

				{error && <div className="text-red-600 mb-2">{error}</div>}

				<button
					type="submit"
					disabled={loading || otp.some((d) => !d)}
					className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
				>
					{loading ? "Verifying..." : "Verify OTP"}
				</button>

				<div className="flex justify-between items-center mt-4">
					<button
						type="button"
						onClick={onBack}
						className="text-blue-600 hover:underline"
					>
						Back
					</button>
					<button
						type="button"
						onClick={handleResend}
						disabled={timer > 0 || loading}
						className="text-blue-600 hover:underline disabled:text-gray-400"
					>
						{timer > 0 ? `Resend OTP (${timer}s)` : "Resend OTP"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default OtpVerification;

