import { NextRequest, NextResponse } from 'next/server'
import { subscribeToBeehiiv } from '@/lib/beehiiv'
import { addSubscriber } from '@/lib/supabase'

// Simple in-memory rate limiting (reset every hour)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const hourMs = 60 * 60 * 1000
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + hourMs })
    return true
  }

  if (record.count >= 3) {
    return false
  }

  record.count++
  return true
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email, name, sportInterest } = body

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    try {
      await subscribeToBeehiiv(email, name, sportInterest)
    } catch (beehiivError: any) {
      // If Beehiiv fails but email might already exist, continue to Supabase
      console.error('Beehiiv error:', beehiivError.message)
    }

    try {
      await addSubscriber(email, name, sportInterest)
    } catch (subError: any) {
      // Ignore duplicate email errors
      if (!subError.message?.includes('duplicate')) {
        console.error('Supabase error:', subError.message)
      }
    }

    return NextResponse.json({
      success: true,
      message: "You're subscribed! Check your email for confirmation.",
    })
  } catch (error: any) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}