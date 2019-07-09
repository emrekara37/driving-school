import React, { Component } from 'react';
import InputNumber from '../../../components/uielements/InputNumber';

export default class extends Component {
  onChange = value => {};
  render() {
    return (
      <InputNumber min={1} max={10} defaultValue={3} onChange={this.onChange} />
    );
  }
}
