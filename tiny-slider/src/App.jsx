import { useState, useRef } from 'react'
import './App.css'
import cn from 'clsx'

import 'tiny-slider/dist/tiny-slider.css'
import {tns} from 'tiny-slider'

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
  const tinySlider = useRef(null)

  const navigate = (page) => {
    const index = PAGES.indexOf(page)
    if (index === -1) return

    setPage(index)
    if (tinySlider.current) tinySlider.current.goTo(index)
  }

  const PagesJsx = PAGES.map((E, i) => {
    const Comp = PAGE_TO_COMPONENT[E]
    return (
      <div className="swiper-slide" key={i}>
        <Comp navigate={navigate}/>
      </div>
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
            fixedWidth: 480,
            controls: false,
            nav: false,
            loop: false,
            rewind: false,
            //autoHeight: true,
            mouseDrag: true,
            startIndex: page,
          })

          t.events.on('indexChanged', (o) => {
            setPage(o.index)
          })

          tinySlider.current = t
        }}
      >
        {PagesJsx}
      </div>
      {navJsx}
    </div>
  )
}

export default App
