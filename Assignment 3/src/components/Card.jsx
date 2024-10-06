import React from 'react'

const Card = (props) => {
    console.log("Props =====> ", props)
  return (
    <>
       	<div className="product-card">
		<div className="badge">Hot</div>
		<div className="product-tumb">
			<img src={props.details.image} alt="" />
		</div>
		<div className="product-details">
			<span className="product-catagory">{props.details.category}</span>
			<h4><a href="">{props.details.name}</a></h4>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
			<div className="product-bottom-details">
				<div className="product-price"><small>{props.details.previous_price}</small>{props.details.new_price}</div>
				<div className="product-links">
					<a href=""><i className="fa fa-heart"></i></a>
					<a href=""><i className="fa fa-shopping-cart"></i></a>
				</div>
			</div>
		</div>
	</div>
    </>
  )
}

export default Card