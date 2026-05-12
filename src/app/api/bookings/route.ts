import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { client_name, client_phone, service, start_time, end_time, price, notes } = body

    // Validate required fields
    if (!client_name || !service || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Missing required fields: client_name, service, start_time, end_time' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase.from('bookings').insert({
      user_id: userId,
      client_name,
      client_phone: client_phone || null,
      service,
      start_time,
      end_time,
      price: price || null,
      notes: notes || null,
      status: 'confirmed',
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
