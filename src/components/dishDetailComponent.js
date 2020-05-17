import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

function RenderDish({dish}) {
    if (dish != null) {
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle className="h4">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } 
    else {
        return(
            <div></div>
        );
    }
}

function RenderComments({comments}) {
    if(comments != null){
        const com = comments.map((com) => {
        return(
            <div className="list-unstyled" key={com.id}>
                <li>{com.comment}</li><br/>
                    <li>-- {com.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(com.date)))}</li><br/>
            </div>
        )})
        return(
            <div>
                <div className="h4">
                    Comment
                </div>
                <div className="m-1">
                    {com}
                </div> 
            </div>
        )
        }
    else{
        return(
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-6 m-1">
                        <Card>
                            <CardBody>
                                <RenderComments comments={props.dish.comments} />
                            </CardBody>
                        </Card> 
                    </div>
                </div>
            </div>
        )
    } 
    else {
        return(
            <div></div>
        )
    }
}


export default DishDetail;