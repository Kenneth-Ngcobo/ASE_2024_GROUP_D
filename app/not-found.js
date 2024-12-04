import Link from 'next/link'

/**
 * NotFound component to display a 404 page for missing resources.
 *
 * @returns {JSX.Element} The rendered "Not Found" page.
 */
export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}