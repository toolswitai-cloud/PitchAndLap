import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { hasVoted, recordVote, updatePollVotes, getPolls } from '@/lib/supabase'

function getVoterHash(ip: string, userAgent: string): string {
  const data = `${ip}:${userAgent}`
  return createHash('sha256').update(data).digest('hex').substring(0, 32)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pollId, optionId } = body

    if (!pollId || !optionId) {
      return NextResponse.json(
        { error: 'Missing pollId or optionId' },
        { status: 400 }
      )
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const voterHash = getVoterHash(ip, userAgent)

    const alreadyVoted = await hasVoted(pollId, voterHash)

    if (alreadyVoted) {
      const polls = await getPolls()
      const currentPoll = polls?.find((p: any) => p.id === pollId)
      const options = typeof currentPoll?.options === 'string'
        ? JSON.parse(currentPoll.options)
        : currentPoll?.options || []

      return NextResponse.json({
        error: 'You have already voted on this poll.',
        currentResults: options,
        totalVotes: currentPoll?.total_votes || 0,
      })
    }

    await recordVote(pollId, optionId, voterHash)
    const { options, totalVotes } = await updatePollVotes(pollId, optionId)

    return NextResponse.json({
      success: true,
      results: options,
      totalVotes,
    })
  } catch (error: any) {
    console.error('Poll vote error:', error)
    return NextResponse.json(
      { error: 'Failed to record vote. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const polls = await getPolls()
    return NextResponse.json({ polls })
  } catch (error: any) {
    console.error('Get polls error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch polls' },
      { status: 500 }
    )
  }
}