import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './redux/dataReducer'
import * as api from './api'

import BaseComp from './components/BaseComp'
import { Container } from '@material-ui/core'

import _ from 'lodash'

const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.counter.data)

  const fetchCats = async () => {
    const { data } = await api.fetchCategories()

    dispatch(getData({data}))

  }

  useEffect(() => {

    console.log(dataState)
      try {
         fetchCats()
      } catch (error) {
        console.log(error)
      }
  }, [])

  return (
    <Container>
      {
        !_.isEmpty(dataState) &&
        dataState.map((val, i) => (
            <BaseComp data={val} key={i} />
          ))
      }
      <BaseComp />
    </Container>
  );
}

export default App;
