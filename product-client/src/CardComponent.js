import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
export class CardComponent extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <CardImg
            top
            width="100%"
            src={this.props.imgurl}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle style={{ fontWeight: "500", fontSize: "1.5em" }}>
              {this.props.name}
            </CardTitle>
            <CardSubtitle>Id:{this.props.id}</CardSubtitle>
            <CardText>{this.props.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
