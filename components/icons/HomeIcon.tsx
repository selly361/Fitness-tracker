import * as React from 'react'

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill='none' height={19} width={18} {...props}>
      <path
        d='M18 8.593v8.667a1.5 1.5 0 01-1.5 1.5h-3.75a1.5 1.5 0 01-1.5-1.5v-3.75a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v3.75a1.5 1.5 0 01-1.5 1.5H1.5a1.5 1.5 0 01-1.5-1.5V8.593a1.5 1.5 0 01.485-1.105l7.5-7.076.01-.01a1.5 1.5 0 012.029.01l7.5 7.076A1.5 1.5 0 0118 8.593z'
        fill='#b3b3b3'
      />
    </svg>
  )
}

export default HomeIcon
