'use client'

import dynamic from 'next/dynamic'

const DynamicBabylonScene = dynamic(() => import('./components/BabylonScene'), {
  ssr: false,
})

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <DynamicBabylonScene />
    </main>
  )
}
