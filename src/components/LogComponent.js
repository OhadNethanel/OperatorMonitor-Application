import getStatusColor from "../utils/getStatusColor";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default ({ name, statusChanges = 0, statuses = [], timeStamps = [] }) => {



    const Chart = ({ statuses, timeStamps }) => {
        const getHours = (timestamp) => {
            const date = new Date(timestamp);
            return date.getHours() + date.getMinutes() / 60;
        };

        const RenderStatuses = () => {
            const [show, setShow] = useState(false)
            const [showTS, setShowTS] = useState(false)

            return statuses.map((status, index) => {
                const timestamp = timeStamps[index];
                const hours = getHours(timestamp);

                const dotStyle = {
                    position: "absolute",
                    left: `${(hours / 24) * 100}%`,
                    bottom: `${(status / Math.max(...statuses)) * 100 - 13}%`, // Slightly lower
                    transform: "translate(-50%, 50%)",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getStatusColor(status), // Change color as needed
                    zIndex: 2,
                    cursor:"pointer",
                };

                const labelStyle = {
                    position: "absolute",
                    left: `${(hours / 24) * 100}%`,
                    bottom: `${(status / Math.max(...statuses)) * 100 - 40}%`, // Slightly lower
                    transform: "translate(-50%, 50%)",
                    color: "black", // Label color
                    zIndex: 1,
                    color: "black",
                    fontSize: "24px",
                };

                return (
                    <div style={{ width: '100%', }}>

                        <motion.div

                            onMouseEnter={() => {
                                setShow(true)
                                setShowTS(timestamp)
                            }}
                            onMouseLeave={() => {
                                setShow(false)
                                setShowTS(false)
                            }}
                            whileHover={{
                                boxShadow: `0px 0px 30px ${getStatusColor(status)}`,
                            }} style={dotStyle}></motion.div>
                        {show && timestamp == showTS && < div style={labelStyle}>
                            {new Date(timestamp).toLocaleTimeString()}
                        </div>}
                    </div >
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
                        color:"black"
                        ,fontWeight:"bold"
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
                    height: "100%",
                    // border: "1px solid black",
                }}
            >
                <RenderStatuses />
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


    return <div style={{ width: '100%', display: "flex", }}>
        {/* <Text text={`${name}`.replace('"',"")}  value={statusChanges} /> */}
        <span
            style={{

                // whiteSpace: "nowrap",
                width: '100%',
                textAlign: "center",
                padding: "8px 12px",
                fontSize: "14px",
                lineHeight: "25px",
                // borderRadius: "30px 30px 0 0",
                borderRadius: "30px",
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


            <div style={{ backgroundColor: "white", width: '100%' }}>
                <label style={{ fontSize: 20, color: "black" }}>Status Changes: {statusChanges}</label>
            </div>
            <div style={{ height: '90px', backgroundColor: "grey" }}>
                <Chart statuses={statuses} timeStamps={timeStamps} />
            </div>

        </span>
    </div>
}