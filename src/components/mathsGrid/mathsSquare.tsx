import { Link } from 'react-router';
import React from 'react';

export default class MathsSquare extends React.Component<{href: string, title: string, image: {src: string, srcLight?: string, alt: string}}, { lightMode : boolean }> {
  constructor(props: any) {
    super(props);
    window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', this.onThemeChange.bind(this))
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', this.onThemeChange.bind(this))
    this.state = {
      lightMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    };
  }

  onThemeChange(e : MediaQueryListEvent) {
    this.setState({lightMode: e.matches});
  }
  
  render() {
    return (
      <>
        <Link className="mathsArtGridSquare" to={this.props.href}>
          <h2>{this.props.title}</h2> 
          <img src={(this.state.lightMode && this.props.image.srcLight) ? this.props.image.srcLight : this.props.image.src} alt={this.props.image.alt} />
        </Link>
      </>
    );
  }
}
