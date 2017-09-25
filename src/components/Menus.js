import React, {Component}  from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import '../stylesheets/ui.scss'
import '../stylesheets/js-offcanvas.css'
import 'bootstrap'
import DestaquePrimario from './DestaquePrimario'
import ConvertNumbers from './ConvertNumbers'

class Menus extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            currentItems: 0,
			updateCart: [],
			subtotalOne: 0,
			subtotalTwo: 0,
			menuState: true
        };
		this.updateCart = this.updateCart.bind(this);
    	this.updateNumber = this.updateNumber.bind(this);
    	this.deleteItem = this.deleteItem.bind(this);
    	this.subtotalOne = this.subtotalOne.bind(this);
    	this.subtotalTwo = this.subtotalTwo.bind(this);
    	this.menuState = this.menuState.bind(this);
    }
	updateCart(cartItem) {
		var newArrayItems = this.state.updateCart;
		newArrayItems.push([cartItem]);
		this.setState({ cartItems: newArrayItems });
		this.subtotalOne(newArrayItems[newArrayItems.length-1][0][5]);
		this.subtotalTwo(newArrayItems[newArrayItems.length-1][0][2]);
		this.updateNumber(this.state.currentItems++)
		localStorage.setItem('cartItemsPerUser',newArrayItems);
	}
	updateNumber(currentItems) {
		this.setState({currentItems: this.state.currentItems});
		if (this.state.currentItems > 0) {
			document.querySelector('.currentitems').style.display = 'block';
		}
		else {
			document.querySelector('.currentitems').style.display = 'none';
		}
	}
	deleteItem(key) {
		this.updateNumber(this.state.currentItems--) 
		var newArrayItems = this.state.updateCart;
		this.subtotalOne(-(newArrayItems[key][0][5]));
		this.subtotalTwo(-(newArrayItems[key][0][2]));
		newArrayItems.splice(key, 1);
		this.setState({ cartItems: newArrayItems })
		this.updateNumber(this.state.currentItems - 2)
		localStorage.setItem('cartItemsPerUser',newArrayItems);
	}
	subtotalOne(itemPrice) {
		var newSubtotalOne = this.state.subtotalOne + itemPrice;
		this.setState({subtotalOne: newSubtotalOne})
	}
	subtotalTwo(itemPrice) {
		var newSubtotalTwo = this.state.subtotalTwo + itemPrice;
		this.setState({subtotalTwo: newSubtotalTwo})
	}
	menuState() {
		if(this.state.menuState) {
			$('.dropdown').on({
		        "show.bs.dropdown": function() {
		            $(this).data('closable', false);
		        },
		        "click": function(event) {
		            $(this).data('closable', false);
		        },
		        "hide.bs.dropdown": function(event) {
		        	var temp = $(this).data('closable');
		            $(this).data('closable', true);
		            return temp;
		        },
		        
    		});

		//this.setState({menuState: false})

		}
    }
	
	render() {
		//{this.addCart.bind(this,([element.product.id,...]))}
		//id,name,price,image,installments,installmentValue

		const list = this.state.updateCart.map((element, key) => {
			return (
				<li key={key}>
					<a href="javascript:void(0)" onClick={this.deleteItem.bind(this,key)}>
					<div className="close">X</div>
					<div className="col-xs-3 norightpadding">
						<div className="imgThumb"><img src={element[0][3]} /></div>
					</div>
					<div className="col-xs-9 noleftpadding">
						<div className="text">{element[0][1]}</div>
						<div className="installments">{element[0][4]}x R$ {ConvertNumbers.formatMoney((element[0][5]), 2, ',', '.')}</div>
						<div className="incash-text">R$ {ConvertNumbers.formatMoney((element[0][2]), 2, ',', '.')} à vista</div>
					</div>
					</a>
				</li>
			)
		})
		return(
			<div>
				<section className="bg-primary">
					<div className="container">	     
					    <nav className="navbar navbar-default">
							  <div className="container-fluid">
							  	 <Link to="/" className="navbar-brand" title="Buscapé App" alt="Buscapé App"></Link>
							    <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
							      <ul className="nav navbar-nav navbar-right">
							      	
							        <li className="dropdown" >
						          		<a href="/"  onClick={this.menuState} className="dropdown-toggle js-offcanvas-trigger navbar-toggle collapsed" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
					 						<span className="icon-bar"></span>
					 						<span className="icon-bar"></span>
					 						<span className="icon-bar"></span>
					 						<div className="currentitems">{this.state.currentItems}</div>
					 					</a>
					 				<ul className="dropdown-menu">
									{list}
									<li className="subtotal noborder">subtotal<hr/></li>
									<li className="subtotalone noborder">10x <span>R$ {ConvertNumbers.formatMoney((this.state.subtotalOne), 2, ',', '.')}</span></li>
									<li className="subtotalonetwo noborder">ou <span>R$ {ConvertNumbers.formatMoney((this.state.subtotalTwo), 2, ',', '.')}</span> à vista</li>
									</ul>
							        </li>
							      </ul>
							    </div>
							</div>
						</nav>
					</div>
				</section>
				<DestaquePrimario 
					updateCart={this.updateCart}
				/>
			</div>

		)
	}
}

export default Menus;
