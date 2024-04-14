// export default ({ text, value }) => {
//   return (
//     <div style={{display:"flex", alignItems:"center", gap:5}}>
//       <label>{text}:</label>
//       <input readOnly defaultValue={value}></input>
//     </div>
//   );
// };

export default ({ text, value, type="text", spanStyle={}, textStyle={}, }) => {
  return (
    <div
    style={{
      display: "flex",
      width: "100%",
      flex: 1,
    }}
  >
    <span
      style={{
        whiteSpace: "nowrap",
        textAlign: "center",
        padding: "8px 12px",
        fontSize: "14px",
        lineHeight: "25px",
        borderRadius: "6px 0 0 6px",
        color: "#fbbb02",
        background: "#4c4848",
        border: `1px solid #CDD9ED`,
        width:180,
		fontSize:18,
		...spanStyle
      }}
    >
      {text}
    </span>
    <input
      value={value ? value : null}
      readOnly
    //   onChange={onChange}
      className="form-field"
      type={type}
    //   placeholder={placeHolder}
      style={{
		
        display: "block",
        width: "100%",
        padding: "8px 16px",
        lineHeight: "25px",
        fontSize: 18,
        fontWeight: "500",
        fontFamily: "inherit",
        borderRadius: "0 6px 6px 0",
        WebkitAppearance: "none",
        color: "black",
        border: `1px solid #CDD9ED`,
        background: "#fff",
        transition: "border .3s ease",
        // backgroundColor:"red"
		...textStyle
      }}
    />
    </div>
  );
};
