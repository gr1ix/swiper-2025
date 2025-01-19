import {
  createElement, useState, useRef,
} from 'react'
import './App.css'
import cn from 'clsx'
import {
  pages, page_to_component, page_to_title,
} from './pages'

import 'tiny-slider/dist/tiny-slider.css'
import {tns} from 'tiny-slider'

export default function App() {
  const [page, setPage] = useState(0)
  const tinySlider = useRef(null)

  const navigate = (page) => {
    const index = pages.indexOf(page)
    if (index === -1) return

    if (tinySlider.current) {
      tinySlider.current.goTo(index, 500)
    }
  }

  return (
    <div className="wrapper">
      <div
        className="swiper"
        ref={(container) => {
          if (container == null) {
            return
          }
          const t = tns({
            container,
            //gutter: 32,
            //autoWidth: true,
            slideBy: 'page',
            //fixedWidth: 480,
            viewportMax: 480,
            controls: false,
            nav: false,
            loop: false,
            rewind: false,
            //autoHeight: true,
            mouseDrag: true,
            swipeAngle: false,
            speed: 500,
            startIndex: page,
          })

          t.events.on('transitionEnd', (o) => {
            setPage(o.index)
          })

          tinySlider.current = t
        }}
      >
        {pages.map((pageId) => (
          <div className="swiper-slide" key={pageId}>
          {createElement(page_to_component[pageId], { navigate }, null)}
          </div>
        ))}
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
