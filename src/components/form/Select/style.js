const styles = {
  valueContainer: (base, state) => {
    return {
      paddingLeft: 0,
      display: "flex",
      flexDirection: state.isRtl ? "row-reverse" : "row"
    };
  },
  singleValue: () => ({
    paddingLeft: 0
  }),
  placeholder: () => ({
    marginLeft: 0
  }),
  indicatorsContainer: () => ({
    width: 30,
    height: 31
  }),
  option: (base, state) => ({
    color: "#4a4a4a",
    padding: "3px 0px",
    margin: "0 15px",
    minHeight: "38px",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    // '&:hover': {
    //   color: 'blue',
    // },
    "&:not(:last-child)": {
      borderBottom: "2px solid #fbfbf9"
    }
  }),

  control: (base, state) => {
    return {
      ...base,
      height: 31,
      minHeight: 31,
      borderTop: 0,
      borderLeft: 0,
      borderRadius: 0,
      borderRight: 0,
      boxShadow: "none",
      fontWeight: "600",
      color: "#33375b",
      flexWrap: "nowrap",
      cursor: state.selectProps.isSearchable ? "text" : "pointer",

      borderColor: state.isFocused ? "#68385b" : "#eeeeee",
      "&:hover": { borderColor: "#68385b" }
    };
  }
};

export default styles;
