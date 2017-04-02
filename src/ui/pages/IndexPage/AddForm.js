/* @flow */
import React, { Component } from 'react';

export default class AddForm extends Component {
  props: {
    onFormAdd: (content: string) => Promise<void>,
  };
  state = {
    content: '',
  };

  _onContentChange = e => {
    this.setState({ content: e.target.value });
  };

  _onSubmit = async e => {
    e.preventDefault();
    await this.props.onFormAdd(this.state.content);
  };

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <textarea value={this.state.content} onChange={this._onContentChange} />
        <button>Add</button>
      </form>
    );
  }
}
