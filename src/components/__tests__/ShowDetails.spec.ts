import { cleanup, render } from '@testing-library/vue'
import { afterEach, describe, it, vi } from 'vitest'
import ShowDetails from '@/views/ShowDetails.vue'

describe('handle fetching show details', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('shows loading state', () => {
    vi.stubGlobal('fetch', () => new Promise(() => {}))

    const { getByTestId } = render(ShowDetails, { props: { id: '1' } })

    getByTestId('show-details-loading')
  })

  it('shows error state', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn(),
    }))

    const { findByText } = render(ShowDetails, { props: { id: '1' } })

    await findByText('Could not fetch show')
  })
})
