import React, { Component } from "react";
export class TextComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.triggerNextStep();

};

  render() {
    const { question } = this.props;

    return (
      <div>
        {question}
      </div>
    );
  }
}
