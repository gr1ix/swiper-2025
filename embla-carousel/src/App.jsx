import {
  createElement, useState, useRef, useEffect,
} from 'react'
import './App.css'
import cn from 'clsx'
import {
  pages, page_to_component, page_to_title,
} from './pages'

import useEmblaCarousel from 'embla-carousel-react'

export default function App() {
  const initialPage = 0
  const [page, setPage] = useState(initialPage)
  const [embla, emblaApi] = useEmblaCarousel({
    loop: false,
    startIndex: initialPage,
  })

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', (o) => {
        const idx = o.selectedScrollSnap()
        setPage(idx)
      })
    }
  }, [emblaApi])

  const navigate = (page) => {
    const index = pages.indexOf(page)
    if (index === -1) return

    if (emblaApi) {
      emblaApi.scrollTo(index, false)
    }
  }

  return (
    <div className="wrapper">
      <div
        className="embla"
        ref={embla}
      >
        <div className="embla__container">
          {pages.map((pageId) => (
            <div className="embla__slide" key={pageId}>
            {createElement(page_to_component[pageId], { navigate }, null)}
            </div>
          ))}
        </div>
      </div>

      <nav className={cn({'justify-around': pages.length < 3})}>
        {pages.map((pageId, i) => (
          <button
            key={pageId}
            className={cn({ selected: page === i })}
            onClick={() => navigate(pageId)}
          >
            {page_to_title[pageId]}
          </button>
        ))}
      </nav>
    </div>
  )
}
