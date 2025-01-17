import { useState, useRef } from 'react'
import './App.css'
import cn from 'clsx'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

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
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { spacing: 32 },
    initial: page,
    slideChanged(o) {
      setPage(o.track.details.abs)
    }
  }, [])

  const navigate = (page) => {
    const index = PAGES.indexOf(page)
    if (index === -1) return

    setPage(index)
    if (instanceRef.current) {
      instanceRef.current.track.to(index)
    }
  }

  const PagesJsx = PAGES.map((E, i) => {
    const Comp = PAGE_TO_COMPONENT[E]
    return (
      <div className="keen-slider__slide" key={i}>
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
        className="keen-slider"
        ref={sliderRef}
      >
        {PagesJsx}
      </div>
      {navJsx}
    </div>
  )
}

export default App
