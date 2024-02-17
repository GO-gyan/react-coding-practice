import "./App.css";
import CheckoutStepper from "./components/stepper";
import { CHECKOUT_STEPS } from "./constants/data";

function App() {
    const stepsConfig = CHECKOUT_STEPS.map((step) => {
        return {
            name: step.label,
            Component: () => <div>{step.description}.</div>,
        };
    });
    return (
        <>
            <h2>Stepper</h2>
            <CheckoutStepper steps={stepsConfig} />
        </>
    );
}

export default App;
