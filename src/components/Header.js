import { useDispatch } from 'react-redux'
import { getCategories, removeContents } from '../redux/dataReducer'
import * as api from '../api'

import { Container, List, ListItem, Box, Typography, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/styles'

const Header = ({ headerData, cardRef, refId }) => {

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
                        headerData !== undefined && headerData.map((cat, i) => (
                            <ListItem className={classes.li} key={cat._id} onClick={() => handleClick(cat.catName)}>{cat.catName}</ListItem>
                        ))
                    }
                </List>
            }

            {
                (cardRef === "contents" || cardRef === "details") &&
                    <Box component="div" className={classes.containerCont}>
                        <Typography variant="h4" className={classes.h4}>
                            {headerData}
                        </Typography>
                        <IconButton className={classes.button} onClick={() => dispatch(removeContents(refId))} >
                            <CloseIcon />
                        </IconButton>
                    </Box>
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
    li: {
        color: "#FAFAFF",
        fontSize: "1rem",
        fontWeight: "500",
        display: "inline"

    },
    containerCont: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "10px",
        alignItems: "center"
    },
    h4: {
        fontSize: "1rem",
        fontWeight: "500",
        color: "#FAFAFF"
    },
    button: {
        padding: "0"
    }
})

export default Header
