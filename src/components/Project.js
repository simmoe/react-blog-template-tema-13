import React from 'react'
import './Project.css'
import { MdDelete } from "react-icons/md"
import { FaCode } from "react-icons/fa"
import firebase from './firebase'
import  { Link, navigate } from '@reach/router'


const Project = (props) => {

    const deleteProject = () => {
        if(window.confirm('sure?')){
            firebase.firestore()
                .collection('projects')
                .doc(props.id)
                .delete()
                .then( ref => console.log('Document was deleted') )
                .catch( error => console.log(error) )
        }
    }

    return(
        <div className='project'>
            {
                props.data.defaultImage &&
                <img src={props.data.defaultImage} alt='default' />
            }
            <div onClick={ () => navigate('/projects/' + props.id) } className='project-display-content'>
                <div>
                    <h1>{props.data.title}</h1>
                
                    <div className='year'>
                        {props.data.year}
                    </div>
                    <div className='byline'>
                        {props.data.byline}
                    </div>
                </div>
            </div>
            {
            props.signedIn &&
            <div className='admin-icons'>
                <Link to={'/edit/' + props.id}>
                    <FaCode className='edit-icons' />
                </Link>            
                <MdDelete onClick={deleteProject} className='edit-icons' />
            </div>
            }
        
        </div>
    )
}

export default Project