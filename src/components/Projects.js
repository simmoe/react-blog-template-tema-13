import React,{ useState, useEffect } from 'react'
import firebase from './firebase'
import Project from './Project'
import './Projects.css'
import { IoIosAddCircle } from 'react-icons/io'
import {navigate} from '@reach/router'
import ClipLoader from "react-spinners/ClipLoader"
import Masonry from 'react-masonry-css'

const Projects = (props) => {
    const [projects, setProjects] = useState([])
    
    useEffect( () => {
        console.log('hejsa')
        firebase
        .firestore()
        .collection('projects')
        .orderBy('title')
        .onSnapshot(
            snapshot => setProjects(snapshot.docs)
        )
    }, [])

    const addProject = () => {
        firebase.firestore().collection('projects').add(
            {
                title:'0 New project',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        .then( doc => navigate('/edit/' + doc.id) )
    }

    return(
        <main className='projects'>
            {
                props.signedIn &&
                <div className='add'>
                    <IoIosAddCircle className='edit-icons' onClick={addProject} />
                </div>
            }

            {
            projects.length > 0
            ?
                <div className='projects-container'>
                {
                    projects.map(
                        project => 
                        <Project 
                            key={project.id} 
                            data={project.data()} 
                            id={project.id} 
                            signedIn={props.signedIn}
                        />
                    )
                }
                </div>
            :
            <ClipLoader />
            }
        </main>
    )
}

export default Projects