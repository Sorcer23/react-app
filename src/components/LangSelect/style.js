const styles = {
  container: () => ({
    // none of react-select's styles are passed to <Control />
    width: 100
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
    background: "#303353",
    boxShadow: "none",
    borderColor: "#fff",
    "&:hover": {
      borderColor: "#fff"
    }
  }),
  singleValue: () => ({
    color: "#fff",
    fontSize: "12px"
  }),
  menuList: base => ({
    ...base,
    "&:hover": {
      color: "#68385b"
    }
  }),
  option: (base, state) => {
    const background = state.isFocused ? "#000" : "#000000";
    /* some stuff */
    return {
      ...base,
      boxShadow: "none", // <-- this is why it seems like you can't set the border color.
      borderWidth: 1,
      background: "#fff",
      color: "#34375a",

      // Remove default hover style unless you need it
      "&:active": {
        color: "#68385b"
      },
      "&:hover": {},
      "&:focus": {
        background
      }
    };
  },
  indicatorsContainer: base => ({
    ...base,
    height: 32,
    minHeight: 32
  }),
  indicatorSeparator: base => ({
    ...base,
    display: "none"
  })
};

export default styles;
