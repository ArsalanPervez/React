import React from 'react'
import { Link } from 'react-router-dom'

const GlobalButton = ({ onClick, label, link = '/', customStyle = {}, customClasses = ''}) => {
    const baseStyle = {
        backgroundColor: 'var(--primary)',
        padding: '15px 72px',
        color: '#fff',
        fontWeight: 'semibold',
        display: 'inline-block',
    }

    const styleVariants = {
        ...baseStyle,
        ...customStyle
    };

    return (
        <div className='h-fit'>
            <Link to={link} style={styleVariants} className={`rounded-md transition-all duration-300 ${customClasses} hover:!bg-secondary !border hover:!border-primary hover:!text-primary`}> {label}</Link>
        </div>
  )
}

export default GlobalButton