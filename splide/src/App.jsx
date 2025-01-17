import { useState, useRef } from 'react'
import './App.css'
import cn from 'clsx'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

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
  const splide = useRef(null)

  const navigate = (page) => {
    const index = PAGES.indexOf(page)
    if (index === -1) return

    setPage(index)
    if (splide.current) {
      splide.current.splide.go(index)
    }
  }

  const PagesJsx = PAGES.map((E, i) => {
    const Comp = PAGE_TO_COMPONENT[E]
    return (
      <SplideSlide key={i}>
        <Comp navigate={navigate}/>
      </SplideSlide>
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
      <Splide
        options={{
          gap: '32px',
          start: page,
          arrows: false,
          pagination: false,
        }}
        onMoved={(_, o) => {
          setPage(o)
        }}
        ref={splide}
      >
        {PagesJsx}
      </Splide>
      {navJsx}
    </div>
  )
}

export default App
