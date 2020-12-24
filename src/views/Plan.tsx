import React, { ReactElement, useState } from 'react'

interface Props {
    weekNumber: Number
}

export default function Plan({ }: Props): ReactElement {
    const [weekNumber, setWeekNumber] = useState();
    return (
        <div className="flex-column w-full">
            <div>Plan</div>
            <div className="flex-row">
                <div className="flex-column">
                    <div>Monday</div>
                </div>
                <div className="flex-column">
                    <div>Tuesday</div>
                </div>
                <div className="flex-column">
                    <div>Wednesday</div>
                </div>
                <div className="flex-column">
                    <div>Thursday</div>
                </div>
                <div className="flex-column">
                    <div>Friday</div>
                </div>
                <div className="flex-column">
                    <div>Saturday</div>
                </div>
                <div className="flex-column">
                    <div>Sunday</div>
                </div>
            </div>
        </div>
    )
}

