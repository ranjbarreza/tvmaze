import { cleanup, render } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import GenresPreview from '@/components/GenresPreview.vue'

const props = {
  genres: {
    Drama: [
      {
        id: 1,
        name: 'Drama 1',
        language: 'English',
        genres: [
          'Drama',
          'Thriller',
        ],
        runtime: 60,
        premiered: '2013-06-24',
        ended: '2015-09-10',
        rating: {
          average: 6.5,
        },
        network: {
          name: 'CBS',
        },
        image: {
          medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
          original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
        },
        summary: '\u003Cp\u003E\u003Cb\u003EUnder the Dome\u003C/b\u003E is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town\'s inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.\u003C/p\u003E',
      },
      {
        id: 2,
        name: 'Drama 2',
        language: 'English',
        genres: [
          'Drama',
          'Science-Fiction',
        ],
        runtime: 60,
        premiered: '2013-06-24',
        ended: '2015-09-10',
        rating: {
          average: 7,
        },
        network: {
          name: 'CBS',
        },
        image: {
          medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
          original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
        },
        summary: '\u003Cp\u003E\u003Cb\u003EUnder the Dome\u003C/b\u003E is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town\'s inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.\u003C/p\u003E',
      },
    ],
    Comedy: [
      {
        id: 3,
        name: 'Comedy 1',
        language: 'English',
        genres: [
          'Comedy',
        ],
        runtime: 60,
        premiered: '2013-06-24',
        ended: '2015-09-10',
        rating: {
          average: 6.5,
        },
        network: {
          name: 'CBS',
        },
        image: {
          medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
          original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
        },
        summary: '\u003Cp\u003E\u003Cb\u003EUnder the Dome\u003C/b\u003E is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town\'s inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.\u003C/p\u003E',
      },
    ],
  },
}

describe('show details', () => {
  afterEach(() => {
    cleanup()
  })

  it('shows available genres', () => {
    const { getByText, queryByText } = render(GenresPreview, {
      props,
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    getByText('Top 10 Drama')
    getByText('Top 10 Comedy')
    expect(queryByText('Top 10 SciFi')).toBeNull()
  })

  it('shows shows from genres', () => {
    const { getByRole } = render(GenresPreview, {
      props,
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    getByRole('img', { name: 'Drama 1' })
    getByRole('img', { name: 'Drama 2' })
    getByRole('img', { name: 'Comedy 1' })
  })
})
