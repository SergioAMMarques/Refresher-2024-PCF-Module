import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { FlipCounter, IFlipCounterProps } from "./FlipCounter";
import * as React from "react";

export class dateAndSpeechToTextPCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        const startDateValue = context.parameters.sam_mastartdate.raw;
        const endDateValue = context.parameters.sam_enddate.raw;

        // Calculate the difference in days between the start date and end date (or today's date)
        const daysPassed = this.calculateDaysPassed(startDateValue, endDateValue);

        // Pass the startDateValue and endDateValue to the React component
        const props: IFlipCounterProps = {
            daysPassed: daysPassed
        };

        return React.createElement(
            FlipCounter, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    /**
     * Calculates the difference in days between a provided start date and end date. If no end date is provided, the function defaults to using the current date (today).
     * @param {Date | null} startDate - The starting date from which the days passed will be calculated. If null or undefined, the function returns 0.
     * @param {Date | null} [endDate] - The ending date until which the days passed will be calculated. If null or undefined, the function will use the current date (today).
     * @returns {number} - The difference in days between the startDate and endDate, or between startDate and today's date if endDate is not provided. If startDate is not provided, returns 0.
     */
    private calculateDaysPassed(startDate?: Date | null, endDate?: Date | null): number {
        if (!startDate) {
            return 0; // If no start date is provided, return 0 days passed
        }

        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date(); // Use today's date if endDate is not provided
        const timeDiff = end.getTime() - start.getTime();

        return Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    }
}
