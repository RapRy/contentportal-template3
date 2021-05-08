import { Box, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { getContents } from '../redux/dataReducer'
import * as api from '../api'

const Body = ({ subcategories, cardRef }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleClick = async (subcat) => {
        const { data } = await api.fetchContents(subcat)

        dispatch(getContents(data))
    }

    return (
        <Box component="div" className={classes.mainContainer}>
            {
                cardRef === "category" &&
                    <List>
                        {
                            
                            subcategories !== undefined && subcategories.map((sub, i) => (
                                <ListItem onClick={() => handleClick(sub.subCatName)} className={classes.li} key={sub._id}>{sub.subCatName}</ListItem>
                            ))
                        }
                    </List>
            }
        </Box>
    )
}

const useStyles = makeStyles({
    mainContainer: {
        padding: "20px 10px"
    },
    li: {
        display: "block",
        marginBottom: "10px", 
            '&:last-child': {
                marginBottom: "0px"
        },
        textAlign: "center",
        color: "#FAFAFF",
        fontWeight: "500",
        background: "linear-gradient(180deg, #273469 0%, #1E2749 100%)",
        borderRadius: "5px",
        fontSize: "1.1rem",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
        padding: "15px 0"
    }
})

export default Body
