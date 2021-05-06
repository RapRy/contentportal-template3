import { useEffect } from 'react'
import _ from 'lodash'

import { Container } from '@material-ui/core'
import Header from './Header'

const BaseComp = ({ data }) => {

    useEffect(() => {
        
    }, [])

    return (
        <Container>
            {
                !_.isEmpty(data) && <Header categories={data.categories} />
            }
        </Container>
    );
}

export default BaseComp;