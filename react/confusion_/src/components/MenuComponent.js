import React from 'react';
import { Card, CardImg, CardImgOverlay,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({dish}){
    
    return(
        <Card >
            <Link to={`/menu/${dish.id}`} >
                <CardImg object width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                <CardImgOverlay>
                    <CardTitle> {dish.name} </CardTitle>
                </CardImgOverlay>
             </Link>
        </Card>
       
    );
}

// function component in different way
const Menu = (props)=>{
  
                    // we use the dish properties to fill the tags properties 
        const Menu= props.dishes.dishes.map((dish)=>{
            return(
                <div  key={dish.id} className="col-12 col-md-5 m-1">
                  <RenderMenuItem dish={dish}/>
                </div>
            );
        });
       
        console.log('Menu component render is invoked'); 
         // Media is reactstrap object 
        // one of its properties is list a boolean property

          if (props.dishes.isLoading){
            return(
                <div className="container" >
                    <div className="row" >
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if (props.dishes.errMsg){
            return (
                <div className="container" >
                    <div className="row" >
                        <h4>{props.dishes.errMsg} </h4>
                    </div>
                </div>
            );
        }
        else 
            return(
                 <div className='container'>
                     <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem> <Link to='/home'>Home</Link> </BreadcrumbItem>
                            <BreadcrumbItem active > Menu </BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3> Menu </h3>
                            <hr/>
                        </div>
                     </div>
                     <div className='row'>
                        {Menu}
                     </div>
                </div>
    );

}

export default Menu;


