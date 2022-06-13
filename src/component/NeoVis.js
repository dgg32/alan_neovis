import React, { Component } from "react";
import { useEffect, useState } from "react";
import NeoVis from "neovis.js/dist/neovis.js";

import { v1 as uuid } from "uuid";
// import { NeoVis } from "../../public/neovis";

export const getUUID = () => {
  return uuid().replace(/-/g, "");
};

/*
export function NeoVisComponent(props) {
  var loading = false;
  var trigger = false;
  var id = getUUID();

  useEffect(() => {
    // console.log("useEffect.....");
    // console.log(props);
    // const { steps } = props;
    // const search = steps.search.value;
    // if (!viz) {
    //   setViz(draw());
    // }
    // setTrigger(false);
    // setLoading(false);
    // viz.render(search);

    var config = {
      container_id: id,
      server_url: "bolt://44.203.51.181:7687",
      server_user: "neo4j",
      server_password: "s00pers3cret",
      labels: {
        Troll: {
          caption: "user_key",
          size: "pagerank",
          community: "community",
        },
      },
      relationships: {
        RETWEETS: {
          caption: false,
          thickness: "count",
        },
      },
      // initial_cypher: "MATCH (m) RETURN m",
    };

    const viz = new NeoVis(config); // eslint-disable-line no-undef
    const { steps } = props;
    const search = steps.search.value;
    viz.render(search);
    console.log("渲染完成");
  });

  function triggetNext() {
    trigger = true;
    props.triggerNextStep();
  }

  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        backgroundColor: "#eeeeee",
      }}
    >
      <div
        id={id}
        style={{
          width: "200px",
          height: "100px",
        }}
      ></div>
      {!loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: 60,
            width: "300px",
            height: "100px",
          }}
        >
          {!trigger && (
            <button onClick={() => triggetNext()}>Search Again</button>
          )}
        </div>
      )}
    </div>
  );
}

*/

export class NeoVisComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      id: getUUID(),
      trigger: false,
    };
    console.log("初始化...");
    this.triggetNext = this.triggetNext.bind(this);
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  componentDidMount() {
    console.log("componentDidMount.....");
    const { steps } = this.props;
    const search = steps.search.value;
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
          "caption": "name",                             
        },
        Disease: {
          "caption": "name",
          //"sizeCypher": "defaultSizeCypher"               
        },
        Pathogen: {
          "caption": "name",
          //"sizeCypher": "defaultSizeCypher"               
        },
        Gene: {
          "caption": "name",
          //"sizeCypher": "defaultSizeCypher"               
        },
        Anatomy: {
          "caption": "name",
          //"sizeCypher": "defaultSizeCypher"               
        },
        "Biological Process": {
          "caption": "name",
          //"sizeCypher": "defaultSizeCypher"               
        },
        "Cellular Component": {
          "caption": "name",
        },
        "Molecular Function": {
          "caption": "name",
        },
        "Pathway": {
          "caption": "name",
        },
        "Side Effect": {
          "caption": "name",
        },
        "Symptom": {
          "caption": "name",
        },
        "Pharmacologic Class": {
          "caption": "name",
        },

      },
      relationships: {
        
      },
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
