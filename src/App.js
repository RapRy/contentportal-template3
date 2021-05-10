import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from './redux/dataReducer'
import * as api from './api'

import BaseComp from './components/BaseComp'
import { Container } from '@material-ui/core'

import _ from 'lodash'

import { useTransition, animated } from 'react-spring'

const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data.data)

  const transition = useTransition(dataState, {
    from: { y: "999px", x: "4%", width: "92%" },
    enter: { y: "10px", x: "0%", width: "100%" },
    leave: { y: "999px", x: "4%", width: "92%" }
  })

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
      {/* {
        !_.isEmpty(dataState) &&
        dataState.map((val, i) => (
            <BaseComp data={val} refId={i} key={i} />
          ))
      } */}

      {
        !_.isEmpty(dataState) && 
          transition((style, item, t, i) => (
            <animated.div style={style}>
              <BaseComp data={item} refId={i} />
            </animated.div>
          ))
      }
    </Container>
  );
}

export default App;
