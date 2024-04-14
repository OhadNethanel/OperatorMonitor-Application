import getStatusColor from "../utils/getStatusColor";
import React from "react";

export default ({ name, statusChanges, statuses = [], timeStamps = [] }) => {



    const Chart = ({ statuses, timeStamps }) => {
        const getHours = (timestamp) => {
            const date = new Date(timestamp);
            return date.getHours() + date.getMinutes() / 60;
        };

        const renderStatuses = () => {
            return statuses.map((status, index) => {
                const timestamp = timeStamps[index];
                const hours = getHours(timestamp);

                const dotStyle = {
                    position: "absolute",
                    left: `${(hours / 24) * 100}%`,
                    bottom: `${(status / Math.max(...statuses)) * 100 - 13}%`,
                    transform: "translate(-50%, 50%)",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getStatusColor(status),
                    zIndex: 2,
                };

                const labelStyle = {
                    position: "absolute",
                    left: `${(hours / 24) * 100}%`,
                    bottom: `${(status / Math.max(...statuses)) * 100 - 5}%`,
                    transform: "translate(-50%, 50%)",
                    // color: "black", // Label color
                    zIndex: 1,
                    color: "white",
                    fontSize: "16px",
                };

                return (
                    <div style={{ width: '100%', height: '100%', backgroundColor: "gray" }}>

                        <div style={dotStyle}></div>
                        <div style={labelStyle}>
                            {new Date(timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                );
            });
        };

        const renderTimelineLabels = () => {
            const labels = Array.from({ length: 24 }, (_, i) => i);
            return labels.map((hour) => (
                <div
                    key={hour}
                    style={{
                        position: "absolute",
                        left: `${(hour / 24) * 100}%`,
                        bottom: "0",
                        transform: "translateX(-50%)",
                        fontSize: "12px",
                        zIndex: 1,
                    }}
                >
                    {hour}:00
                </div>
            ));
        };

        return (
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",

                    border: "1px solid black",
                }}
            >
                {renderStatuses()}
                {renderTimelineLabels()}
            </div>
        );
    };

    // const App = () => {
    //   const statuses = [5, 3, 2, 4, 6, 3, 2, 5, 7, 4, 6, 3, 2, 4, 5, 6, 7, 8];
    //   const timestamps = [
    //     "2023-12-03T09:48:59.238Z",
    //     "2023-12-03T10:48:59.238Z",
    //     "2023-12-03T11:48:59.238Z",
    //     "2023-12-03T12:48:59.238Z",
    //     "2023-12-03T13:48:59.238Z",
    //     "2023-12-03T14:48:59.238Z",
    //     "2023-12-03T15:48:59.238Z",
    //     "2023-12-03T16:48:59.238Z",
    //     "2023-12-03T17:48:59.238Z",
    //     "2023-12-03T18:48:59.238Z",
    //     "2023-12-03T19:48:59.238Z",
    //     "2023-12-03T20:48:59.238Z",
    //     "2023-12-03T21:48:59.238Z",
    //     "2023-12-03T22:48:59.238Z",
    //     "2023-12-03T23:48:59.238Z",
    //   ];
    //   return (
    //     <div>
    //       <h1>Status Chart</h1>
    //       <Chart statuses={statuses} timestamps={timestamps} />
    //     </div>
    //   );
    // };
    // export default App;
    return <div style={{ width: '100%', display: "flex", flexWrap: "wrap", }}>
        {/* <Text text={`${name}`.replace('"',"")}  value={statusChanges} /> */}
        <span
            style={{
                // whiteSpace: "nowrap",
                width: '100%',
                textAlign: "center",
                padding: "8px 12px",
                fontSize: "14px",
                lineHeight: "25px",
                borderRadius: "30px 30px 0 0",
                color: "#fbbb02",
                background: "#4c4848",
                border: `1px solid #CDD9ED`,
            }}
        >
            <label
                style={{
                    fontSize: 18,
                    wordBreak: "break-word",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >

                {`${name}`.replaceAll('"', "")}
            </label>
        </span>

        <div style={{ fontSize: 20, backgroundColor: "white", width: '100%' }}>
            <label>Status Changes: {statusChanges}</label>


            <Chart statuses={statuses} timeStamps={timeStamps} />
        </div>
    </div>;
};
