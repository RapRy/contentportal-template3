import _ from 'lodash'

import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Header from './Header'
import Body from './Body'

const BaseComp = ({ data, refId }) => {
    const classes = useStyles({ zindex: data.customStyles.zindex, width: data.customStyles.width, left: data.customStyles.left, top: data.customStyles.top })

    return (
        <Container className={classes.mainBaseComp}>
            {
                !_.isEmpty(data) && <Header headerData={data.header} cardRef={data.cardRef} refId={refId} />
            }
            {
                !_.isEmpty(data) && <Body bodyData={data.body} cardRef={data.cardRef} />
            }
        </Container>
    );
}

const useStyles = makeStyles({
    mainBaseComp:{
        background: "#fafaff",
        borderRadius: "8px 8px 0 0",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        width: props => props.width+"%",
        height: "100vh",
        position: 'absolute',
        top: props => props.top+"px",
        left: props => props.left+"%",
        padding: "0",
        zIndex: props => props.zindex
    }
})

export default BaseComp;