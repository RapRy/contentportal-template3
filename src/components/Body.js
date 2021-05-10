import { Box, Button, List, ListItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { getContents, getDetails } from '../redux/dataReducer'
import * as api from '../api'

const Body = ({ bodyData, cardRef }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleClick = async (subcat) => {
        const { data } = await api.fetchContents(subcat)

        dispatch(getContents(data))
    }

    const handleClick2 = async (id, subcat) => {
        const { data } = await api.fetchDatails(id, subcat)

        dispatch(getDetails(data))
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
                                <Box key={cont._id} className={classes.item} onClick={() => handleClick2(cont._id, cont.subCatName)}>
                                    <img src={cont.thumbnail} alt={cont.name} className={classes.img} />
                                    <p className={classes.span}>{cont.name}</p>
                                </Box>
                            ))
                        }
                    </Box>
            }

            {
                cardRef === "details" &&
                    <Box component="div" className={classes.detailsCont}>
                        <Box component="div" className={classes.detailsInner}>
                            <Box className={classes.previewThumb}>
                                <img src={bodyData.thumbnail} alt={bodyData.name}></img>
                            </Box>
                            <Box>
                                <Box>
                                    <Typography variant="h3">{bodyData.name}</Typography>
                                    <p>{bodyData.subCatName}</p>
                                </Box>
                                <Button>Download</Button>
                            </Box>
                            <Box>
                                <Typography variant="h3">Information</Typography>
                                <p>{bodyData.description}</p>
                            </Box>
                            {
                                bodyData.screenshots.length !== 0 &&
                                    <Box>
                                        <Typography variant="h3">Screenshots</Typography>
                                        <Box>
                                            {
                                                bodyData.screenshots.map((screen, i) => <img src={screen} key={i} alt={`screen-${i}`} />)
                                            }
                                        </Box>
                                    </Box>
                            }
                        </Box>
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
    },
    item: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "5px"
    },
    span: {
        width: "100%",
        padding: "4%",
        position: "absolute",
        bottom: "0",
        left: "0",
        background: "rgba(30, 39, 73, 0.8)",
        color: "#FAFAFF",
        fontSize: ".6rem",
        lineHeight: "1.4",
        borderRadius: "0px 0px 5px 5px"
    },
    detailsCont: {
        padding: "20px 10px",
        position: "relative"
    },
    detailsInner: {
        overflowY: "auto"
    },
    previewThumb: {
        textAlign: "center",
        marginBottom: "20px",
        padding: "0 10px"
    }
})

export default Body
