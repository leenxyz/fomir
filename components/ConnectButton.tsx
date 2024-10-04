'use client'

import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'

export function ConnectButton() {
  const { open, close } = useAppKit()
  const { disconnect } = useDisconnect()
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  console.log('======address:', address)

  // if (isConnecting) return <div>Connecting…</div>
  if (isConnected) {
    return (
      <div>
        <div>{address}</div>
        <button
          onClick={() => {
            disconnect()
          }}
        >
          disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => {
        open()
      }}
    >
      Connect
    </button>
  )
}
