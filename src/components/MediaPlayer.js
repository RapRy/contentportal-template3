import { useState, useEffect } from 'react'

import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import PauseIcon from '@material-ui/icons/Pause'

const MediaPlayer = ({ media, progress, timestamp }) => {
    const classes = useStyles()
    const [showVolume, setShowVolume] = useState(false)
    const [play, setPlay] = useState(false)

    const stopMedia = () => {
        if(play === true){
            setPlay(!play)
            media.current.currentTime = 0
            media.current.pause()
        }else{
            media.current.currentTime = 0 
        }
    }

    useEffect(() => {
        play ? media.current.play() : media.current.pause()
    }, [play])

    return (
        <Box className={classes.controls}>
            <Button className={classes.btn} onClick={() => setPlay(!play)}>
                {play ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <Button className={`${classes.btn} ${classes.btnRed}`} onClick={stopMedia}>
                <StopIcon />    
            </Button> 
            <input className={classes.progress} type="range" min="0" max="100" step="0.1" value={progress} readOnly />
            <Box className={classes.volumeControl}>
                {showVolume && <input className={`${classes.progress} ${classes.volumeRange}`} type="range" min="0" max="1" step="0.01" value={0} readOnly />}
                <Button className={classes.btn} onClick={() => setShowVolume(!showVolume)}>
                    <VolumeUpIcon />
                </Button>
            </Box>
            <span className={classes.timestamp}>{timestamp}</span>
        </Box>
    )
}

const useStyles = makeStyles({
    controls: {
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        fontSize: "1rem",
        border: "0",
        background: "transparent",
        cursor: "pointer",
        marginRight: "5px",
        padding: "0",
        minWidth: "auto",
        color: "#30343f"
    },
    btnRed: {
        color: "#FF0000"
    },
    progress: {
        appearance: "none",
        width: "100%",
        background: "transparent",
        marginRight: "5px",
        border: "0",
        '&::-webkit-slider-thumb': {
            appearance: "none",
            border: "1px solid #30343f",
            height: "16px",
            width: "8px",
            borderRadius: "2px",
            background: "#30343f",
            cursor: "pointer",
            marginTop: "-5px"
        },
        '&::-moz-range-thumb': {
            border: "1px solid #30343f",
            height: "16px",
            width: "8px",
            borderRadius: "2px",
            background: "#30343f",
            cursor: "pointer",
            marginTop: "-5px"
        },
        '&::-ms-thumb': {
            border: "1px solid #30343f",
            height: "16px",
            width: "8px",
            borderRadius: "2px",
            background: "#30343f",
            cursor: "pointer",
            marginTop: "-5px" 
        },
        '&::-webkit-slider-runnable-track': {
            width: "100%",
            height: "4px",
            cursor: "pointer",
            background: "#9da1b2",
            marginTop: "-2px"
        },
        '&::-moz-range-track': {
            width: "100%",
            height: "4px",
            cursor: "pointer",
            background: "#9da1b2",
            marginTop: "-2px"
        },
        '&::-ms-track': {
            width: "100%",
            height: "4px",
            cursor: "pointer",
            background: "#9da1b2",
            marginTop: "-2px"
        }
    },
    volumeControl: {
        position: 'relative',
        border: "0"
    },
    volumeRange: {
        position: "absolute",
        top: "-10px",
        left: "0",
        width: "50px"
    },
    timestamp: {
        color: "#30343f",
        fontSize: ".7rem",
        fontWeight: "400"
    }
})

export default MediaPlayer
