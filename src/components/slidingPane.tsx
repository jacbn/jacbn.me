import React from 'react';
import styles from "@/styles/projects.module.css";
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
    const imageContainerFloat = this.state.isFloatingLeft ? styles.slidingPaneImageContainerLeft : styles.slidingPaneImageContainerRight;
    const title = (
      <div className={`${styles.slidingPaneTitle} ${this.state.isFlipped ? '' : styles.slidingPaneRight}`}>
        <h1>{this.props.coverTitle}</h1>
      </div>
    );
    const description = (
      <div className={`${styles.slidingPaneDescription} ${this.state.isFlipped ? styles.slidingPaneRight : ''}`}>
        <p>{this.props.description}</p>
      </div>
    );
    return (
      <div className={styles.slidingPane} onClick={() => this.togglePane()}>
        <div className={`${styles.slidingPaneImageContainer} ${imageContainerFloat}`}>
            <img src={this.props.coverImage} />
        </div>
        {this.state.isFlipped ? <> {title}{description} </> : <> {description}{title} </>}
      </div>
    );
  }
}