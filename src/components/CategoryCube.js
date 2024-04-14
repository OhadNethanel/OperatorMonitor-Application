export default ({ name, style = {}, textStyle = {}, counter = 0, counterStyle = {}, }) => (
  <label
    style={{
      margin: 1,
      fontFamily: "arial",
      flex: 1,
      height: 100,
      maxWidth: 200,
      minWidth: 5,
      fontSize: 19,
      borderStyle: "solid",
      borderWidth: "1px",
      backgroundColor: "black",
      // color: "#757AEE",
      color: "rgb(0,180,200)",
      borderColor: "#4C52E7",
      // backgroundColor: "lightgrey",
      fontWeight: "bold",
      wordBreak: "break-word",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      // textShadow: "blue 5px 0 50px,pink 5px 0px 100px",
      ...style
    }}
  >
    <label style={{
      // boxShadow: "0px 50px 0px blue",
      textShadow: "blue 5px 0 50px,pink 5px 0px 150px",
      ...textStyle
    }}>

      {name}
    </label>

    {counter > 0 && <label style={{
      // backgroundColor: "red",
      // borderRadius: 100,
      // height: 35,
      // width: 35,
      // boxShadow: "0px 50px 0px blue",
      // textShadow: "blue 5px 0 50px,pink 5px 0px 150px",
      textShadow: `2px 1px 2px black,2px 2px 2px black,2px 1px 2px black,2px 2px 2px black,0px -1px 2px black,-1px 1px 2px black,1px 1px 20px black,-10px -1px 50px black`,

      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      // position:"relative",
      // marginRight: 140,
      // marginBottom: 60,
      fontFamily:"Tahoma",
      fontWeight:"normal",
      // marginRight: -140,
      marginLeft: '4.8%',
      marginBottom: 69,
      border:1,
      borderColor:"black",
    
      

      // backdropFilter: "blur(7.5px)", WebkitBackdropFilter: "blur(7.5px)", backgroundColor: "rgba(255,0,0,0.8)",
      // borderRadius: 10,
      // boxShadow: `0px 0px 50px rgba(15,15,164,0.8)`,

      ...counterStyle
    }}>



      {counter}
    </label>}
  </label>
);
