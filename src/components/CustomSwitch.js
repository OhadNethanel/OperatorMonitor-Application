import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default ({
    text = "",
    onChange,
    style,
    checked = false,
    activeColor = "green",
    disableColor = "darkgrey",
    pointColor = "white",
    img = false,
}) => {
    const [isOn, setIsOn] = useState(checked);

    const toggleSwitch = () => {
        setIsOn(!isOn);
        onChange({ checked: !isOn, text });
    };

    useEffect(() => {
        setIsOn(checked);
    }, [checked]);

    return (
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>

            <motion.div

                whileHover={{ boxShadow: `0px 0px 30px ${activeColor }` }}


                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: isOn ? activeColor : disableColor,
                    display: "flex",
                    justifyContent: isOn ? "flex-end" : "flex-start",
                    borderRadius: "50px",
                    padding: "10px",
                    cursor: "pointer",
                    ...style,
                }}
                onClick={toggleSwitch}
            >



                {img ? (
                    <motion.img
                        src={img}
                        style={{
                            // width: "50%",
                            // height: "100%",
                            // backgroundColor: pointColor,
                            borderRadius: "40px",
                        }}
                        layout
                        transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 30,
                        }}
                    />
                ) : (
                    <motion.div

                        style={{
                            width: "50%",
                            height: "100%",
                            backgroundColor: pointColor,
                            borderRadius: "40px",
                        }}
                        layout
                        transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 30,
                        }}
                    />
                )}


            </motion.div>
            <label style={{color:"white" , fontSize:18 }}>{text}</label>

        </div>
    );
};

