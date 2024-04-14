import { motion } from "framer-motion";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { getAvailableLogs, logAnalyze } from "../../api/server";
import LogComponent from "../LogComponent";

export default ({ isOpen = false, onClose }) => {

  const [logsList, setLogsList] = useState(false)
  const [logsData, setLogsData] = useState(false)
  
  
  const [selectedYear, setSelectedYear] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(false)
  const [selectedLog, setSelectedLog] = useState(false)


  useEffect(() => {
    if (isOpen) {
      setSelectedYear(false)
      setSelectedMonth(false)
      setLogsList(false)
      setLogsData(false)
      setSelectedLog(false)
      getAvailableLogs().then(setLogsList).catch((e) => { })
      //what to do if modal is open
    }

  }, [isOpen])


  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      style={{
        content: {
          // backgroundColor: "lightgrey",
          backgroundImage: "linear-gradient(to bottom, black, black, rgb(50,0,50))",

          boxShadow: "0px 0px 100px rgb(50,0,50)",
          borderRadius: 20
        },
      }}
    >
      <div style={{ height: '100%' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            borderRadius: 5,
            cursor: "pointer",
            width: 180,
            height: 50,
            boxShadow: "0px 0px 20px black",
          }}
          onClick={() => {
            onClose();
          }}
        >
          ❌ Close
        </motion.button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            fontFamily: "arial",
          }}
        >
          <h2 style={{
            textShadow: "purple 1px 0 10px",
            color: "white"
          }}>Analyze Monitor Logs{selectedLog ? ` :: ${selectedLog}`:undefined}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyItems: "center", height: '100%', gap: 20, }}>


            {!logsData && logsList && !selectedYear && !selectedMonth && <div>
              {Object.keys(logsList).map((e) => {
                return <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 0px 10px purple",
                  }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    fontSize: 24,
                    borderRadius: 5,
                    cursor: "pointer",
                    // width: 250,
                    height: 60,
                    color: "white",
                    backgroundImage: "linear-gradient(to right, black, #252222)",
                  }}
                  onClick={() => {
                    setSelectedYear(e)
                  }}
                >
                  {e}
                </motion.button>
              })}
            </div >}

            {!logsData && logsList && selectedYear && !selectedMonth && <div>

              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 10px purple",
                }}
                whileTap={{ scale: 0.9 }}
                style={{
                  borderRadius: 5,
                  cursor: "pointer",
                  fontSize: 24,

                  color: "white",
                  backgroundImage: "linear-gradient(to right, black, #252222)",
                }}
                onClick={() => {
                  setSelectedYear(false)
                }}
              >
                ⬅
              </motion.button>
              <br />      <br />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>

                {Object.keys(logsList[selectedYear]).map((e) => {
                  return <motion.button
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 10px purple",
                    }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      borderRadius: 5,
                      cursor: "pointer",
                      width: 50,
                      height: 60,
                      color: "white",
                      backgroundImage: "linear-gradient(to right, black, #252222)",
                    }}
                    onClick={() => {
                      setSelectedMonth(e)
                    }}
                  >
                    {e}
                  </motion.button>
                })}
              </div>
            </div >}





            {!logsData && logsList && selectedYear && selectedMonth && <div style={{ display: "flex", gap: 10, flexWrap: "wrap", width: '100%' }}>

              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 10px purple",
                }}
                whileTap={{ scale: 0.9 }}
                style={{
                  borderRadius: 5,
                  cursor: "pointer",
                  // width: 250,
                  fontSize: 24,

                  color: "white",
                  backgroundImage: "linear-gradient(to right, black, #252222)",
                }}
                onClick={() => {
                  setSelectedMonth(false)
                }}
              >
                ⬅
              </motion.button>
              <br />      <br />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>

                {Object.keys(logsList[selectedYear][selectedMonth]).map((e) => {
                  return <motion.button
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 10px purple",
                    }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      borderRadius: 5,
                      cursor: "pointer",
                      // width: 250,
                      height: 60,
                      color: "white",
                      backgroundImage: "linear-gradient(to right, black, #252222)",
                    }}
                    onClick={() => {
                      setSelectedLog(logsList[selectedYear][selectedMonth][e])
                      logAnalyze(logsList[selectedYear][selectedMonth][e]).then(setLogsData).catch(alert)
                    }}
                  >
                    {logsList[selectedYear][selectedMonth][e]}
                  </motion.button>
                })}
              </div >
            </div >}



            {logsData && <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 10px purple",
                }}
                whileTap={{ scale: 0.9 }}
                style={{
                  borderRadius: 5,
                  cursor: "pointer",
                  // width: 250,
                  color: "white",
                  backgroundImage: "linear-gradient(to right, black, #252222)",
                }}
                onClick={() => {
                  setLogsData(false)
                  setSelectedLog(false)
                }}
              >
                ⬅
              </motion.button>
              <br />      <br />

              <div style={{ display: "flex", flexWrap: "wrap", height: '100%', gap:30 }}>

                {(logsData).map((e) => {
                  return <LogComponent name={JSON.stringify(e[1]['name']) || e[0]} statusChanges={e[1]['statusChanges']} statuses={e[1]['statuses']} timeStamps={e[1]['times']} />

                  // <label style={{ color: "white" }}>
                  //   {/* {e} - Status Changes: {logsData[e]['statusChanges']} || {JSON.stringify(logsData[e]['statuses'])}                  */}
                  //   {JSON.stringify(e[1]['name']) || e[0]} - Status Changes: {JSON.stringify(e[1]['statusChanges'])} || {JSON.stringify(e[1]['statuses'])}

                  // </label>

                })}

              </div>
            </div>}
          </div>
        </div>

      </div>
    </Modal>
  );
};
