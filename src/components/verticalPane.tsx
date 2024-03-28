import React from 'react';
import { Component } from "react";

export default class VerticalPane extends Component<{coverImage : string, coverTitle : string, description : React.JSX.Element}, {isActive: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  togglePane() {
    this.setState({isActive: !this.state.isActive});
  }

  render() {
    return (
      <div className={`verticalPane ${this.state.isActive ? "verticalPaneActive" : ''}`} onClick={() => this.togglePane()}>
        <div className={`verticalPaneTop ${this.state.isActive ? "verticalPaneTopHide" : ''}`}>
          <div className="verticalPaneImageContainer">
            <img src={this.props.coverImage} />
          </div>
          <div className="verticalPaneTitle">
            <h2>{this.props.coverTitle}</h2>
          </div>
        </div>
        <div className={`verticalPaneDescription ${this.state.isActive ? '' : "verticalPaneDescriptionHide"}`}>
          {this.props.description}
        </div>
      </div>
    );
  }
}