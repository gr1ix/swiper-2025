import {
  createElement, useState, useRef,
} from 'react'
import './App.css'
import cn from 'clsx'
import {
  pages, page_to_component, page_to_title,
} from './pages'

import Glide, {
  Swipe,
} from '@glidejs/glide/dist/glide.modular.esm'
import '@glidejs/glide/dist/css/glide.core.min.css'

export default function App() {
  const [page, setPage] = useState(0)
  const glide = useRef(null)

  const navigate = (page) => {
    const index = pages.indexOf(page)
    if (index === -1) return

    if (glide.current) {
      glide.current.go(`=${index}`)
    }
  }

  return (
    <div className="wrapper">
      <div
        className="swiper"
        ref={(elem) => {
          if (!elem) {
            return
          }
          const gl = new Glide(elem, {
            perView: 1,
            gap: 32,
            rewind: false,
            startAt: page,
          }).mount({
            Swipe,
          })
          gl.on('run.after', () => {
            setPage(gl.index)
          })

          glide.current = gl
        }}
      >
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {pages.map((pageId) => (
              <li className="glide__slide" key={pageId}>
              {createElement(page_to_component[pageId], { navigate }, null)}
              </li>
            ))}
          </ul>
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
