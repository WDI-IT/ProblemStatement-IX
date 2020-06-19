import React from 'react';
import {colorPrimary, colorfont, colorSecondary} from './colors';
import Product from './components/product';
import CreateProduct from './components/createProduct';
import EditProduct from './components/editProduct';
import SearchProduct from './components/SearchFile';
import './App.css';

export default class App extends React.Component{
  
  state = {show:'list',products:[],data:{},id:'',url:'https://obscure-retreat-53927.herokuapp.com/'}

  fetchProduct= async ()=>{
    try{
      const result = await fetch(this.state.url+'getproduct');
      const response = await result.json();
      let data=[];
      
      if(response.success){
        data = response.products.map(product => {
          return(
            {id:product._id,
             title:product.title,
             imgsrc:product.imgsrc,
             desc:product.desc
            })
        });
      }

      this.setState({products:data}); 
    }catch(err){
      alert('Error : '+err)
    }
      
  }

  createProduct = async (product) =>{
    try{
      let response = await fetch(this.state.url+'createproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      let result = await response.json();
      if(!result){alert('Error')}
      else{
        if(result.success){
            let tempProds = this.state.products;
            let id = new Date().getTime();
            product.id = result.result._id;
            tempProds.push(product);
            this.setState({products:tempProds,show:'list'});  
        }
      }
    }catch(err){
      alert('error : '+err)
    }
  }

  openEditDelete = (data,ops)=>{
    if(ops=='edit'){
      this.setState({data:data,show:'edit'});
    }else if(ops=='delete'){
      let id = data;
      let tempData = this.state.products.filter(product=>{
        if(product.id===id){
          return false;
        }
        return true;
      })
      if(this.state.products.length===1)
        this.setState({products:[],show:'list'});
      else
        this.setState({products:tempData,show:'list'});

    }
  }


  editProduct = async (editedProduct) =>{

    let id = editedProduct.id;

    try{
      const response = await fetch(this.state.url+'editproduct',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedProduct)
      });

      const result = await response.json();

      if(result.success){
        
        let edited = this.state.products.map(product=>{
          if(product.id!==id){
            return product;
          }
          else{
            return editedProduct;
          }
        });

        this.setState({products:edited,show:'list'});
      }else{
        this.setState({show:'list'});
      }

    }catch(err){alert("Error : "+err)}
  }

  returnProduct=()=>{
    return this.state.products.map(
      product =>{
        return <Product key={product.id} openEditDelete={this.openEditDelete} data={{title:product.title,desc:product.desc,imgsrc:product.imgsrc,id:product.id}}/>
      }
    );
  }
  
  componentDidMount=()=>{
    this.fetchProduct();
  }

  show = () =>{
      if(this.state.show==='list'){
        
        return <>
           <h2 style={{}}>Product List</h2>
          {this.returnProduct()}
        </>;
      }
      else if(this.state.show==='create'){
        
        return <CreateProduct createProduct={this.createProduct}/>
      }
      else if(this.state.show==='edit'){
        
        return <EditProduct {...this.state.data} editProduct={this.editProduct}/>
      }else if(this.state.show==='search'){
        
        return <SearchProduct {...this.state.data} editProduct={this.editProduct} openEditDelete={this.openEditDelete}></SearchProduct>
      }
  }

  searchById=(e)=>{
    e.preventDefault();
    
    let id = this.state.id;
    
    let res = this.state.products.filter(product=>{
      if(id===product.id){
        return true;
      }
      return false;
    });

    if(res.length!==1){
      alert('Product is not found.');
    }else{
      this.setState({show:'search',data:res[0]});
    }
  
  }

  searchBar= () =>{
    return ((this.state.show==='list' || this.state.show==='search')?  
      <div style={{marginLeft:"auto"}}>
        <input style={{marginRight:'10px',width:'400px'}} onChange={(e)=>{this.setState({id:e.target.value})}} placeholder='Enter Product id'/>
        <button style={styles.btn} title="You can edit or delete product by searching id." onClick={this.searchById}>Search</button>
      </div>:null);
  }

  
  navMenu =()=>{
    return(<>
       <div style={{fontSize:'20px',fontWeight:'600'}}>Products</div>
            <div style={styles.buttongrp}>   
                <button 
                className={this.state.show==='list'?'activebtn':''}
                onClick={(e)=>{
                  e.preventDefault();
                  this.setState({show:'list'});
                }}>Show List</button>

                <button
                className={this.state.show==='create'?'activebtn':''}
                onClick={(e)=>{
                  e.preventDefault();
                  this.setState({show:'create'});
                }}>Create Product</button>
          </div>
    </>);
  }
  
  render(){
    return(
      <div style={styles.container}>
        
        <div style={styles.navbar}>
           {this.navMenu()}
        </div>

        <div style={styles.searchBar}>
            {this.searchBar()}
        </div>
    
        <div style={styles.wrapper}>
          {this.show()}
        </div>

      </div>
    )
  }
}

const styles = {
  container:{
    display:'flex',
    flexDirection:'column'
  },
  navbar:{
    height:'50px',
    backgroundColor:colorPrimary,
    color:colorfont,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:'10px'
  },
  menu:{
    display:'flex',
    padding:'10px',
    paddingTop:'0px',
    flexDirection:'row',
    backgroundColor:colorPrimary
  },
  buttongrp:{
    display:'flex',
    marginLeft:'auto',
    marginRight:'10px'
  },
  wrapper:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    
  },
  searchBar:{
      display:'flex',
      alignItems:'center'
      ,marginTop:'10px'
  },
  btn:{
    backgroundColor:colorPrimary,
    marginRight:'10px'
}
}