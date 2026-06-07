export async function subscribeToBeehiiv(
  email: string,
  name?: string,
  sportInterest?: string
) {
  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'website',
        utm_medium: 'newsletter_form',
        custom_fields: sportInterest
          ? [{ name: 'sport_interest', value: sportInterest }]
          : [],
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Beehiiv subscription failed')
  }

  return response.json()
}