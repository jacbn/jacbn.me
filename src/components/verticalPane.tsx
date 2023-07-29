import styles from "@/styles/projects.module.css"
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
      <div className={styles.verticalPane} onClick={() => this.togglePane()}>
        <div className={`${styles.verticalPaneTop} ${this.state.isActive ? styles.verticalPaneTopHide : ''}`}>
          <div className={styles.verticalPaneImageContainer}>
            <img src={this.props.coverImage} />
          </div>
          <div className={styles.verticalPaneTitle}>
            <h2>{this.props.coverTitle}</h2>
          </div>
        </div>
        <div className={styles.verticalPaneDescription}>
          {this.props.description}
        </div>
      </div>
    );
  }
}