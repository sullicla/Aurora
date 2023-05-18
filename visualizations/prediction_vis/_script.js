var data = [
  {"year":2016,    "revenue": 95},
  {"year": 2017,    "revenue": 131},
  {"year": 2018,    "revenue": 172.80},
  {"year": 2019,    "revenue": 214.40},
  {"year": 2020,    "revenue": 267.60},
  {"year": 2021,    "revenue": 342.60},
  {"year": 2022,    "revenue": 414.90},
  {"year": 2023,    "revenue": 525.60},
  {"year": 2024,    "revenue": 617},
  {"year": 2025,    "revenue": 707.90},
  {"year": 2026,    "revenue": 796},
  {"year": 2027,    "revenue": 881.80}
]

var ƒ = d3.f

var sel = d3.select('body').html('')
var c = d3.conventions({
  parentSel: sel,
  totalWidth: sel.node().offsetWidth,
  height: 400,
  margin: {left: 50, right: 50, top: 30, bottom: 30}
})

c.svg.append('rect').at({width: c.width, height: c.height, opacity: 0})

c.x.domain([2016, 2027])
c.y.domain([0, 1000])

c.xAxis.ticks(4).tickFormat(d3.format("d"));
c.yAxis.ticks(5).tickFormat(d3.format("$,.0f"));

var area = d3.area().x(ƒ('year', c.x)).y0(ƒ('revenue', c.y)).y1(c.height)
var line = d3.area().x(ƒ('year', c.x)).y(ƒ('revenue', c.y))

var clipRect = c.svg
  .append('clipPath#clip')
  .append('rect')
  .at({x: c.x(2016), y: 0, width: c.x(2020) - c.x(2016), height: c.height});

var correctSel = c.svg.append('g').attr('clip-path', 'url(#clip)')

correctSel.append('path.area').datum(data).at({d: area})
correctSel.append('path.line').datum(data).at({d: line})

yourDataSel = c.svg.append('path.your-line')

c.drawAxis();

c.svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - c.margin.left)
  .attr("x", 0 - (c.height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("font-family", "Arial")
  .text("In billion USD (US $)");

c.svg.append('text')
  .attr('transform', 'translate(' + (c.width/2) + ',' + (c.height + c.margin.bottom - 5) + ')')
  .style('text-anchor', 'middle')
  .style('font-family', 'Arial')
  .style('font-size', '14px')
  .text('Year');

yourData = data
  .map(function(d){ return {year: d.year, revenue: d.revenue, defined: 0} })
  .filter(function(d){
    if (d.year == 2020) d.defined = true
    return d.year >= 2020
  })

var completed = false

var drag = d3.drag()
  .on('drag', function(){
    var pos = d3.mouse(this)
    var year = clamp(2016, 2027, c.x.invert(pos[0]))
    var revenue;

    if (year === 2020) {
      revenue = data.find(d => d.year === 2020).revenue; // restrict revenue to actual value for 2020
    } else {
      revenue = clamp(0, c.y.domain()[1], c.y.invert(pos[1])); // allow revenue values for other years to be changed
    }

    yourData.forEach(function(d){
      if (Math.abs(d.year - year) < .5){
        if (d.year === 2020) {
          d.revenue = data.find(d => d.year === 2020).revenue; // keep revenue fixed for 2020
        } else {
          d.revenue = revenue;
        }
        d.defined = true
      }
    })

    yourDataSel.at({d: line.defined(ƒ('defined'))(yourData)})

    if (!completed && d3.mean(yourData, ƒ('defined')) == 1){
      completed = true
      clipRect.transition().duration(1000).attr('width', c.x(2027))
    }
  })

c.svg.call(drag)



function clamp(a, b, c){ return Math.max(a, Math.min(b, c)) }