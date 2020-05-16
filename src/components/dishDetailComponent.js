import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

class DishDetail extends Component {

    constructor(props){
        super(props);

        this.state = {}
    }

    renderComments(comments){
        if(comments != null){
            const com = comments.map((co) => {
            return(
                <div className="list-unstyled">
                    <li>{co.comment}</li><br/>
                    <li>-- {co.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(co.date)))}</li><br/>
                </div>
            )
            });
            return(
                <div>
                    {com}
                </div>
            )
            }
        else{
            return(
                <div></div>
            )
            }
    }

    render(){
        if(this.props.dish != null){
        return(
            <div className="row">
                <div className="col-12 m-1">
                    <Card>
                        <CardBody>
                            <CardTitle className="h3">Comments</CardTitle>
                            <CardText>{this.renderComments(this.props.dish.comments)}</CardText>
                        </CardBody>
                    </Card> 
                </div>
            </div>
        );}
        else{
            return(
                <div></div>
            );
        }
    };
}

export default DishDetail;