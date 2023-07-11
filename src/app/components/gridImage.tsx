import styles from '../page.module.css'

export interface GridImageProps {
	path: string;
	alt: string;
}

export default function GridImage({path, alt} : GridImageProps) {
	return (
		<img
			className={styles.gridImage}
			src={path}
			alt={alt}
		/>
	)
}