import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from './redux/dataReducer'
import * as api from './api'

import BaseComp from './components/BaseComp'
import { Container } from '@material-ui/core'

import _ from 'lodash'

const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data.data)

  const fetchCats = async () => {
    const { data } = await api.fetchCategories("Games")

    dispatch(getCategories(data))

  }

  useEffect(() => {
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
    </Container>
  );
}

export default App;
