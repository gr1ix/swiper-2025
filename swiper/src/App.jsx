import { useState, useRef } from 'react'
import './App.css'
import cn from 'clsx'

import {
  Swiper, SwiperSlide,
} from "swiper/react"
import "swiper/css"

const PAGES = [ "Main", "Settings" ]
const PAGE_TO_COMPONENT = {
  "Main": ({navigate}) => (
    <section style={{background: 'red'}}>
      <h2>Main page</h2>
      <button onClick={navigate.bind(null, "Settings")}>Open Settings</button>
    </section>
  ),
  "Settings": () => (
    <section style={{background: 'tan'}}>
      Settings page
    </section>
  ),
}
const PAGE_TO_TITLE = {
  "Main": "Main",
  "Settings": "Settings",
}

function App() {
  const [page, setPage] = useState(0)
  const swiper = useRef(null)

  const navigate = (page) => {
    const index = PAGES.indexOf(page)
    if (index === -1) return

    setPage(index)
    if (swiper.current) swiper.current.slideTo(index)
  }

  const PagesJsx = PAGES.map((E, i) => {
    const Comp = PAGE_TO_COMPONENT[E]
    return (
      <SwiperSlide key={i}>
        <Comp navigate={navigate}/>
      </SwiperSlide>
    )
  })

  const navJsx = (
    <nav className={PAGES.length < 3 ? 'justify-around' : ''}>
      {
        PAGES.map((p, i) => {
          return (
            <button
              key={p}
              className={cn({
                selected: page === i,
              })}
              onClick={() => navigate(p)}
            >
              {PAGE_TO_TITLE[p]}
            </button>
          )
        })
      }
    </nav>
  )

  return (
    <div className="wrapper">
      <Swiper
        spaceBetween="32"
        onSlideChange={(e) => {
          setPage(e.activeIndex);
        }}
        onSwiper={(e) => (swiper.current = e)}
      >
        {PagesJsx}
      </Swiper>
      {navJsx}
    </div>
  )
}

export default App
