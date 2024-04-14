import { motion } from "framer-motion";
import Modal from "react-modal";
import SherutCube from "../SherutCube";
import CategoryCube from "../CategoryCube";
import { restoreFile } from "../../api/server";
import notification from "../../utils/notification";
import { useState } from "react";
import getParameterCaseInsensitive from "../../utils/getParameterCaseInsensitive";

export default ({ isOpen = false, onClose, data = {}, categories }) => {
  const [date, setDate] = useState(new Date())
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      style={{
        content: {
          // backgroundColor: "lightgrey",
          backgroundColor: "black",
          backgroundImage: "linear-gradient(to bottom, black, black, rgba(250,0,0,0.4))",
          // borderColor: "black",
          boxShadow: "0px 0px 100px red",
          borderRadius: 20
        },
      }}
    >
      <div>
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
            color: "white",
            textShadow: "purple 1px 0 10px",
          }}>Restore Sched</h2>
        </div>

        <div
          style={{
            display: "flex",
            // flexDirection: "column",
            textAlign: "center",
            fontFamily: "arial",
          }}
        >
          <h4 style={{
            color: "white",
            textShadow: "purple 1px 0 10px",
          }}>Upto Date: </h4>
          <input type="date" value={date.toLocaleDateString('en-CA')} onChange={(event) => {
            setDate(new Date(event.target.value))
          }} />
        </div>
        <div >

        <div style={{ backgroundColor: "white", height: 1 }} />

        <div
          style={{
            minHeight: 100,
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "black",
            // justifyContent: "center",
            // justifyContent:"flex-start"
          }}
          // initial={{ scale: 0, opacity: 0 }}
          // animate={{ scale: 1, opacity: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {categories[0] &&
            categories.map((element, index) => {

              const filteredDataByCategory = data?.filter(
                (item) => item.Category === element
              );

              const filteredArray = filteredDataByCategory.filter(item => {
                const dateSplit = getParameterCaseInsensitive(item, 'CurDate').replace(/[^0-9/]/g, "").split("/");
                const dt2 = new Date(
                  +dateSplit[2],
                  +dateSplit[1] - 1,
                  +dateSplit[0],
                );
                return dt2 >= date
              })

              if (!filteredArray[0]) return
              // const dateSplit = getParameterCaseInsensitive(job, 'CurDate').replace(/[^0-9/]/g, "").split("/");
              // const dt2 = new Date(
              //   +dateSplit[2],
              //   +dateSplit[1] - 1,
              //   +dateSplit[0],
              // );

              // if (dt2 <= date) return
              // const filteredArray = sortedData.filter(item => {
              //   const itemDate = new Date(item.curDate)
              //   return itemDate >= date
              // })


              return <CategoryCube key={`cat_${index}`} name={element} />;
            })}
        </div>
        </div>


        {/* <div
          style={{
            minHeight: 100,
            display: "flex",
            backgroundColor: "black",
          }}
        >
          {categories[0] &&
            categories.map((element) => {
              return <CategoryCube name={element} />;
            })}
        </div> */}
        <div style={{ backgroundColor: "white", height: 1 }} />

        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignSelf: "flex-start",
            // justifyContent: "space-evenly",

            overflow: "auto",
          }}
        >
          {categories[0] &&
            data[0] &&
            categories.map((element) => {
              const filteredDataByCategory = data?.filter(
                (item) => item.Category === element
              );
              const sortedData = filteredDataByCategory.sort(
                (a, b) => b.StatusCode - a.StatusCode
              );

              const filteredArray = sortedData.filter(item => {
                const dateSplit = getParameterCaseInsensitive(item, 'CurDate').replace(/[^0-9/]/g, "").split("/");
                const dt2 = new Date(
                  +dateSplit[2],
                  +dateSplit[1] - 1,
                  +dateSplit[0],
                );
                return dt2 >= date
              })

              if (!filteredArray[0]) return

              return (
                <div style={{ display: "flex", flexDirection: "column", width: '100%' }}>

                  {sortedData.map((job) => {


                    return (
                      <SherutCube
                        onSherutClick={(data) => {
                          if (
                            window.confirm(
                              "Are you sure you want to restore this file?"
                            )
                          ) {
                            // Save it!
                            restoreFile(data.FileName)
                              .then(() => {
                                onClose();
                              })
                              .catch((err) => {
                                notification(
                                  "Error",
                                  `Cannot Restore File, ${err?.response?.data ||
                                  "Please try again."
                                  }`,
                                  "danger"
                                );
                              });
                          } else {
                            // Do nothing!
                          }
                        }}
                        data={job}
                      />
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </Modal>
  );
};
