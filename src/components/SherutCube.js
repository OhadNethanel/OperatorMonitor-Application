import ScaleText from "react-scale-text";
import getStatusColor from "../utils/getStatusColor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import getParameterCaseInsensitive from "../utils/getParameterCaseInsensitive";

export default ({ data, onSherutClick }) => {
  // const [difference, setDifference] = useState(false);

  // useEffect(() => {

  //   const calcDifference = () => {
  //     const date = getParameterCaseInsensitive(data, "enddate") || getParameterCaseInsensitive(data, "curdate")
  //     const time = getParameterCaseInsensitive(data, "endtime") || getParameterCaseInsensitive(data, "curtime")

  //     const dateSplit = date.replace(/[^0-9/]/g, "").split("/");
  //     const timeSplit = time.replace(/[^0-9:/]/g, "").split(":");
  //     const dt1 = new Date();
  //     const dt2 = new Date(
  //       +dateSplit[2],
  //       +dateSplit[1] - 1,
  //       +dateSplit[0],
  //       timeSplit[0],
  //       timeSplit[1],
  //       timeSplit[2]
  //     ); // Note: month is zero-based


  //     const diffMs = dt1 - dt2; // milliseconds between
  //     const diffMins = Math.floor(diffMs / 60000);



  //     setDifference(diffMins);
  //   };


  //   calcDifference();
  //   const timer = setInterval(() => {
  //     calcDifference();
  //   }, 5000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [data]);

  return (
    <motion.div
    // style={{order:}}
    // initial={{ scale: 0, opacity: 0 }}
    // animate={{ scale: 1, opacity: 1 }}
    // transition={{ duration: Math.floor(Math.random() * 3) + 1 }}
    >
      <motion.div
        // whileHover={{ transition: { duration: 0.1 }, scale: 1.12, boxShadow: `0px 0px 40px ${getParameterCaseInsensitive(data, "color") ? getParameterCaseInsensitive(data, "color") : getParameterCaseInsensitive(data, "statuscode") != 0 ? getStatusColor(+getParameterCaseInsensitive(data, "statuscode")) : (+getParameterCaseInsensitive(data, "expminute")) ? +difference >= (+getParameterCaseInsensitive(data, "expminute")) ? "white" : getStatusColor(+getParameterCaseInsensitive(data, "statuscode")) : getStatusColor(+getParameterCaseInsensitive(data, "statuscode"))}`, }}
        whileHover={{ transition: { duration: 0.1 }, scale: 1.12, 
        boxShadow: `0px 0px 40px ${getParameterCaseInsensitive(data, "color") ? getParameterCaseInsensitive(data, "color") : getStatusColor(+getParameterCaseInsensitive(data, "statuscode"))}`,
       }}
        whileTap={{ transition: { duration: 0.1 }, scale: 0.95 }}
        onClick={() => onSherutClick({
          // ...data, Color: getParameterCaseInsensitive(data, "color") ? getParameterCaseInsensitive(data, "color") : getParameterCaseInsensitive(data, "statuscode") != 0 ? getStatusColor(+getParameterCaseInsensitive(data, "statuscode")) : (+getParameterCaseInsensitive(data, "expminute")) ? +difference >= (+getParameterCaseInsensitive(data, "expminute")) ? "white" : getStatusColor(+getParameterCaseInsensitive(data, "statuscode")) : getStatusColor(+getParameterCaseInsensitive(data, "statuscode")),
          ...data, Color: getParameterCaseInsensitive(data, "color") ? getParameterCaseInsensitive(data, "color") : getStatusColor(+getParameterCaseInsensitive(data, "statuscode")),
        })}
        style={{
          margin: 1,
          borderRadius: 5,
          fontFamily: "arial",
          cursor: "pointer",
          flex: 1,
          height: 130,
          maxHeight: 150,
          minHeight: 100,
          maxWidth: 200,
          minWidth: 5,
          borderWidth: 2,
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: "1px",
          // backgroundColor: getParameterCaseInsensitive(data, "color") ? getParameterCaseInsensitive(data, "color") : getParameterCaseInsensitive(data, "statuscode") != 0 ? getStatusColor(+getParameterCaseInsensitive(data, "statuscode")) : (+getParameterCaseInsensitive(data, "expminute")) ? +difference >= (+getParameterCaseInsensitive(data, "expminute")) ? "white" : getStatusColor(+getParameterCaseInsensitive(data, "statuscode")) : getStatusColor(+getParameterCaseInsensitive(data, "statuscode")),
          backgroundColor: getParameterCaseInsensitive(data, "color") ? getParameterCaseInsensitive(data, "color") : getStatusColor(+getParameterCaseInsensitive(data, "statuscode")),
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "flex",
          alignItems: "center", // Center vertically
          justifyContent: "center", // Center horizontally
        }}
      >
        <ScaleText>
          <p
            style={{
              fontFamily: "arial",
              wordBreak: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: 6,
            }}
          >
            {/* {data.Name.length < 9 ? `${data.Name} @${data.Category}`:data.Name} */}
            {getParameterCaseInsensitive(data, "name")}
          </p>
        </ScaleText>
      </motion.div>
    </motion.div>
  );
};
