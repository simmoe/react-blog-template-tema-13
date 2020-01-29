import React, {useState, useEffect} from 'react'
import './Project.css'
import firebase from './firebase'
import  { Link } from '@reach/router'
import parse from 'html-react-parser'
import './ProjectDetails.css'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

const ProjectDetails = (props) => {

    const[project,setProject] = useState()
    const[prev,setPrev] = useState()
    const[next,setNext] = useState()


    useEffect( () => {
        firebase
        .firestore()
        .collection('projects')
        .doc(props.id)
        .onSnapshot(
            snapshot => setProject(snapshot.data())
        )
        firebase
        .firestore()
        .collection('projects')
        .orderBy('title')
        .get()
        .then( projects => {
            const array = projects.docs.map( doc => doc.id)
            const myPos = array.indexOf(props.id)
            setNext( myPos + 1 === array.length ? array[0] : array[myPos + 1])
            setPrev( myPos === 0 ? array[array.length - 1] : array[myPos - 1])
        })
    }, [props.id])


    let styles
    if(project){
        styles = {
            parallax:{                
                backgroundImage: 'url(' + project.parallax + ')',
                height:'100vh',
                width:'100vw',
                backgroundAttachment:'fixed',
                backgroundSize:'cover',
                display:'grid',
                placeItems:'center',
                fontSize:'2rem',
                color:'white'
            }
        }
    }

    return(
        <main className='project-details'>
        {
        project 
        ?    
        <div>
            <div className='pager'>
                <Link to={'/projects/' + prev}><FaChevronCircleLeft className='edit-icons' /></Link>
                <Link to={'/projects/' + next}><FaChevronCircleRight className='edit-icons' /></Link>
            </div>

            {
                project.parallax &&
                <div style={styles.parallax}>
                    <h1>{project.title}</h1>
                </div>
            }

            <div className='project-content'>
                <h1>{project.title}</h1>           
                <div className='year'>
                    {project.year}
                </div>
                <div className='description'>
                    {project.description && parse(project.description)}
                </div>
            </div>
        </div>
        :
        <h2>Fetching project, hold on...</h2>
        }
        </main>
    )
}

export default ProjectDetails