import React,{Component} from 'react';

import {colorPrimary, colorfont, colorSecondary} from './../colors'

export default class CreateProduct extends Component{
    state = {title:'',desc:'',imgsrc:'',id:''};

    createProduct = (e) =>{
        e.preventDefault();
        this.props.createProduct(this.state);
    }
    
    render(){
        return(
        <div style={styles.container}>
            <h2 style={{textAlign:'center'}}>Create product</h2>
            <label style={styles.label}>Title</label>
            <input type="text" onChange={(e)=>{this.setState({title:e.target.value})}} placeholder="Enter title"></input>
            
            <label style={styles.label}>Image source</label>
            <input type="text" onChange={(e)=>{this.setState({imgsrc:e.target.value})}} placeholder="Enter image src"></input>
            
            <img src={this.state.imgsrc} style={{maxWidth:'100px',maxHeight:'100px'}}></img>

            <label style={styles.label}>Description</label>
            <input type="text" onChange={(e)=>{this.setState({desc:e.target.value})}} placeholder="Enter description"></input>
            <button style={styles.btn} onClick={this.createProduct}>Create</button>
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