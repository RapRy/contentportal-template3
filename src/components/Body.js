import { Box, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const Body = ({ subcategories }) => {
    const classes = useStyles()

    return (
        <Box component="div" className={classes.mainContainer}>
            <List>
                {
                    subcategories !== undefined && subcategories.map((sub, i) => (
                        <ListItem className={classes.li} key={sub._id}>{sub.subCatName}</ListItem>
                    ))
                }
            </List>
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
