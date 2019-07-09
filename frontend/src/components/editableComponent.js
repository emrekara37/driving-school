import React, { Component } from 'react';

export default class EditableComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.check = this.check.bind(this);
    this.edit = this.edit.bind(this);
    this.state = {
      value: this.props.value,
      editable: false,
    };
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
  }
  check() {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.props.itemKey, this.state.value);
    }
  }
  edit() {
    console.log("e");
    //this.setState({ editable: true });
  }

  render() {
    const { value } = this.state;
    return (
      <div className="isoNoteContent">
        <p className="isoNoteTextWrapper" onClick={this.edit}>
          {value}
        </p>
      </div>
    );
  }
}
