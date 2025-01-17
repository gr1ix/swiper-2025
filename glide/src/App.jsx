import { useState, useRef } from 'react'
import './App.css'
import cn from 'clsx'

import Glide, {
  Swipe,
} from '@glidejs/glide/dist/glide.modular.esm'
import '@glidejs/glide/dist/css/glide.core.min.css'

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
  const glide = useRef(null)

  const navigate = (page) => {
    const index = PAGES.indexOf(page)
    if (index === -1) return

    setPage(index)
    if (glide.current) glide.current.go(`=${index}`)
  }

  const PagesJsx = PAGES.map((E, i) => {
    const Comp = PAGE_TO_COMPONENT[E]
    return (
      <li className="glide__slide" key={i}>
        <Comp navigate={navigate}/>
      </li>
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

  const options = {
    perView: 1,
    gap: 32,
    rewind: false,
    startAt: page,
  }

  return (
    <div className="wrapper">
      <div
        className="glide"
        ref={(e) => {
          const gl = new Glide(
            '.glide', options,
          ).mount({
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
            {PagesJsx}
          </ul>
        </div>
      </div>
      {navJsx}
    </div>
  )
}

export default App
