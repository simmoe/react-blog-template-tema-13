import React, {useState} from 'react'
import {List, ListItem, ListItemIcon, ListItemText, Button, Drawer, makeStyles} from '@material-ui/core'
import { FaCode } from "react-icons/fa"


import { Link } from '@reach/router'


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  })

const HeaderMaterial = () => {
    const classes = useStyles()
    const [left, setLeft] = useState(false)

    const sideList = side => (
        <div
          className={classes.list}
          role="presentation"
          onClick={ () => setLeft(false)}
        >
          <List>
          <Link to='/'>
              <ListItem button>
                <ListItemIcon><FaCode /></ListItemIcon>
                <ListItemText primary='hjem' />                
              </ListItem>              
          </Link>
              
          </List>
        </div>
      )

    return(
        <div>
            <Button onClick={ () => setLeft(true)}>Open Left</Button>
            <Drawer open={left} onClose={() => setLeft(false)}>
            {sideList('left')}
            </Drawer>
        </div>  
    )
}

export default HeaderMaterial