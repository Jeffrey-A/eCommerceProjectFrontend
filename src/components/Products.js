import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import '../css/products.css';
import Navigation from './Navigation';
import {Link} from 'react-router-dom';

class Products extends React.Component{

    constructor(props){
        super(props)

        this.state ={
            products: ""
        }
    }

    componentDidMount(){
        axios.get('https://e-ommerce-server.herokuapp.com/products')
        .then((res)=>{
            console.log(res)
            this.setState({products: res.data})
        })  
      }

    

    render(){
        let products =[]
        if(this.state.products.length){
            this.state.products.forEach((product)=>{
                products.push(
                <ProductCard key={product.key}
                    name = {product.name}
                    img ={product.img} 
                    description = {product.description}
                    price = {product.price}> 
                </ProductCard>)
            });

        }
        

        return(
            <div>
                <Navigation user={this.props.user} login={this.props.login} loginFunction = {this.props.loginFunction} />
                <div className="products-partent-container">
                    <h1 className="products-title">Available Products</h1>
                    <div className="products-container">
                        {products}
                    </div>
                </div>
            </div>
        )
    }
}

export default Products;