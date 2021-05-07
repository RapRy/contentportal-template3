import { useDispatch } from 'react-redux'
import { getCategories } from '../redux/dataReducer'
import * as api from '../api'

import { Container, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const Header = ({ categories, cardRef }) => {

    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClick = async (cat) => {
        const { data } = await api.fetchCategories(cat)

        dispatch(getCategories(data))
    }

    return (
        <Container className={classes.heading}>
            {
                cardRef === "category" &&
                <List>
                    {
                        categories !== undefined && categories.map((cat, i) => (
                            <ListItem className={classes.li} key={cat._id} onClick={() => handleClick(cat.catName)}>{cat.catName}</ListItem>
                        ))
                    }
                </List>
            }
        </Container>
    )
}

const useStyles = makeStyles({
    heading: {
        padding: "15px 10px",
        background: "linear-gradient(180deg, #9DA1B2 0%, #747787 100%)",
        borderRadius: "8px 8px 0px 0px"
    },
    li:{
        color: "#FAFAFF",
        fontSize: "1rem",
        fontWeight: "500",
        display: "inline"

    }
})

export default Header
