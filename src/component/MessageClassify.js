import React, { Component } from "react";
import { NeoVisComponent } from "./NeoVis";
import { TextComponent } from "./TextComponent";
export class MessageClassify extends Component{
    constructor(props) {
        super(props);
        this.triggetNext = this.triggetNext.bind(this);
        const { steps } = this.props;
        const search = steps.search.value; 
        if(search.indexOf("Hello") !== -1){
            this.state = {
                loading: true,
                trigger: false,
                showTextDisplay:"",
                showImageDisplay:"none",
              };
        }else{
            this.state = {
                loading: true,
                trigger: false,
                showTextDisplay:"none",
                showImageDisplay:"",
              };
        }
        this.triggetNext();
      }
      

    triggetNext() {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
        });
    }

    render(){
        const { steps } = this.props;
        const search = steps.search.value; 
        const  showTextDisplay = this.state.showTextDisplay;
        if(showTextDisplay === ""){
            return ( <TextComponent triggerNextStep={this.triggetNext} question={search}/>);
        }else{
            return (  <NeoVisComponent triggerNextStep={this.triggetNext} question={search}/>);
        }
    }
    
}