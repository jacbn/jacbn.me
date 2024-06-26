import React from "react";

class RangeSlider extends React.Component<object, {min: string, max: string, value: string, id: string}> {
  constructor(props : any) {
    super(props);
    this.state = {
      min: props.min,
      max: props.max,
      value: props.value,
      id: props.id
    };
  }
  render() {
    return (React.createElement(
        "input", 
        { 
          className: "rangeSlider",
          type: "range", 
          id: this.state.id,
          min: this.state.min, 
          max: this.state.max, 
          value: this.state.value, 
          onChange: (e) => this.setState({ value: e.target.value })
        }
      )
      // React.createElement("span", { className: "rangeSlider__value" }, this.state.value)
    );
  }
}

export default RangeSlider;