import { useRef, useState } from 'react'
import { Box, Button, List, ListItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { getContents, getDetails } from '../redux/dataReducer'
import Video from '../assets/video.mp4'
import Audio from '../assets/music.mp3'
import MediaPlayer from './MediaPlayer'
import * as api from '../api'

const Body = ({ bodyData, cardRef }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const mediaType = useRef()
    const [progress, setProgress] = useState(0)
    const [timestamp, setTimestamp] = useState("00:00")

    const updateProgress = () => {
        setProgress((mediaType.current.currentTime / mediaType.current.duration) * 100)

        let mins = Math.floor(mediaType.current.currentTime / 60)
        let secs = Math.floor(mediaType.current.currentTime % 60)

        if(mins < 10)
            mins = '0' + String(mins)
        
        if(secs < 10)
            secs = '0' + String(secs)

        setTimestamp(`${mins}:${secs}`)
    }

    const handleClick = async (subcat, cat) => {
        const { data } = await api.fetchContents(subcat, cat)

        dispatch(getContents(data))
    }

    const handleClick2 = async (id) => {
        const { data } = await api.fetchDatails(id)

        dispatch(getDetails(data))
    }

    return (
        <Box component="div" className={classes.mainContainer}>
            {
                cardRef === "category" &&
                    <List>
                        {
                            
                            bodyData !== undefined && bodyData.map((sub, i) => (
                                <ListItem onClick={() => handleClick(sub.subCatName, sub.catName)} className={classes.li} key={sub._id}>{sub.subCatName}</ListItem>
                            ))
                        }
                    </List>
            }

            {
                cardRef === "contents" &&
                    <Box component="div" className={classes.containerCont}>
                        {
                            bodyData !== undefined && bodyData.map((cont, i) => (
                                <Box key={cont._id} className={classes.item} onClick={() => handleClick2(cont._id)}>
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
                                {
                                    (bodyData.catName === "Games" || bodyData.catName === "Apps") && <img src={bodyData.thumbnail} alt={bodyData.name}></img>
                                }
                                {
                                    bodyData.catName === "Videos" &&
                                        <>
                                            <video onTimeUpdate={updateProgress} ref={mediaType} preload="metadata" className={classes.widthHeight}>
                                                <source src={Video} type="video/mp4" />
                                            </video>
                                            <MediaPlayer media={mediaType} progress={progress} timestamp={timestamp} />
                                        </>
                                }
                                {
                                    bodyData.catName === "Music" &&
                                        <>
                                            <img src={bodyData.thumbnail} alt={bodyData.name}></img>
                                            <audio onTimeUpdate={updateProgress} ref={mediaType} preload="metadata" className={classes.widthHeight}>
                                                <source src={Audio} type="audio/mpeg" />
                                            </audio>
                                            <MediaPlayer media={mediaType} progress={progress} timestamp={timestamp} />
                                        </>
                                }
                            </Box>
                            <Box className={classes.previewNameDL}>
                                <Box>
                                    <Typography variant="h3" className={classes.nameH3}>{bodyData.name}</Typography>
                                    <p className={classes.nameP}>{bodyData.subCatName}</p>
                                </Box>
                                <Button className={classes.dlBtn}>Download</Button>
                            </Box>
                            {
                                bodyData.description !== "" &&
                                    <Box className={classes.previewDescription}>
                                        <Typography variant="h3" className={classes.descH3}>Information</Typography>
                                        <p className={classes.descP}>{bodyData.description}</p>
                                    </Box>
                            }
                            {
                                bodyData.screenshots.length !== 0 &&
                                    <Box className={classes.previewScreenshots}>
                                        <Typography variant="h3" className={classes.screenH3}>Screenshots</Typography>
                                        <Box className={classes.screenImages}>
                                            {
                                                bodyData.screenshots.map((screen, i) => <img src={screen} className={classes.imgScreen} key={i} alt={`screen-${i}`} />)
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
    },
    previewNameDL: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "10px",
        marginBottom: "20px"
    },
    nameH3: {
        fontSize: ".9rem",
        fontWeight: "700"
    },
    nameP: {
        fontSize: ".7rem",
        fontWeight: "500"
    },
    dlBtn: {
        padding: "10px",
        fontSize: ".9rem",
        display: "inline-block",
        alignSelf: "center",
        justifySelf: "end",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
        color: "#FAFAFF",
        fontWeight: "500",
        background: "linear-gradient(180deg, #273469 0%, #1E2749 100%)",
        borderRadius: "5px",
        textAlign: "center"
    },
    previewDescription: {
        marginBottom: "20px"
    },
    descH3: {
        paddingBottom: "5px",
        fontSize: ".9rem",
        fontWeight: "700",
        color: "#30343f"
    },
    descP: {
        fontSize: ".7rem",
        fontWeight: "400",
        textAlign: "left",
        lineHeight: "1.6"
    },
    previewScreenshots: {
        borderTop: "2px solid #9da1b2",
        padding: "20px 0"
    },
    screenH3: {
        paddingBottom: "5px",
        fontSize: ".9rem",
        fontWeight: "700",
        color: "#30343f"
    },
    screenImages: {
        overflowX: "scroll",
        whiteSpace: "nowrap",
        padding: "0 10px"
    },
    imgScreen: {
        marginRight: "10px"
    },
    widthHeight: {
        width: "100%",
        height: "100%"
    }
})

export default Body
