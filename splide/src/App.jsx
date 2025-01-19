import {
  createElement, useState, useRef,
} from 'react'
import './App.css'
import cn from 'clsx'
import {
  pages, page_to_component, page_to_title,
} from './pages'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export default function App() {
  const initialPage = 0
  const [page, setPage] = useState(initialPage)
  const splide = useRef(null)

  const navigate = (page) => {
    const index = pages.indexOf(page)
    if (index === -1) return

    if (splide.current) {
      splide.current.splide.go(index)
    }
  }

  return (
    <div className="wrapper">
      <Splide
        options={{
          gap: '32px',
          start: initialPage,
          arrows: false,
          pagination: false,
        }}
        onMoved={(_, o) => setPage(o)}
        ref={splide}
      >
        {pages.map((pageId) => (
          <SplideSlide key={pageId}>
          {createElement(page_to_component[pageId], { navigate }, null)}
          </SplideSlide>
        ))}
      </Splide>

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
