import { Box, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { getContents } from '../redux/dataReducer'
import * as api from '../api'

const Body = ({ bodyData, cardRef }) => {
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
                            
                            bodyData !== undefined && bodyData.map((sub, i) => (
                                <ListItem onClick={() => handleClick(sub.subCatName)} className={classes.li} key={sub._id}>{sub.subCatName}</ListItem>
                            ))
                        }
                    </List>
            }

            {
                cardRef === "contents" &&
                    <Box component="div" className={classes.containerCont}>
                        {
                            bodyData !== undefined && bodyData.map((cont, i) => (
                                <Box key={cont._id}>
                                    <img src={cont.thumbnail} alt={cont.name} />
                                    <p>{cont.name}</p>
                                </Box>
                            ))
                        }
                    </Box>
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
    },
    containerCont: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px"
    }
})

export default Body
