import _ from 'lodash'

import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Header from './Header'
import Body from './Body'

const BaseComp = ({ data }) => {
    const classes = useStyles()

    return (
        <Container className={classes.mainBaseComp}>
            {
                !_.isEmpty(data) && <Header categories={data.categories} cardRef={data.cardRef} />
            }
            {
                !_.isEmpty(data) && <Body subcategories={data.subcategories} />
            }
        </Container>
    );
}

const useStyles = makeStyles({
    mainBaseComp:{
        background: "#fafaff",
        borderRadius: "8px 8px 0 0",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        width: "100%",
        height: "100vh",
        position: 'absolute',
        top:"0px",
        left:"0%",
        padding: "0"
    }
})

export default BaseComp;