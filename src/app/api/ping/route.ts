// app/api/ping/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  console.log('Ping recibido, el dino sigue vivo 🦖')
  return NextResponse.json({ status: 'ok' })
}
