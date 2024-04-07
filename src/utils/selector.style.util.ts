export const monthStyles = (isMenuOpen: boolean) => {
  return {
    control: (provided: object, state: { isFocused: boolean }) => ({
      ...provided,
      outline: `${state.isFocused ? "2px" : "1px"} solid #7D7D7D`,
      borderRadius: `${isMenuOpen ? "20px 20px 0 0" : "20px"}`,
      width: `8rem`,
      boxShadow: "none",
      border: "none",
    }),
    container: (provided: object, state: { isFocused: boolean }) => ({
      ...provided,
      outline: `${state.isFocused ? "2px" : "1px"} solid #7D7D7D`,
      borderRadius: `${isMenuOpen ? "20px 20px 0 0" : "20px"}`,
      boxShadow: "none",
      border: "none",
    }),
    menu: (provided: object) => ({
      ...provided,
      outline: `2px solid #7D7D7D`,
      borderRadius: "none",
      marginTop: "2px",
      padding: "0",
    }),
    option: (provided: object, state: { isSelected: boolean }) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#18425D" : "white",
      color: state.isSelected ? "white" : "black",
      borderTop: "1px solid #ccc",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: `${state.isSelected ? "#18425D" : "#F3F5F6"}`,
      },
    }),
    indicatorsContainer: (provided: object) => ({
      ...provided,
      color: "blue",
    }),
    indicatorSeparator: (provided: object) => ({
      ...provided,
      display: "none",
    }),
  };
};

export const selectStyles = (
  isMenuOpen: boolean,
  width?: string,
  fontSize?: string
) => {
  return {
    control: (provided: object, state: { isFocused: boolean }) => ({
      ...provided,
      outline:
        state.isFocused && isMenuOpen
          ? "2px solid #18425D"
          : "1px solid #BDBFC1",
      borderRadius: `${isMenuOpen ? "5px 5px 0 0" : "5px"}`,
      boxShadow: "none",
      border: "none",
      "&:hover": {
        outline:
          state.isFocused && isMenuOpen
            ? "2px solid #18425D"
            : "1px solid #18425D",
      },
    }),
    container: (provided: object) => ({
      ...provided,
      boxShadow: "none",
      border: "none",
      width,
    }),
    singleValue: (provided: object) => ({
      ...provided,
      fontSize: fontSize ? fontSize : "1rem",
      lineHeight: "1.25rem",
      color: "#606062",
    }),
    placeholder: (provided: object) => ({
      ...provided,
      color: "#9CA3AF",
      fontSize: "1rem",
      lineHeight: "1.25rem",
    }),
    menu: (provided: object) => ({
      ...provided,
      outline: isMenuOpen ? `2px solid #18425D` : `1px solid #BDBFC1`,
      borderRadius: "none",
      marginTop: "0",
      padding: "0",
    }),
    option: (provided: object, state: { isSelected: boolean }) => ({
      ...provided,
      fontSize: fontSize ? fontSize : "1rem",
      lineHeight: "1.25rem",
      backgroundColor: state.isSelected ? "#18425D" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: `${state.isSelected ? "#18425D" : "#F3F5F6"}`,
      },
    }),
    indicatorsContainer: (provided: object) => ({
      ...provided,
      color: "blue",
    }),
    indicatorSeparator: (provided: object) => ({
      ...provided,
      display: "none",
    }),
  };
};