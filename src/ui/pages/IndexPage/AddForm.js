/* @flow */
import React, { Component } from 'react';
import Radium from 'radium';

class AddForm extends Component {
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
      <form onSubmit={this._onSubmit} style={Styles.Root}>
        <textarea
          value={this.state.content}
          onChange={this._onContentChange}
          style={Styles.Textarea}
        />
        <div><button>Add</button></div>
      </form>
    );
  }
}

export default Radium(AddForm);

const Styles = {
  Root: {
    marginBottom: 60,
  },
  Textarea: {
    border: 0,
    boxSizing: 'border-box',
    minHeight: 80,
    width: 360,
  },
};
