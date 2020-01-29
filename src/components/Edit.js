import React, {useState, useEffect} from 'react'
import firebase from './firebase'
import './Edit.css'
import FileUploader from "react-firebase-file-uploader"

const Edit = (props) => {

    const [project, setProject] = useState()
    const [status,setStatus] = useState('')
    const [imageName, setImageName] = useState('defaultImage')

    useEffect( () => {
        firebase.firestore().collection('projects').doc(props.id)
        .onSnapshot( snapshot => 
            setProject( snapshot.data() )    
        )
    }, [props.id] )

    const saveProject = (e) => {
        setStatus('updating project, please hold')
        e.preventDefault()
        firebase.firestore().collection('projects').doc(props.id)
            .update(project)
            .then( () => setStatus('project updated') )
            .catch( error => {console.log( error.message )} )
    }

    const updateValue = 
        e => {
        e.persist()

        switch(e.target.type){
            case 'checkbox':{
                console.log('her')
                setProject( 
                    existingProject => ({
                    ...existingProject,
                    [e.target.name]: e.target.checked
                }))
                break;
            }
            case 'text':{
                setProject( 
                    existingProject => ({
                    ...existingProject,
                    [e.target.name]: e.target.value
                }))
                break;
            }
            default:{
                setProject( 
                    existingProject => ({
                    ...existingProject,
                    [e.target.name]: e.target.value
                }))
                break;
            }
        }
    }
    const uploadStart = () => {
        setStatus('uploading image, please hold')
    }
    const uploadError = (error) => {
        setStatus(error)
    }
    const handleProgress = (percentage) => {
        console.log(percentage)
    }

    const uploadSuccess = filename => {
        firebase
            .storage()
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(
                url => setProject( existingProject => ( {
                    ...existingProject,
                    [imageName]: url
                } ) )
            )
            setStatus('image uploaded')
    }

    return(
        <main className='edit'>
            {
            project && 
            <>
            <h1>Edit project: {project.title}</h1>
            <form onSubmit={saveProject}>

                <input name='title' onChange={updateValue} value={project.title} />
                
                <input name='year' onChange={updateValue} placeholder='year' value={project.year} />
                <input name='byline' onChange={updateValue} placeholder='short description for the frontpage' value={project.byline} />

                <div className='checks'>
                    <label htmlFor='html'>html</label>
                    <input name='html' id='html' type='checkbox' onChange={updateValue} defaultChecked={project.html}/>    

                    <label htmlFor='javascript'>javascript</label>
                    <input name='javascript' id='javascript' type='checkbox' onChange={updateValue} defaultChecked={project.javascript}/>    

                    <label htmlFor='userOrientedDesign'>user oriented design</label>
                    <input name='userOrientedDesign' id='userOrientedDesign' type='checkbox' onChange={updateValue} defaultChecked={project.userOrientedDesign}/>    

                    <label htmlFor='ux'>UX</label>
                    <input name='ux' id='ux' type='checkbox' onChange={updateValue} defaultChecked={project.ux}/>    
                </div>                

                <textarea onChange={updateValue} name='description' value={project.description} />


            {
                <div className='project-images'>
                    {
                        project.defaultImage &&
                        <div>
                            <img src={project.defaultImage} alt='default' />
                            <h3>Default</h3>
                        </div>

                    }
                    {
                        project.displayImage &&
                        <div>
                            <img src={project.displayImage} alt='default' />
                            <h3>Display</h3>
                        </div>
                    }
                    {
                        project.parallax &&
                        <div>
                            <img src={project.parallax} alt='default' />
                            <h3>Parallax</h3>
                        </div>
                    }
                </div>
            }
            
            <select name='imageName' onChange={ e => setImageName(e.target.value) }>
                <option name='defaultImage' value='defaultImage'>default image</option>
                <option name='displayImage' value='displayImage'>display image</option>
                <option name='parallax' value='parallax'>parallax image</option>
            </select>

            <label>
            <div className='button'>upload</div>

                <FileUploader
                    hidden
                    accept="image/*"
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={uploadStart}
                    onUploadError={uploadError}
                    onUploadSuccess={uploadSuccess}
                    onProgress={handleProgress}
                    />
                </label>

                <button type='submit'>save</button>

            </form>
            </>
            }
            <p>{status}</p>
        </main>
    )
}

export default Edit