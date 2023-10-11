import Link from 'next/link'
import styles from './styles.module.css'

export default function Header() {
  return <div className={styles.header}>Header
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/profile">Profile</Link></li>
      <li><Link href="/users">User</Link></li>
    </ul>
  </div>
}