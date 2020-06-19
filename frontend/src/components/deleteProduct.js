import React,{Component} from 'react';

import {colorPrimary, colorfont, colorSecondary} from './../colors'

export default class DeletePost extends Component{
    state = this.props
    
    render(){
        return(
        <div style={styles.container}> 
            <h2 style={{textAlign:'center'}}>Delete Product</h2>
            <label style={styles.label}>Title</label>
            <input type="text" placeholder="Enter title"></input>
            <label style={styles.label}>Description</label>
            <input type="text" placeholder="Enter description"></input>
            <label style={styles.label}>Image source</label>
            <input type="text" placeholder="Enter image src"></input>
            <button style={styles.btn}>Delete</button>
        </div>)
    }

}

const styles = {
    container:{
        width:'350px',
        display:'flex',
        flexDirection:'column'
    },
    label:{
        marginTop:'5px'
    },
    btn:{
        backgroundColor:colorPrimary,
        marginTop:'10px'
    }
}