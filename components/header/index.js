import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import Link from 'next/link'
import styles from './styles.module.css'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useQueries } from '@/hooks/useQueries'
import Cookies from 'js-cookie'

export default function Header() {
  const { data } = useQueries({
    prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/user/me`,
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`
    }
  })

  console.log("data => ", data)
  return <div className={styles.header}>Header
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/profile">Profile</Link></li>
      <li><Link href="/users">User</Link></li>
      <li><Link href="/notes">Notes</Link></li>
      <li>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {data?.data?.name}
          </MenuButton>
          <MenuList>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu></li>
    </ul>
  </div>
}