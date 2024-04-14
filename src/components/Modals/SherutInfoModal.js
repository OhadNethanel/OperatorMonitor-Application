import { motion } from "framer-motion";
import Modal from "react-modal";
import Text from "../Text";
import { removeFile } from "../../api/server";
import notification from "../../utils/notification";
import { useEffect, useState } from "react";
import getParameterCaseInsensitive from "../../utils/getParameterCaseInsensitive";
import CustomSwitch from "../CustomSwitch";
import BarChart from "../BarChart";

export default ({ modalData = {}, tutorial = false, onClose, onDelete }) => {




  //regular tags to ignore when parsing additional information tags
  const filterList = ['filename', 'curdate', 'curtime', 'enddate', 'endtime', 'startdate', 'starttime', 'category', 'name', 'statuscode', 'statuscomment', 'visibilitycode', 'info', 'expminute', 'comment', 'color']

  const [viewRawData, setViewRawData] = useState(false)

  const [zoom, setZoom] = useState(1)
  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalData ? true : false}
      // isOpen
      style={{
        content: {
          // backgroundColor: "lightgrey",
          backdropFilter: "blur(7.5px)", WebkitBackdropFilter: "blur(7.5px)", backgroundColor: "rgba(255,255,255,0.7)",
          borderRadius: 10,
          boxShadow: `0px 0px 50px rgba(15,15,164,0.8)`,
          //backgroundColor:"black",
          // borderColor: "black",
        },
      }}
    >

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Text text={"Category"} value={getParameterCaseInsensitive(modalData, "category")} />
              <Text text={"Name"} value={getParameterCaseInsensitive(modalData, "name")} />
              <Text
                text={"Event Date"}
                value={`${getParameterCaseInsensitive(modalData, "curdate")} - ${getParameterCaseInsensitive(modalData, "curtime")}`}
              />
              <Text textStyle={{
                //  backgroundColor: modalData.color == "white" ? "red" : "white"

                backgroundImage: `linear-gradient(to right, white,  ${getParameterCaseInsensitive(modalData, "statuscode") == 4 ? 'rgb(156,220,254)' : "white"})`,
                // backgroundImage: `linear-gradient(to right, white,  ${getParameterCaseInsensitive(modalData, "statuscode") == 4 ? "red" : "white"})`,


              }} text={"Expiration: (min)"} value={getParameterCaseInsensitive(modalData, "expminute")} />
              {/* <Text text={"Expiration: (time)"} value={modalData.ExpMinute} /> */}
              <Text
                text={"Start"}
                value={`${getParameterCaseInsensitive(modalData, "startdate") || ""} - ${getParameterCaseInsensitive(modalData, "starttime") || ""
                  }`}
              />
              <Text
                text={"End"}
                value={`${getParameterCaseInsensitive(modalData, "enddate") || ""} - ${getParameterCaseInsensitive(modalData, "endtime") || ""
                  }`}
              />
              <Text textStyle={{
                backgroundImage: `linear-gradient(to right, white, ${getParameterCaseInsensitive(modalData, "color")})`,
                //  backgroundColor: modalData.color
              }} text={"Status Code"} value={getParameterCaseInsensitive(modalData, "statuscode")} />
              <Text text={"File"} value={modalData.FileName} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  // justifyContent: "center",
                }}
              >
                <span
                  style={{
                    // flex: 1,
                    margin: 5,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    padding: "8px 12px",
                    fontSize: "14px",
                    lineHeight: "25px",
                    borderRadius: "6px",
                    color: "#fbbb02",
                    background: "#4c4848",
                    border: `1px solid #CDD9ED`,
                    fontSize: 18,

                  }}
                >
                  <CustomSwitch style={{}} checked={setViewRawData} activeColor="#00E2D3" onChange={(res) => setViewRawData(res.checked)} />
                  Status Comment
                </span>

                <textarea
                  readOnly
                  style={{
                    resize: "none",
                    // overflow: "hidden",
                    overflow: "auto",
                    fontSize: 18,
                    height: 400,
                    // backgroundColor: "#FFFEED", //: "lightgray",
                    backgroundColor: "#FFF", //: "lightgray",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    fontFamily: "Arial, sans-serif",

                  }}
                  value={`${viewRawData ? `<<<<<RAW DATA>>>>>\n➖➖➖➖➖➖➖➖\n${Object.keys(modalData).map((elem) => { return `${elem}: ${modalData[elem]}` }).join('\n')}` : `${getParameterCaseInsensitive(modalData, "statuscomment") || ""}\n${getParameterCaseInsensitive(modalData, "comment") || ""}\n${Object.keys(modalData).filter((key) => !filterList.includes(key.toLowerCase())).map((elem) => { return `${elem}: ${modalData[elem]}` }).join('\n')}`}`}
                />


                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    // margin: 10,
                    marginTop: 40,
                    gap: 5,
                    flexWrap: "wrap",
                  }}
                >

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0px 0px 50px black` }}
                    whileTap={{ scale: 0.99 }}
                    style={{
                      borderRadius: 5,
                      cursor: "pointer",
                      fontSize: 22,
                      width: 300,
                      height: 65,
                      //boxShadow: "0px 0px 20px black",
                      backgroundImage: "linear-gradient(to bottom, black, grey)",
                      color: "white",
                    }}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Close Alert Information
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0px 0px 50px red` }}
                    whileTap={{ scale: 0.99 }}
                    style={{
                      borderRadius: 5,
                      cursor: "pointer",
                      fontSize: 22,
                      width: 230,
                      height: 65,
                      // backgroundImage: "linear-gradient(to bottom, black, #4c4848)",
                      backgroundImage: "linear-gradient(to bottom, black, black, red)",
                      color: "white",
                      //boxShadow: "0px 0px 15px red",
                    }}
                    onClick={() => {
                      removeFile(modalData.FileName)
                        .then(() => {
                          // setDeleteModalData(true);
                          onDelete();
                        })
                        .catch((err) => {
                          notification(
                            "Error",
                            `Cannot Remove File, ${err?.response?.data || "Please try again."
                            }`,
                            "danger"
                          );
                        });
                    }}
                  >
                    ❌ Delete Alert
                  </motion.button>
                </div>

                {tutorial && <div style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: 50,
                  gap: 5,
                  flexWrap: "wrap",
                }}>
                  <motion.button
                    whileHover={{ scale: 1.1, boxShadow: `0px 0px 50px purple` }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      borderRadius: 5,
                      cursor: "pointer",
                      fontSize: 22,
                      width: 50,
                      height: 65,
                      // backgroundImage: "linear-gradient(to bottom, black, #4c4848)",
                      backgroundImage: "linear-gradient(to bottom, black, black, grey)",
                      color: "white",
                      //boxShadow: "0px 0px 15px red",
                    }}
                    onClick={() => {
                      setZoom(zoom - 0.5)

                    }}
                  >
                    ➖
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, boxShadow: `0px 0px 50px purple` }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      borderRadius: 5,
                      cursor: "pointer",
                      fontSize: 22,
                      width: 50,
                      height: 65,
                      // backgroundImage: "linear-gradient(to bottom, black, #4c4848)",
                      backgroundImage: "linear-gradient(to bottom, black, black, grey)",
                      color: "white",
                      //boxShadow: "0px 0px 15px red",
                    }}
                    onClick={() => {
                      setZoom(zoom + 0.5)
                    }}
                  >
                    ➕
                  </motion.button>

                </div>}

              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: tutorial || undefined }}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 2,
                height: 500,
                zoom
                // backgroundColor: "red",
              }}
            />
            {/* <Text text={"Category"} value={modalData.Category} />

        // <Text text={"Status Code"} value={modalData.StatusCode} /> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};
