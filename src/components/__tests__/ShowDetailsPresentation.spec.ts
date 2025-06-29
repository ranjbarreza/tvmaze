import { cleanup, render } from '@testing-library/vue'
import { afterEach, describe, expect, it } from 'vitest'
import ShowDetailsPresentation from '@/components/ShowDetailsPresentation.vue'

const props = {
  show: {
    id: 1,
    name: 'Under the Dome',
    language: 'English',
    genres: [
      'Drama',
      'Science-Fiction',
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
    _embedded: {
      cast: [
        {
          person: {
            id: 1,
            url: 'https://www.tvmaze.com/people/1/mike-vogel',
            name: 'Mike Vogel',
            image: {
              medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg',
              original: 'https://static.tvmaze.com/uploads/images/original_untouched/0/1815.jpg',
            },
          },
        },
      ],
    },
  },
}

describe('show details', () => {
  afterEach(() => {
    cleanup()
  })

  it('shows show information', () => {
    const { getByRole } = render(ShowDetailsPresentation, { props })
    getByRole('heading', { name: props.show.name })
    expect(getByRole('img', { name: 'Under the Dome' })).toHaveProperty('src', props.show.image.original)
  })

  it('shows cast member', () => {
    const { getByText } = render(ShowDetailsPresentation, { props })
    getByText('Mike Vogel')
  })
})
