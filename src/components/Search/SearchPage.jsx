import React from 'react'
import SearchForm from './SearchForm'
import SearchList from './SearchList'
import AnimationPage from '../AnimationPage'

const SearchPage = () => {
  return (
    <>
      <AnimationPage>
        <SearchForm/>
        <SearchList/>
      </AnimationPage>
    </>
  )
}

export default SearchPage