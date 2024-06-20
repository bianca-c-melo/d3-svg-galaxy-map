import * as d3 from "d3";

const PersonMarker = (selection, props) => {
  const { radius, name } = props;

  function handleMouseOver() {
    d3.select(this)
      .transition()
      .duration(200)
      .attr("transform", "translate(0, -5)");
  }

  function handleMouseOut() {
    d3.select(this)
      .transition()
      .duration(200)
      .attr("transform", "translate(0, 0)");
  }

  selection
    .append("circle")
    .attr("r", radius)
    .attr("fill", "purple")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
};

export default PersonMarker;
