import React, { ReactNode } from 'react'
import Header from '../Header'


interface IProps {
    children?: ReactNode
}
const BaseLayout: React.FC<IProps> = (props) => {
    return (
        <div className='h-screen bg-white dark:bg-primary'>
            <Header></Header>
            {props.children}
        </div>
    )
}

export default BaseLayout