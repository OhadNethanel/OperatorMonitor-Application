import { motion } from "framer-motion";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import CustomSwitch from "../CustomSwitch";

export default ({ isOpen = false, onClose, categories }) => {

  const [selectedCat, setSelectedCat] = useState({})

  useEffect(() => {
    if (isOpen)
      setSelectedCat(JSON.parse(localStorage.getItem("categories")))

    // console.log(localStorage.getItem("categories"))

    // setSelectedCat(JSON.parse(localStorage.getItem("categories")) || {})
  }, [isOpen])

  useEffect(() => {
    const cats = JSON.stringify(selectedCat)
    // console.log({cats})
    if (isOpen)
      localStorage.setItem("categories", cats)
  }, [selectedCat])


  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      style={{
        content: {
          // backgroundColor: "lightgrey",
          backgroundImage: "linear-gradient(to bottom, black, black, rgb(50,0,0))",

          // borderColor: "black",
          boxShadow: "0px 0px 100px rgb(50,0,0)",
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
            height: '80%'
          }}
        >
          <h2 style={{
            textShadow: "purple 1px 0 10px",
            color: "white"
          }}>Display Categories</h2>
          <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", justifyItems: "center", height: '100%', gap: 20 }}>

            {/* render categories that are live */}
            {categories[0] && categories.map((e,i) => {
              return <CustomSwitch key={i} checked={selectedCat[e] == true ? true : selectedCat[e] == null ? true : false} text={e} style={{ width: 50, height: 20, }} onChange={(res) => {
                setSelectedCat({ ...selectedCat, [res.text]: res.checked })
              }} />
            })}

            {/* render categories that are not live but were selected in the past */}
            {Object.keys(selectedCat)[0] && Object.keys(selectedCat).filter(item => !categories?.includes(item)).map((e,i) => {
              return <CustomSwitch key={i} checked={selectedCat[e] == true ? true : selectedCat[e] == null ? true : false} text={e} style={{ width: 50, height: 20, }} onChange={(res) => {
                setSelectedCat({ ...selectedCat, [res.text]: res.checked })
              }} />
            })}
          </div>
        </div>

      </div>
    </Modal>
  );
};
