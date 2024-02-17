import { useState, useEffect, useRef } from "react";
type Step = {
    name: string;
    Component: JSX.Element;
};
interface CheckoutStepperProps {
    steps: Step[];
}

const CheckoutStepper = ({ steps }: CheckoutStepperProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const stepRef = useRef<(HTMLDivElement | null)[]>([]);
    const [margin, setMargin] = useState({
        marginLeft: 0,
        marginRight: 0,
    });

    useEffect(() => {
        setMargin({
            marginLeft: stepRef.current[0]?.offsetWidth / 2,
            marginRight: stepRef.current[steps.length - 1]?.offsetWidth / 2,
        });
    }, [steps.length]);
    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsComplete(true);
        }
    };
    const ActiveComponent = steps[currentStep - 1].Component;
    if (steps.length === 0) {
        return null;
    }
    return (
        <>
            <div className="stepper">
                {steps.map((step, index) => {
                    return (
                        <div
                            key={index}
                            ref={(el) => (stepRef.current[index] = el)}
                            className={`step ${currentStep > index + 1 || isComplete ? "complete" : ""}  ${
                                currentStep === index + 1 ? "active" : ""
                            }`}
                        >
                            <div className="step-number">
                                {currentStep > index + 1 || isComplete ? <span>&#10003;</span> : index + 1}
                            </div>
                            <div className="step-name">{step.name}</div>
                        </div>
                    );
                })}
                <div
                    className="progress-bar"
                    style={{
                        width: `calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
                        marginLeft: `${margin.marginLeft}px`,
                        marginRight: `${margin.marginRight}px`,
                    }}
                >
                    <div
                        className="progress"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>
                </div>
            </div>
            <ActiveComponent />
            <button className="btn" onClick={handleNext}>
                {currentStep === steps.length ? "Submit" : "Next"}
            </button>
        </>
    );
};

export default CheckoutStepper;
