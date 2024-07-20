import React from 'react'
import Layout from '../../components/layout/Layout'

const layout = ({ children }) => {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            {children}
        </Layout>
    )
}

export default layout