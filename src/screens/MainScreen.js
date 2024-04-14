import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import getCurrentTimeStamp from "../utils/getCurrentTimeStamp";
import getCategories from "../utils/getCategories";
import CategoryCube from "../components/CategoryCube";
import SherutCube from "../components/SherutCube";
import { checkHeartbeat, getFiles, getFilesRefresh, getHistory, getTutorial, removeFile } from "../api/server";
import notification from "../utils/notification";
import SherutInfoModal from "../components/Modals/SherutInfoModal";
import HistoryModal from "../components/Modals/HistoryModal";
import DisplayCategoriesModal from "../components/Modals/DisplayCategoriesModal";
import LogModal from "../components/Modals/LogModal";
import getParameterCaseInsensitive from "../utils/getParameterCaseInsensitive";
import getStatusColor from "../utils/getStatusColor";

export default () => {
  const [categoriesInput, setCategoriesInput] = useState([]);

  const [clock, setClock] = useState(getCurrentTimeStamp());

  const [showSideBar, setShowSideBar] = useState(false);

  const [heartBeat, setHeartBeat] = useState(false); //to know weather backend is on \ off

  const [data, setData] = useState(false);
  const [categories, setCategories] = useState(false);
  const [localStorageCategories, setLocalStorageCategories] = useState({})


  const [tutorial, setTutorial] = useState(false);

  const [modalData, setModalData] = useState(false); //for sched info
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  const [historyData, setHistoryData] = useState(false);
  const [historyCategories, setHistoryCategories] = useState(false);



  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === '`') {
        setModalData(false);
        setTutorial(false);
        setShowHistoryModal(false);
        setShowCategoriesModal(false);
        setShowLogModal(false);
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const HandleCheckBackendHeartBeat = () => {
    checkHeartbeat().then(setHeartBeat).catch(setHeartBeat)
  }

  const HandleHistoryClick = () => {
    setShowSideBar((prevState) => !prevState)
    getHistory()
      .then((res) => {
        setHistoryData(res);
        setHistoryCategories(getCategories(res));
        setShowHistoryModal(true);
      })
      .catch((err) => {
        notification(
          "Error",
          `Cannot Get History, ${err?.response?.data || "Please try again."
          }`,
          "danger"
        );
      });
  };

  const HandleSherutClick = (data) => {
    setModalData(data);
    getTutorial(data.FileName)
      .then(setTutorial)
      .catch((err) => {
        notification(
          "Information",
          `Cannot Get Tutorial, ${err?.response?.data || "Please try again."
          }`,
          "info"
        );
      });
  };

  const refreshData = () => {
    getFiles()
      .then((res) => {
        let result = res;
        if (categoriesInput[0]) {
          result = res.filter((item) =>
            categoriesInput.includes(item.Category)
          );
        }
        setData(result);
        setCategories(getCategories(result));
      })
      .catch(() => { });
  };

  const refreshDataInBackend = () => {
    getFilesRefresh()
      .then((res) => {
        let result = res;
        if (categoriesInput[0]) {
          result = res.filter((item) =>
            categoriesInput.includes(item.Category)
          );
        }
        setData(result);
        setCategories(getCategories(result));
      })
      .catch(() => { });
  };

  useEffect(() => {
    JSON.parse(localStorage.getItem("categories")) || localStorage.setItem("categories", "{}")
    setLocalStorageCategories(JSON.parse(localStorage.getItem("categories")))

    HandleCheckBackendHeartBeat();
    refreshData();

    const clockTimer = setInterval(() => {
      setClock(getCurrentTimeStamp());
    }, 1000);

    const dataTimer = setInterval(() => {
      refreshData();
    }, 10000);

    const heartBeatTimer = setInterval(() => {
      HandleCheckBackendHeartBeat();
    }, 10000);

    return () => {
      clearInterval(dataTimer);
      clearInterval(clockTimer);
      clearInterval(heartBeatTimer);
    };
  }, []);

  useEffect(() => {
    if (!showCategoriesModal) //when closed
      setLocalStorageCategories(JSON.parse(localStorage.getItem("categories")))

  }, [showCategoriesModal])


  // RightCubeContext
  // State variables
  const [context, setContext] = useState(false);
  const [contextSherutInfo, setContextSherutInfo] = useState({});
  const [xyPosition, setxyPosition] = useState({ x: 0, y: 0 });

  // Event handler for showing the context menu
  const showNav = (event) => {
    event.preventDefault();
    setContext(false);
    setxyPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setContextSherutInfo({ name: getParameterCaseInsensitive(event.Sherut, "name"), fileName: getParameterCaseInsensitive(event.Sherut, "filename"), color:getParameterCaseInsensitive(event.Sherut, "color") ? getParameterCaseInsensitive(data, "color") : getStatusColor(+getParameterCaseInsensitive(event.Sherut, "statuscode")), date:`${getParameterCaseInsensitive(event.Sherut, "curdate")} - ${getParameterCaseInsensitive(event.Sherut, "curtime")}`, data: event.Sherut })
    setContext(true);
  };

  // Event handler for hiding the context menu
  const hideContext = (event) => {
    setContext(false);
    setContextSherutInfo({});
  };

  // END RightCubeContext

  return (
    <motion.div
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontFamily: "arial",
        // backgroundImage: "linear-gradient(to bottom, black, black, #252222)",
        backgroundImage: "linear-gradient(to bottom, black, black, rgb(50,0,50))",


      }}
      onClick={hideContext}
    >

      <>
        <style>
          {`
          .contextContainer {
            z-index: 1;
            width: 100%;
            background: #5f5151;
          }
          .rightClick {
            z-index: 12;
            position: fixed;
            background: rgb(250, 250, 250);
          }
          .menuElement {
            color: #222222;
            cursor: pointer;
            padding: 17px 36px;
          }
          .menuElement:hover {
            color: #fff;
            background: #3f4847;
          }
        `}
        </style>
        {context && (
          <div
            style={{ top: xyPosition.y, left: xyPosition.x }}
            className="rightClick"
          >
            <div className="menuElement" onClick={() => {
              removeFile(contextSherutInfo.fileName)
                .then(() => {
                })
                .catch((err) => {
                  notification(
                    "Error",
                    `Cannot Remove File, ${err?.response?.data || "Please try again."
                    }`,
                    "danger"
                  );
                });
            }}>
              ❌ Delete Alert
            </div>
            <div className="menuElement" onClick={() => {
              setData(false);
              window.scrollTo(0, 0)
              refreshDataInBackend()
            }}>
              🥤 Refresh Monitor
            </div>
            <div style={{ padding: `17px 36px` }}  >
              _____________________
            </div>
            <div className="menuElement"  onClick={(e)=>HandleSherutClick(contextSherutInfo.data)} >
              <div style={{display:"flex", flexDirection:"column"}}>

            <label style={{fontWeight:"bolder",backgroundColor:contextSherutInfo.color, margin:8, padding:8, borderRadius:10}}>
                {contextSherutInfo.name}
              </label>
   
              <label style={{fontWeight:"bolder", margin:8, padding:8, borderRadius:20}}>
                {contextSherutInfo.date}
              </label>
              </div>
            </div>
          </div>
        )}
      </>

      <SherutInfoModal
        modalData={modalData}
        tutorial={tutorial}
        onClose={() => {
          setModalData(false);
          setTutorial(false);
        }}
        onDelete={() => {
          setModalData(false);
          setTutorial(false);
        }}
      />

      <DisplayCategoriesModal isOpen={showCategoriesModal} onClose={() => { setShowCategoriesModal(false) }} categories={categories[0] ? categories : false} />

      <HistoryModal
        isOpen={showHistoryModal}
        data={historyData}
        categories={historyCategories}
        onClose={() => {
          setShowHistoryModal(false);
          setHistoryData(false);
          setHistoryCategories(false);
        }}
      />

      <LogModal isOpen={showLogModal} onClose={() => { setShowLogModal(false) }} />
      {/* SIDE BAR DIV */}

      {showSideBar && <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex", position: "fixed", zIndex: 999, height: "100%", width: '15%', backdropFilter: "blur(7.5px)", WebkitBackdropFilter: "blur(7.5px)", backgroundColor: "rgba(255,255,255,0.7)", flexDirection: "column"
        }}>

        <motion.button
          whileHover={{
            scale: 1.1, boxShadow: "0px 0px 20px red",
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            margin: 10,
            borderRadius: 5,
            cursor: "pointer",
            width: 85,
            height: 35,
            color: "white",
            backgroundImage: "linear-gradient(to right, black, #252222)",
          }}
          onClick={() => {
            // HandleHistoryClick();
            setShowSideBar((prevState) => !prevState)
          }}
        >
          ✖
        </motion.button>

        <div style={{ width: '100%', marginTop: 50, display: "flex", gap: 10, flexDirection: "column", alignItems: "center" }}>


          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: 22,
              margin: 10,
              borderRadius: 5,
              cursor: "pointer",
              // width: 250,
              height: 60,
              boxShadow: "0px 0px 20px darkblue",
              color: "white",
              backgroundImage: "linear-gradient(to right, black, #252222)",
            }}
            onClick={() => {
              setShowSideBar((prevState) => !prevState)
              setData(false);
              window.scrollTo(0, 0)
              refreshDataInBackend()
            }}
          >
            🥤 Refresh Monitor
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: 22,
              margin: 10,
              borderRadius: 5,
              cursor: "pointer",
              // width: 200,
              height: 60,
              boxShadow: "0px 0px 20px darkblue",
              color: "white",
              backgroundImage: "linear-gradient(to right, black, #252222)",
            }}
            onClick={() => {
              HandleHistoryClick();
            }}
          >
            📜 History
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: 22,
              margin: 10,
              borderRadius: 5,
              cursor: "pointer",
              // width: 250,
              height: 60,
              boxShadow: "0px 0px 20px darkblue",
              color: "white",
              backgroundImage: "linear-gradient(to right, black, #252222)",
            }}
            onClick={() => {
              setShowSideBar((prevState) => !prevState)

              setShowCategoriesModal(true)

            }}
          >
            📺 Display Categories
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: 22,
              margin: 10,
              borderRadius: 5,
              cursor: "pointer",
              // width: 250,
              height: 60,
              boxShadow: "0px 0px 20px darkblue",
              color: "white",
              backgroundImage: "linear-gradient(to right, black, #252222)",
            }}
            onClick={() => {
              setShowSideBar((prevState) => !prevState)
              setShowLogModal(true)

            }}
          >
            💡 Analyze Log
          </motion.button>

        </div>

      </motion.div>}

      {/* END SIDE BAR DIV */}

      <div style={{ overflow: "hidden", position: "fixed", width: '100%' }}>

        <div
          style={{
            minHeight: 100,
            backgroundColor: "black",
            display: "flex",
            color: "white",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "absolute", display: "flex", }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                margin: 10,
                borderRadius: 5,
                cursor: "pointer",
                width: 80,
                height: 35,
                boxShadow: "0px 0px 20px darkblue",
                color: "white",
                backgroundImage: "linear-gradient(to right, black, #252222)",
              }}
              onClick={() => {
                setShowSideBar((prevState) => !prevState)
              }}
            >
              📃

            </motion.button>

          </div>
          <h1 style={{ position: "absolute", top: 40, left: 10, textShadow: "rgba(0,0,255,0.8) 0 0 20px" }}>{clock}</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0 auto",
              flexWrap: "wrap",
            }}
          >
            <label style={{
              position: "absolute",
              margin: 10,
              right: 0,
              fontWeight: "bold",
              fontSize: 16,
              // boxShadow: "0px 0px 10px green",
              color: `${heartBeat ? "rgb(0,200,0)" : "red"}`,
              textShadow: `0 0 5px ${heartBeat ? "rgb(0,150,0)" : "red"}`,
            }}>
              {/* Server Status: {heartBeat ? "👍" : "👎"} */}
              Server Status: {heartBeat ? "✔" : "✖"}
            </label>
            <label
              style={{
                fontWeight: "bold",
                fontSize: 34,
                // boxShadow: "0px 0px 50px darkblue",
                textShadow: "purple 1px 0 10px",



              }}
            >
              Operator Monitor 4
            </label>
            <label
              style={{
                margin: "0 auto",
                color: "#757AEE",
                fontSize: 12,
                textShadow: "darkblue 5px 0 10px",
              }}
            >
              Ohad Nethanel
            </label>
          </div>
        </div>

        <div style={{ backgroundColor: "white", height: 1 }} />

        <motion.div
          style={{
            minHeight: 100,
            display: "flex",
            backgroundColor: "black",
            justifyContent: "center"
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

              if (localStorageCategories[element] == false) return //dont render categories selected to be hidden


              const filteredArray = data ? data?.filter((e) => getParameterCaseInsensitive(e, 'category') == element).filter((e) => e.StatusCode != 0).sort((a, b) => b.StatusCode - a.StatusCode) : {}
              // filteredArray = filteredArray?.filter((e) => e.StatusCode != 0)
              // filteredArray = filteredArray?.sort((a, b) => b.StatusCode - a.StatusCode);

              const firstIndex = filteredArray[0]

              return <CategoryCube
                textStyle={{

                  textShadow: `1px 1px 20px ${getStatusColor(firstIndex?.StatusCode) || 'black'}, 0 0 1em ${getStatusColor(firstIndex?.StatusCode) || 'black'}, 0 0 1em ${getStatusColor(firstIndex?.StatusCode) || 'rgb(0,180,200)'}`,
                  color: getStatusColor(firstIndex?.StatusCode) ? 'white' : 'rgb(0,180,200)'
                  // color:getStatusColor(firstIndex?.StatusCode) || 'rgb(0,180,200)'
                }}
                style={{
                  backgroundImage: `linear-gradient(to right top, black, black, black, black, ${getStatusColor(firstIndex?.StatusCode) || 'black'})`,
                }} key={`cat_${index}`}
                counter={filteredArray.length || 0}
                name={element}

              // counterStyle={{ 
              //   backgroundImage: `linear-gradient(to right top, ${getStatusColor(firstIndex?.StatusCode) || 'black'})`,

              //   // backgroundColor: getStatusColor(firstIndex?.StatusCode)

              // }}
              // name={`${filteredArray.length ? `${element} (${filteredArray.length})` : element}`} 


              />;
            })}
        </motion.div>
        <div style={{ backgroundColor: "white", height: 1, }} />

      </div>
      {!data[0] && <div><h1 style={{ color: "white", marginTop: 210, }}>🔃 Fetching Data</h1></div>}
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          // alignSelf: "flex-start",
          alignSelf: "center",
          overflow: "auto",
          marginTop: 210,
        }}
      >

        {categories[0] &&
          data[0] &&
          categories.map((element, index) => {

            if (localStorageCategories[element] == false) return //dont render selected categories

            const filteredDataByCategory = data?.filter(
              (item) => item.Category === element
            );

            const sortedData = filteredDataByCategory.sort(
              (a, b) => b.StatusCode - a.StatusCode
            );
            return (
              <div key={index} style={{ display: "flex", flexDirection: "column", width: '100%', }}>
                {sortedData.map((job, jobIndex) => {
                  return (
                    <div onContextMenu={(e) => {
                      e.Sherut = job
                      showNav(e)
                    }} onClick={hideContext}>
                      <SherutCube key={`cube_${index}_${jobIndex}`} onSherutClick={HandleSherutClick} data={job} />
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>



    </motion.div>
  );
};
