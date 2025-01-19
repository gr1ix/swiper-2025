import {
  createElement, useState, useRef,
} from 'react'
import './App.css'
import cn from 'clsx'
import {
  pages, page_to_component, page_to_title,
} from './pages'

import Swiper from 'tiny-swiper'

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
      <div
        className="swiper-container"
        ref={(elem) => {
          if (!elem) {
            return
          }
          const sw = new Swiper(elem, {
            initialSlide: page,
            speed: 500,
            spaceBetween: 32,
            centeredSlides: true,
          })

          sw.on('after-slide', (o) => {
            setPage(o)
          })

          swiper.current = sw
        }}
      >
        <div className="swiper-wrapper">
          {pages.map((pageId) => (
            <div className="swiper-slide" key={pageId}>
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
