import "./App.css";
import OTPField from "./otp-field";

function App() {
    return (
        <>
            <h1>OTP Login</h1>
            <div className="card">
                <OTPField length={4} onOtpSubmit={(otp) => console.log(otp)} />
            </div>
        </>
    );
}

export default App;
