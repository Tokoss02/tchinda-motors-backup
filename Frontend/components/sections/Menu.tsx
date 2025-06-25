import Link from "next/link"
import { useRouter } from "next/router"

export default function Menu() {
	const router = useRouter()

	return (
		<>

			<ul className="sub-menu">
				<Link href="/" className={router.pathname == "/" ? "active" : ""}>Home </Link>
			</ul>
		</>
	)
}
