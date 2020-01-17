import React from 'react'
import './Project.css'

const Project = (props) => {
    return(
        <div className='project'>
            <h1>{props.data.title}</h1>
            <p>{props.data.description}</p>
            {
               props.data.color && <p>farge: {props.data.color}</p>
            }

        </div>
    )
}

export default Project