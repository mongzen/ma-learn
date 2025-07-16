import config from '@/payload.config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config })

    // Check database connection
    const db = payload.db
    if (db?.connection?.db) {
      await db.connection.db.admin().ping()
    }

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        platform: 'MaLearn E-Learning Platform',
        version: process.env.npm_package_version || '1.0.0',
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        database: 'disconnected',
      },
      { status: 503 },
    )
  }
}
