import { promises as fs } from 'node:fs'
import path from 'node:path'
import { createApp, eventHandler, toNodeListener } from 'h3'

const app = createApp()

const CACHE_FILE = path.resolve('./shows-cache.json')
const TTL = 1000 * 60 * 60 * 24 // 24 hours

async function loadCache() {
  try {
    const raw = await fs.readFile(CACHE_FILE, 'utf8')
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp < TTL) {
      return data
    }
  }
  catch {}
  return null
}

async function saveCache(data: any) {
  await fs.writeFile(CACHE_FILE, JSON.stringify({ data, timestamp: Date.now() }))
}

app.use(
  '/api/shows',
  eventHandler(async () => {
    const data = await loadCache()
    if (data) {
      return data
    }

    let page = 0
    const all: any[] = []

    try {
      let response
      do {
        response = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
        if (response.status !== 404) {
          if (!response.ok) {
            throw new Error(`TVMaze API error: ${response.status}`)
          }
          const data = await response.json()
          if (data.length > 0) {
            all.push(...data)
            page++
          }
        }
      } while (response.status !== 404)
    }
    catch (error: unknown) {
      console.error(error)
      throw new Error('Failed to fetch shows from TVMaze API')
    }

    const genreMap: Record<string, any[]> = {}

    for (const show of all) {
      if (!Array.isArray(show.genres)) {
        continue
      }
      for (const genre of show.genres) {
        if (!genreMap[genre]) {
          genreMap[genre] = []
        }
        genreMap[genre].push(show)
      }
    }

    for (const genre in genreMap) {
      genreMap[genre].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    }

    await saveCache(genreMap)
    return genreMap
  }),
)

export default toNodeListener(app)
