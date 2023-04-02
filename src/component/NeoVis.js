import React, { Component } from "react";
import { useEffect, useState } from "react";
import NeoVis from "neovis.js/dist/neovis.js";

import { v1 as uuid } from "uuid";
// import { NeoVis } from "../../public/neovis";

export const getUUID = () => {
  return uuid().replace(/-/g, "");
};

export class NeoVisComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      id: getUUID(),
      trigger: false,
    };
    console.log("初始化...");
    console.log(props);
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }


  

  componentDidMount() {
    const search = this.props.question;
    const self = this;
    this.setState({
      loading: false,
      trigger: false,
    });
    var viz = self.draw();
    viz.render(search);
    this.triggetNext();
  }

  draw() {
    const config = {
      container_id: this.state.id,
      server_url: "bolt://44.203.51.181:7687",
      server_user: "neo4j",
      server_password: "s00pers3cret",
      // labels: {
      //   Character: {
      //     caption: "name",
      //     size: "pagerank",
      //     community: "community",
      //     title_properties: ["name", "pagerank"],
      //   },
      // },
      // relationships: {
      //   INTERACTS: {
      //     thickness: "weight",
      //     caption: false,
      //   },
      // },
      labels: {
        Compound: {
          caption: "name",
        },
        Disease: {
          caption: "name",
          //"sizeCypher": "defaultSizeCypher"
        },
        Pathogen: {
          caption: "name",
          //"sizeCypher": "defaultSizeCypher"
        },
        Gene: {
          caption: "name",
          //"sizeCypher": "defaultSizeCypher"
        },
        Anatomy: {
          caption: "name",
          //"sizeCypher": "defaultSizeCypher"
        },
        "Biological Process": {
          caption: "name",
          //"sizeCypher": "defaultSizeCypher"
        },
        "Cellular Component": {
          caption: "name",
        },
        "Molecular Function": {
          caption: "name",
        },
        Pathway: {
          caption: "name",
        },
        "Side Effect": {
          caption: "name",
        },
        Symptom: {
          caption: "name",
        },
        "Pharmacologic Class": {
          caption: "name",
        },
      },
      relationships: {},
      // initial_cypher: "MATCH (p:Pathogen) return p limit 10",
      //
      // MATCH (n:Gene) RETURN n LIMIT 25
    };
    var viz = new NeoVis(config);
    return viz;
  }

  render() {
    console.log("render.....");
    const { trigger, loading, id } = this.state;
    return (
      // 这里可以调大小吗？
      <div
        style={{
          width: "1000px",
          height: "600px",
          backgroundColor: "#eeeeee",
        }}
      >
        <div
          id={id}
          style={{
            width: "1000px",
            height: "600px",
          }}
        ></div>
        {!loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: 60,
              width: "1000px",
              height: "600px",
            }}
          >
            {/* {!trigger && (
              <button onClick={() => this.triggetNext()}>Search Again</button> //这里可以去掉这个按钮吗？
            )} */}
          </div>
        )}
      </div>
    );
  }
}
