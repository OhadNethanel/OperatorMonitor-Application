import { motion } from "framer-motion";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import CustomSwitch from "../CustomSwitch";

export default ({ isOpen = false, onClose, data }) => {


  useEffect(() => {
    if (isOpen) {
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
          backgroundImage: "linear-gradient(to bottom, black, black, rgb(50,0,0))",

          boxShadow: "0px 0px 100px darkblue",
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
          }}>Analyze Monitor Logs</h2>
          <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", justifyItems: "center", height: '100%', gap: 20 }}>

          </div>
        </div>

      </div>
    </Modal>
  );
};
