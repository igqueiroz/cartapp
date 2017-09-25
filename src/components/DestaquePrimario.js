import React, {Component}  from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import ConvertNumbers from './ConvertNumbers'
import GetList from '../services/GetList'

class DestaquePrimario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            loadGallery: true 
        };
    }
    
    componentDidMount() {
        GetList.getItems().then(({ data })=> {
            this.setState({ 
              array: data.items
            });
        })
          .catch((err)=> {})
        
	}
    addCart(id,name,price,image,installments,installmentValue) {
        this.props.updateCart(id,price,image,installments,installmentValue);

    }
    componentDidUpdate(){
        if(this.state.loadGallery) {
            $('.thumbs li').click(function() {
                $(this).parent('.thumbs').find('li').removeClass('active');
                $(this).addClass('active');
                var cloneImg = $(this).find('img').attr('src');
                $(this).parents('.shadow').find('.big-image img').attr('src',cloneImg);
            })            
            this.setState({loadGallery: false})
        }
    }
	render() {
    function checkExists(imageUrl,callback) {
        var img = new Image();
        img.onerror = function() {
            callback(false);
        };
        img.onload = function() {
            callback(true);
        };
        img.src = imageUrl;
    }
    const list = this.state.array.map((element, key) => {
        
        function testImages(imagesTested,firstImageGallery) {
            if(imagesTested != undefined) {
                if (firstImageGallery) {
                    return (
                    

                    <li className="active"> <img src={ imagesTested } alt={ element.product.name + ' - ' + element.product.id }  /></li>
                    )
                }
                else {
                   
                    return (
                    <li> <img src={ imagesTested } alt={ element.product.name + ' - ' + element.product.id }  /></li>
                    )
                }
            }
        }
        function imagesMount(e) {
            checkExists(e,function(a){if(!a) {
                imagesMount(key)}
            })
            return(
               <li> <img src='{ e }' alt={ element.product.name + ' - ' + element.product.id } title={ element.product.name + ' - ' + element.product.id } /></li>
            )
        }

        function testMainImage(imageTested) {
            if(imageTested != undefined) {
                return (
                        <img src={ imageTested } alt={ element.product.id + ' - ' + element.product.id } title={ element.product.name + ' - ' + element.product.id } />
                    )
            }
        }
        return (
                
                <li className="shadow" key={key}>
                    <div className="col-xs-2">
                        <ul className="thumbs">
                            {testImages(element.product.images[0],true)}
                            {testImages(element.product.images[1],false)}
                            {testImages(element.product.images[2],false)}
                            {testImages(element.product.images[3],false)}
                            

                            
                            
                        </ul>
                    </div>
                    <div className="col-xs-4 ">
                        <div className="big-image">
                            {testMainImage(element.product.images[0])}
                        </div>

                    </div>
                    <div className="col-sm-6 norightpadding fixmargintop">
                        <div className="col-xs-12">
                            <h4>{ element.product.name }</h4>
                        </div>
                        <div className="col-xs-6 norightpadding">
                            <div className="installments">
                                <div className="text">{ element.product.price.installments }x R$ <span>{ConvertNumbers.formatMoney((element.product.price.installmentValue), 2, ',', '.')}</span></div>
                                <div className="incash-text">ou <span>R$ {ConvertNumbers.formatMoney((element.product.price.value), 2, ',', '.')}</span> à vista</div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <button value="Adicionar ao carrinho" onClick={this.addCart.bind(this,([element.product.id,element.product.name,element.product.price.value,element.product.images[0],element.product.price.installments,element.product.price.installmentValue]))} title={ element.product.id }>Adicionar ao carrinho ></button>
                        </div>

                    </div>
                </li>
            )

    });
        return (
            <section className="destaques">
              <div className="container">
                <ul className="row"> 
                        {list}
                    </ul>
               </div>
               
            </section>  

        )
    }

}


export default DestaquePrimario;

//{imagesMount(element.product.images[1])}
//element.product.id,element.product.price.value,element.product.images[0],element.product.price.installments,element.product.price.installmentValue