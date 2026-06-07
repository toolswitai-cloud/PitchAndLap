import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey ||
        supabaseUrl === 'your_supabase_url' ||
        supabaseUrl.includes('placeholder')) {
      console.warn('Supabase not configured - database features disabled')
      return null
    }

    try {
      supabaseInstance = createClient(supabaseUrl, supabaseKey)
    } catch (e) {
      console.warn('Failed to initialize Supabase client')
      return null
    }
  }
  return supabaseInstance
}

export async function addSubscriber(
  email: string,
  name?: string,
  sportInterest?: string
) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log('Mock: Would subscribe', email, name, sportInterest)
    return { data: [{ email }], error: null }
  }

  const { data, error } = await supabase
    .from('subscribers')
    .upsert(
      {
        email,
        name: name || null,
        sport_interest: sportInterest || null,
        is_active: true,
      },
      { onConflict: 'email' }
    )
    .select()

  if (error) throw error
  return data
}

export async function hasVoted(pollId: string, voterHash: string): Promise<boolean> {
  const supabase = getSupabaseClient()
  if (!supabase) return false

  const { data, error } = await supabase
    .from('poll_votes')
    .select('id')
    .eq('poll_id', pollId)
    .eq('voter_hash', voterHash)
    .single()

  return !!data
}

export async function recordVote(pollId: string, optionId: string, voterHash: string) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log('Mock: Would record vote', pollId, optionId)
    return
  }

  const { error: voteError } = await supabase
    .from('poll_votes')
    .insert({ poll_id: pollId, option_id: optionId, voter_hash: voterHash })

  if (voteError) throw voteError
}

export async function getPolls() {
  const supabase = getSupabaseClient()
  if (!supabase) {
    // Return mock polls when database not available
    return [
      {
        id: 'poll-1',
        question: 'Who wins the 2026 F1 World Championship?',
        sport: 'f1',
        options: [
          { id: 'verstappen', text: 'Max Verstappen', votes: 3420 },
          { id: 'hamilton', text: 'Lewis Hamilton', votes: 2150 },
          { id: 'norris', text: 'Lando Norris', votes: 1890 }
        ],
        total_votes: 7460,
        ends_at: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'poll-2',
        question: 'Best Test captain of the decade?',
        sport: 'cricket',
        options: [
          { id: 'rohit', text: 'Rohit Sharma', votes: 2800 },
          { id: 'cummins', text: 'Pat Cummins', votes: 1950 },
          { id: 'stokes', text: 'Ben Stokes', votes: 2200 }
        ],
        total_votes: 6950,
        ends_at: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }

  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .gt('ends_at', new Date().toISOString())
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updatePollVotes(pollId: string, optionId: string) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log('Mock: Would update poll votes', pollId, optionId)
    return { options: [], totalVotes: 0 }
  }

  const { data: poll, error: fetchError } = await supabase
    .from('polls')
    .select('options, total_votes')
    .eq('id', pollId)
    .single()

  if (fetchError) throw fetchError

  const options = typeof poll.options === 'string'
    ? JSON.parse(poll.options)
    : poll.options

  const updatedOptions = options.map((opt: any) =>
    opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
  )

  const { error: updateError } = await supabase
    .from('polls')
    .update({
      options: updatedOptions,
      total_votes: poll.total_votes + 1,
    })
    .eq('id', pollId)

  if (updateError) throw updateError

  return { options: updatedOptions, totalVotes: poll.total_votes + 1 }
}

export async function incrementArticleViews(articleSlug: string) {
  const supabase = getSupabaseClient()
  if (!supabase) return

  const { data: existing } = await supabase
    .from('article_views')
    .select('views')
    .eq('article_slug', articleSlug)
    .single()

  if (existing) {
    await supabase
      .from('article_views')
      .update({ views: existing.views + 1, last_viewed: new Date().toISOString() })
      .eq('article_slug', articleSlug)
  } else {
    await supabase
      .from('article_views')
      .insert({ article_slug: articleSlug, views: 1 })
  }
}

export async function getArticleViews(articleSlug: string): Promise<number> {
  const supabase = getSupabaseClient()
  if (!supabase) return 0

  const { data } = await supabase
    .from('article_views')
    .select('views')
    .eq('article_slug', articleSlug)
    .single()

  return data?.views || 0
}