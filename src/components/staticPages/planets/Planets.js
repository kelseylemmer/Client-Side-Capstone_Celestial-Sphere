import { useEffect, useState } from "react"
import "./Planets.css"

export const Planets = () => {
  const [planets, setPlanets] = useState([])

  useEffect(
    () => {
      fetch(`http://localhost:8088/planets`)
        .then(response => response.json())
        .then((planetsArray) => {
          setPlanets(planetsArray)
        })
    },
    []
  )
  return <>
    <div className="page-container planets-container">
      <h1 className="page-title house-title">The Planets</h1>

      <div className="about"> <span className="intro">In astrology, planets are celestial bodies that represent a specific energy and symbolize different aspects of life.</span> They are considered the active agents that influence a person's individual traits, behaviors, and the events that occur in their live. The planets move through the zodiac signs, creating various planetary aspects and forming unique patterns that are interpreted to provide insights and predictions. The positions of the planets at the time of an individual's birth, as depicted in their birth chart, provide a map of the energies they carry throughout their life. By analyzing the interactions and placements of the planets, astrologers can gain deeper understanding into an individual's strengths, challenges, desires, and potential paths of growth. </div>
      <article className="planets">
        {
          planets.map(
            (planet) => {
              return <section className="planet" key={`${planet.id}`}>
                <h1 className="details-header">{planet.symbol} {planet.name}</h1>
                <div>Where {planet.name} falls in your birth chart {planet.impact}</div>
                <br></br>
                <div>{planet.description}</div>

                <br></br>
                <section className="blurb">
                  <div>{planet.name} spends about {planet.transit} in each sign.</div>
                  <div><span className="intro">{planet.name} rules:</span> {planet.rules}</div>
                </section>
              </section>
            }
          )
        }
      </article>
    </div>
  </>
}