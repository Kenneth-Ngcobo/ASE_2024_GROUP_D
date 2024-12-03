import { useState } from "react";

/**
 * A dropdown component to select the number of steps.
 * It allows the user to select a number from 0 (All) to 100.
 * 
 * @param {Object} props The component props.
 * @param {number} [props.selectedSteps=0] The initially selected number of steps (defaults to 0 if not provided).
 * @param {Function} props.onStepsChange The callback function to notify the parent component when the selected steps change.
 * 
 * @returns {JSX.Element} The StepsDropdown component.
 */
const StepsDropdown = ({ selectedSteps, onStepsChange }) => {
    const [steps, setSteps] = useState(selectedSteps || 0);

    /**
     * Handles the change in selected number of steps.
     * Updates the local state and informs the parent component.
     * 
     * @param {React.ChangeEvent<HTMLSelectElement>} e The change event from the select element.
     */
    const handleChange = (e) => {
        const value = Number(e.target.value);
        setSteps(value);
        onStepsChange(value); // Notify parent of the change
    };

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Number of Steps</label>
            <select
                value={steps}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
            >
                <option value="0">All</option>
                {Array.from({ length: 100 }, (_, i) => i + 1).map((step) => (
                    <option key={step} value={step}>{step}</option>
                ))}
            </select>
        </div>
    );
};

export default StepsDropdown;
