const styles = {
  container: () => ({
    // none of react-select's styles are passed to <Control />
    width: 120,
    minWidth: "80px"
  }),
  control: base => ({
    ...base,
    height: 32,
    minHeight: 32,
    fontSize: 16,
    borderRadius: 0,
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    background: "none",
    boxShadow: "none",
    border: "none",
    color: "#68385b"
  }),
  input: () => ({
    position: "absolute",
    opacity: "0"
  }),
  menu: base => ({
    ...base,
    left: "0",
    borderWidth: 0,
    borderRadius: 0
  }),
  singleValue: () => ({
    color: "#68385b",
    fontSize: "14px"
  }),
  menuList: base => ({
    ...base,
    "&:hover": {
      color: "#68385b"
    }
  }),
  option: (base, props) => {
    return {
      ...base,
      boxShadow: "none", // <-- this is why it seems like you can't set the border color.
      borderWidth: 0,
      background: "#fff",
      color: "#34375a",
      cursor: "pointer"
    };
  },
  indicatorsContainer: base => ({
    display: "none"
  }),
  indicatorSeparator: base => ({
    ...base,
    display: "none"
  }),
  group: base => ({
    ...base,
    paddingBottom: 0,
    paddingTop: 0,
    "&:not(:last-child)": {
      borderBottom: "1px solid #34375a"
    }
  })
};

export default styles;
