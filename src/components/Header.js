import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getData } from '../redux/dataReducer'
import * as api from '../api'

import { Container, List, ListItem } from '@material-ui/core'

import _ from 'lodash'

const Header = ({ categories }) => {

    const dispatch = useDispatch()

    const handleClick = async () => {
        const { data } = await api.fetchCategories()

        dispatch(getData(data))
    }

    useEffect(() => {
        
    }, [])

    return (
        <Container>
            <List>
                {
                    categories.map((cat, i) => (
                        <ListItem key={cat._id} onClick={handleClick}>{cat.catName}</ListItem>
                    ))
                }
            </List>
        </Container>
    )
}

export default Header
