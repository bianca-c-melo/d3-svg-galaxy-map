import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./styles.css";
import PersonMarker from "./PersonMarker";
import { distributePoints } from "./utils";

const InteractiveMap = ({ people }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 4])
      .on("zoom", (event) => {
        svg.select("g").attr("transform", event.transform);
      });

    svg.call(zoom);

    svg.selectAll("*").remove();

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("style", "stop-color:#410089;stop-opacity:1");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("style", "stop-color:#2d0036;stop-opacity:1");

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "url(#gradient)");

    const markersGroup = svg.append("g");

    const centerX = 900;
    const centerY = 450;
    const maxRadius = 300;
    const numCircles = 10;

    for (let i = 1; i <= numCircles; i++) {
      markersGroup
        .append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", (i / numCircles) * maxRadius)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("fill", "none");
    }

    const galaxyPoints = distributePoints(
      people,
      numCircles,
      centerX,
      centerY,
      maxRadius
    );

    markersGroup
      .selectAll("g.person")
      .data(galaxyPoints)
      .enter()
      .append("g")
      .attr("class", "person")
      .each(function (d) {
        d3.select(this)
          .attr("transform", `translate(${d.x}, ${d.y})`)
          .call(PersonMarker, { radius: d.radius, name: d.name });
      })
      .on("mouseover", function () {
        d3.select(this).raise().attr("cursor", "pointer");
      });
  }, [people]);

  return (
    <svg ref={svgRef} className="svg">
      <g></g>
    </svg>
  );
};

export default InteractiveMap;
