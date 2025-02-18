import * as React from 'react'

function MinimizeMenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill='none' height={20} width={20} {...props}>
      <path
        d='M14 5.26v9a.75.75 0 01-.75.75H11v3.75a.75.75 0 01-1.28.53l-9-9a.749.749 0 010-1.06l9-9A.75.75 0 0111 .76v3.75h2.25a.75.75 0 01.75.75zm2.25-.75a.75.75 0 00-.75.75v9a.75.75 0 101.5 0v-9a.75.75 0 00-.75-.75zm3 0a.75.75 0 00-.75.75v9a.75.75 0 101.5 0v-9a.75.75 0 00-.75-.75z'
        fill='#b3b3b3'
      />
    </svg>
  )
}

export default MinimizeMenuIcon
