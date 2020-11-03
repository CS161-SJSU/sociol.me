import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

const FooterNav = ({ className, ...props }) => {
  const classes = classNames('footer-nav', className)

  return (
    <nav {...props} className={classes}>
      <ul className="list-reset">
        <li>
          <Link href="#0">Contact</Link>
        </li>
        <li>
          <Link href="#0">About us</Link>
        </li>
        <li>
          <Link href="#0">FAQ's</Link>
        </li>
        <li>
          <Link href="#0">Support</Link>
        </li>
      </ul>
    </nav>
  )
}

export default FooterNav
