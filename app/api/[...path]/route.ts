import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// Set the base URL for the backend API from environment variables
const BACKEND_URL = process.env.API_BASE_URL

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, params, 'GET')
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, params, 'POST')
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, params, 'PUT')
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, params, 'PATCH')
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    return handleRequest(request, params, 'DELETE')
}

async function handleRequest(
    request: NextRequest,
    params: Promise<{ path: string[] }>,
    method: string
) {
    try {
        const { path } = await params
        const endpoint = path.join('/')
        const url = `${BACKEND_URL}/api/${endpoint}${request.nextUrl.search}`

        const headers: Record<string, string> = {}
        request.headers.forEach((value, key) => {
            // Exclude host header as it can cause issues when proxying
            if (key.toLowerCase() !== 'host') {
                headers[key] = value
            }
        })

        let body = null
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            body = await request.json().catch(() => null)
        }

        const response = await axios({
            method,
            url,
            data: body,
            headers,
            validateStatus: () => true, // Don't throw for 4xx or 5xx
        })

        return NextResponse.json(
            {
                data: response.data?.data || response.data,
                error: response.data?.error || null
            },
            { status: response.status }
        )
    } catch (error: any) {
        console.error('API Proxy Error:', error)
        return NextResponse.json(
            {
                data: null,
                error: error.message || 'Internal Server Error'
            },
            { status: 500 }
        )
    }
}
