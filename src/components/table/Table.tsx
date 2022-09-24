type Props = {
  children: JSX.Element,
}

export default function Table({children}: Props) {
	return <table cellSpacing="0">
			{children}
		</table>
}