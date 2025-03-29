// lib/api/sendHailingSignal.ts

import { HailingPayload } from "../../types/Hailing"


  
  export async function sendHailingSignal(payload: HailingPayload) {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  
    if (!res.ok) {
      const { error } = await res.json()
      throw new Error(error || 'Failed to send beacon.')
    }
  
    return await res.json()
  }
  