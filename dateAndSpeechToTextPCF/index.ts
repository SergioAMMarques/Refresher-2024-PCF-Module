import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { ContainerPCF, IContainerPCFProps } from "./ContainerPCF";

export class dateAndSpeechToTextPCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private contextObj: ComponentFramework.Context<IInputs>;

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
        this.contextObj = context;
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

        // Ensure that activityDescription is a string (use empty string if it's null)
        const activityDescription: string = context.parameters.sam_activitydescription.raw ?? "";

        // Calculate the difference in days between the start date and end date (or today's date)
        const daysPassed = this.calculateDaysPassed(startDateValue, endDateValue);

        const onSpeechResult = (transcript: string): void => {
            // Concatenate the existing description with the transcript
            const updatedDescription = `${activityDescription} ${transcript}`.trim();

            // Assign the updated description to sam_activitydescription.raw, ensure null where expected
            context.parameters.sam_activitydescription.raw = updatedDescription === "" ? null : updatedDescription;

            // Notify Power Apps that the output has changed
            this.notifyOutputChanged();
        };

        const status = context.parameters.statuscode.raw ?? 0;
        const cost = context.parameters.sam_cost.raw ?? 0;

        const props: IContainerPCFProps = {
            daysPassed: daysPassed,
            onSpeechResult: onSpeechResult, // Pass the speech handler to the container
            status: status,
            cost: cost
        };

        return React.createElement(
            ContainerPCF, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            sam_activitydescription: this.contextObj.parameters.sam_activitydescription.raw ?? undefined
        };
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

    /**
     * Setter function to update the activity description.
     * This function is now a separate method within the class.
     * @param newDescription - The new description to set.
     */
    private setActivityDescription = (newDescription: string): void => {
        if (this.contextObj && this.contextObj.parameters && this.contextObj.parameters.sam_activitydescription) {
            this.contextObj.parameters.sam_activitydescription.raw = newDescription;
            this.notifyOutputChanged();
        } else {
            console.error("contextObj or parameters is undefined.");
        }
    }

}
