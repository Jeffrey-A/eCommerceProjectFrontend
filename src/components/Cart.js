import React from 'react';
import axios from 'axios';
import CartProduct from './CartProduct';
import TakeMoney from './Stripe';
import Navigation from './Navigation';

class Cart extends React.Component{

    constructor(props){
        super(props)

        

        this.state ={
            products:this.props.products,
            total:0
        }
    }

    componentDidMount(){
        // axios.get('https://e-ommerce-server.herokuapp.com/products')
        // .then((res)=>{
        //     console.log(res)
        //     let total = 0;
        //     res.data.forEach((product)=>{
        //        total+= Number(product.price)
        //     })
        //     this.setState({products: res.data, total:total.toFixed(2)})
        // })
        if(this.state.products){
            let total =0;
            this.state.products.forEach((product)=>{
                total+= product.price;
            })

            this.setState({total:total})

            
        }
       

       
    }

    getProducts = () =>{
        let temporal = [];
        
        this.state.products.forEach((product)=>{
            temporal.push(<CartProduct img={product.img} name={product.name} price={product.price} />)
            
        })

        

        return temporal;
      
    }

    render(){
        if(!this.state.products.length){
            return(
             <div>
                <Navigation />
                <h1 className="cart-container-title">Shopping Cart</h1>
                <h2 className="cart-info">There are not products in your shopping cart yet.</h2>
            </div>
            )
        }
        
        return(
            <div>
                
                <Navigation />
                <div className="cart-container">
                    <h1 className="cart-container-title">Shopping Cart</h1>
                    <div>{this.getProducts()}</div>

                    <div className="total-container">
                        <p><span>Total: </span> <span className="product-cart-price">{`${this.state.total}$`}</span></p>
                        <TakeMoney amount={this.state.total*100}/>
                    </div>
                </div>
            </div>
        )
    }


}

export default Cart;