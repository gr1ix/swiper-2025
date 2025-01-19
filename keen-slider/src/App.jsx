import {
  createElement, useState,
} from 'react'
import './App.css'
import cn from 'clsx'
import {
  pages, page_to_component, page_to_title,
} from './pages'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

export default function App() {
  const initialPage = 0
  const [page, setPage] = useState(initialPage)
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { spacing: 32 },
    initial: initialPage,
    animationEnded(o) {
      setPage(o.track.details.abs)
    }
  }, [])

  const navigate = (page) => {
    const index = pages.indexOf(page)
    if (index === -1) return

    if (instanceRef.current) {
      instanceRef.current.moveToIdx(
        index,
        true,
      )
      setPage(index)
    }
  }

  return (
    <div className="wrapper">
      <div
        className="keen-slider"
        ref={sliderRef}
      >
        {pages.map((pageId) => (
          <div className="keen-slider__slide" key={pageId}>
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
