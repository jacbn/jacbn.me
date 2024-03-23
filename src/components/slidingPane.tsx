import React from 'react';
import { Component } from "react";

export default class SlidingPane extends Component<{coverImage : string, coverTitle : string, description : string, flip : boolean}, {isFloatingLeft : boolean, isFlipped: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFloatingLeft: !props.flip,
      isFlipped: props.flip,
    };
  }

  togglePane() {
    this.setState({isFloatingLeft: !this.state.isFloatingLeft});
  }

  render() {
    // floatingLeft XOR flipped = image on left
    const imageContainerFloat = this.state.isFloatingLeft ? "slidingPaneImageContainerLeft" : "slidingPaneImageContainerRight";
    const title = (
      <div className={`slidingPaneTitle ${this.state.isFlipped ? '' : "slidingPaneRight"}`}>
        <h1>{this.props.coverTitle}</h1>
      </div>
    );
    const description = (
      <div className={`slidingPaneDescription ${this.state.isFlipped ? "slidingPaneRight" : ''}`}>
        <p>{this.props.description}</p>
      </div>
    );
    return (
      <div className="slidingPane" onClick={() => this.togglePane()}>
        <div className={`slidingPaneImageContainer ${imageContainerFloat}`}>
            <img src={this.props.coverImage} />
        </div>
        {this.state.isFlipped ? <> {title}{description} </> : <> {description}{title} </>}
      </div>
    );
  }
}