import { useState, useRef, useEffect } from 'react'
import './App.css'
import cn from 'clsx'

import useEmblaCarousel from 'embla-carousel-react'

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
  const [embla, emblaApi] = useEmblaCarousel({
    loop: false,
    startIndex: page,
  })

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', (o) => {
        const idx = o.selectedScrollSnap()
        setPage(idx)
      })
    }
  }, [emblaApi])

  const navigate = (page) => {
    const index = PAGES.indexOf(page)
    if (index === -1) return

    setPage(index)
    if (emblaApi) emblaApi.scrollTo(index)
  }

  const PagesJsx = PAGES.map((E, i) => {
    const Comp = PAGE_TO_COMPONENT[E]
    return (
      <div className="embla__slide" key={i}>
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
        className="embla"
        ref={embla}
      >
        <div className="embla__container">
          {PagesJsx}
        </div>
      </div>
      {navJsx}
    </div>
  )
}

export default App
