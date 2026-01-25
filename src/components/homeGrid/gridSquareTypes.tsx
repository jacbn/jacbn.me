import { ImageProps } from "../animatedImage";

export interface GridSquareProps extends React.HTMLProps<HTMLAnchorElement> {
  title: string;
  description: string;
  year?: string;
  lang?: string;
  colour?: string;
  imageProps?: ImageProps,
  link?: string;
}
