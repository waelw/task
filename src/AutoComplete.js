import {useCallback, useEffect, useState } from "react"
import HighlightText from "./HightLightText"
import { mockDataFetch } from "./util"

const AutoComplete = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [optionSelected, setOptionSelected] = useState(null)
  let regex
  const getMockData = useCallback( // here we used useCallback Hooks to control our app rerender due to the multiple states that toggles
    async (query) => {
      setLoading(true)
      setResults(await mockDataFetch(query))
      setLoading(false)
      regex = new RegExp(query, 'gi');
    },
    [],
  )
  
  useEffect(() => {
    getMockData(query)
  }, [query])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }
  const handleInputFocussed = (e)=>{
    setShowResults(true)
  }
  const handleInputBlur = (e)=>{
    setTimeout(()=>{
        setShowResults(false)
    },[200]) // we did this latency cause the blur prevent the click event to be initiated on the options
  }
  const handleOptionSelected = (item)=>{
    setOptionSelected(item)
    setQuery(item.name)
  }


  return (
    <div className="container">
      <input className="input" placeholder="Search Users" value={query} onFocus={handleInputFocussed} onBlur={handleInputBlur} onChange={handleQueryChange} />
      <div className="results">
        {!loading  && (results.length > 0 ? (
          results.map((item) => <HighlightText text={item.name} highlight={query}/>)
        ) : (
          <p>No Results Try Typing Something Else </p>
        ))}

        {
            loading && showResults &&  <p>loading...</p>
        }
      </div>
    </div>
  )
}

export default AutoComplete
