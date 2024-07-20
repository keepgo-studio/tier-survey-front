"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SharedUtils } from "@shared";
import { colorArr, orderTier, TierTypes } from "./utils";


type DistributionItem = {
    tier: TierTypes;
    cnt: number;
    stackedCnt: number;
    end: number;
};

export default function TierDistribution({
  data,
  onFocus
}: {
  data: Record<TierTypes, number>;
  onFocus?: (tier: TierTypes | null) => void;
}) {
  const MIN_HEIGHT = 12;

  const divRef = useRef(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const tooltopTextRef = useRef(null);

  const keys = [...orderTier];

  let total = 0;
  const statckData: DistributionItem[] = keys.map(_tier => ({
    tier: _tier,
    cnt: data[_tier],
    stackedCnt: total,
    end: total += data[_tier]
  }))

  const draw = () => {
    if (!svgRef.current || !divRef.current) return;

    const svgElem = svgRef.current as HTMLElement,
          svg = d3.select(svgElem);

    svg.selectAll("*").remove();

    const parent = divRef.current as HTMLElement,
          parentWidth = parent.offsetWidth;

    const width = parentWidth,
          height = SharedUtils.parseMinMax(Math.floor(parentWidth * 0.05), MIN_HEIGHT, 48),
          margin = Math.floor(parentWidth * 0.006),
          borderRadius = Math.floor(parentWidth * 0.004);

    svgElem.setAttribute("width", width.toString());
    svgElem.setAttribute("height", height.toString());
    parent.style.borderRadius = borderRadius + "px";

    const x = d3.scaleLinear().rangeRound([0, width]),
          y = d3.scaleBand().rangeRound([0, height]).paddingInner(10),
          z = d3.scaleOrdinal().range(colorArr);

    const innerWidth = width - margin * 2,
          innerHeight = height - margin * 2;

    const computeCnt = (cnt: number) => Math.floor((innerWidth * (cnt / total)));
    const getWidth = (item: DistributionItem) => {
      let gap = 0;
      const idx = keys.findIndex(_t => _t === item.tier);
      const nextIdx = keys.findIndex((_t, _idx) => _idx > idx && data[_t] > 0);

      if (nextIdx !== -1) {
        gap = 2;
      }
      return Math.max(0, computeCnt(item.cnt) - gap);
    }

    x.domain([0, total]).nice();
    y.domain("tier");
    z.domain(keys);

    const g = svg.append("g").attr("transform", `translate(${margin}, ${margin})`)
    const tooltip = d3.select(tooltipRef.current);

    g.append("g")
      .selectAll("g")
      .data(statckData)
      .enter()
      .append("rect")
      .attr("x", d => computeCnt(d.stackedCnt))
      .attr("rx", borderRadius)
      .attr("ry", borderRadius)
      .attr("width", d => getWidth(d))
      .attr("height", innerHeight)
      .attr("fill", d => z(d.tier) as string)
      .on("mouseover", (_, d) => {
        (tooltopTextRef.current! as HTMLElement).textContent = `${d.tier} - ${(d.cnt / total * 100).toFixed(1)}%`;
        
        tooltip
          .style("left", margin + computeCnt(d.stackedCnt) + getWidth(d) / 2 + "px");

        tooltip
          .style("opacity", 1)
          .style("top", -margin  + "px");

        if (onFocus) onFocus(d.tier);
      })
      .on("mouseleave", () => {
        tooltip
          .style("opacity", 0)
          .style("top", 0 + "px");

          if (onFocus) onFocus(null);
      })
  };

  useEffect(() => {
    const reset = () => {
      if (!svgRef.current) return;

      const svgElem = svgRef.current as HTMLElement;

      svgElem.setAttribute("width", "0");
      svgElem.setAttribute("height", MIN_HEIGHT.toString());
    }

    const debounceDraw = SharedUtils.debounce(draw);
    const debounceReset = SharedUtils.debounce(reset, 100);

    window.addEventListener("resize", debounceReset);
    window.addEventListener("resize", debounceDraw);
    draw();

    () => {
      window.removeEventListener("resize", debounceReset);
      window.removeEventListener("resize", debounceDraw);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={divRef} className="w-full border-border border relative">
      <svg ref={svgRef} />

      <div className="absolute opacity-0 top-0 bg-black py-[6px] px-3 text-[11px] -translate-y-full -translate-x-1/2 rounded-md duration-150 transition-[top,opacity]" ref={tooltipRef}>
        <i className="block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-black" />
        <span ref={tooltopTextRef} className="text-nowrap"></span>
      </div>
    </div>
  );
}
