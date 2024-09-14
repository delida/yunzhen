import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ModalDorpdown from "react-native-modal-dropdown";
import { px2dp } from "../utils/px2dp";

function Dropdown({ style, options, defaultIndex, defaultValue, dropdownStyle, animated, textStyle, disabled, dropdownTextStyle, dropdownTextHighlightStyle, onSelect }) {
  return (
    <View style={style}>
      <ModalDorpdown
        options={options}
        defaultIndex={defaultIndex}
        defaultValue={defaultValue}
        dropdownStyle={dropdownStyle}
        animated={animated}
        textStyle={textStyle}
        disabled={disabled}
        onSelect={onSelect}
        dropdownTextStyle={dropdownTextStyle}
        dropdownTextHighlightStyle={dropdownTextHighlightStyle}
      />
    </View>
  );
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  defaultIndex: PropTypes.number,
  defaultValue: PropTypes.number,
  dropdownStyle: PropTypes.object,
  animated: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  textStyle: PropTypes.string,
  dropdownTextStyle: PropTypes.object,
  style: PropTypes.object,
  dropdownTextHighlightStyle: PropTypes.object,
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdownBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: px2dp(8),
  },
});
