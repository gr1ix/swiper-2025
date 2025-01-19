import { createElement, useState, useRef } from 'react'
import './App.css'
import cn from 'clsx'
import {
  pages, page_to_component, page_to_title
} from './pages.tsx'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function App() {
  const [page, setPage] = useState(0)
  const swiper = useRef(null)

  const navigate = (page) => {
    const index = pages.indexOf(page)
    if (index === -1) return

    if (swiper.current) {
      swiper.current.slideTo(index)
      setPage(index)
    }
  }

  return (
    <div className="wrapper">
      <Swiper
        spaceBetween="32"
        onSlideChange={(e) => setPage(e.activeIndex)}
        onSwiper={(e) => (swiper.current = e)}
      >
        {pages.map((pageId) => (
          <SwiperSlide key={pageId}>
          {createElement(page_to_component[pageId], { navigate }, null)}
          </SwiperSlide>
        ))}
      </Swiper>

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
