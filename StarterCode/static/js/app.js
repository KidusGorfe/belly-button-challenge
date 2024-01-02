// Fetch the JSON data and call the init function
d3.json("samples.json").then(data => {
    init(data);
});

function init(data) {
    // Populate the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    data.names.forEach(name => {
        dropdownMenu.append("option").text(name).property("value", name);
    });

    // Render the initial charts and metadata
    const firstSample = data.names[0];
    renderCharts(firstSample, data);
}

function renderCharts(sample, data) {
    var selectedSample = data.samples.filter(s => s.id === sample)[0];
    
    // Bar chart
    var barData = [{
        x: selectedSample.sample_values.slice(0, 10).reverse(),
        y: selectedSample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        text: selectedSample.otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h'
    }];

    var barLayout = {
        title: "Top 10 OTUs Found",
        margin: { t: 30, l: 150 }
    };

    Plotly.newPlot('bar', barData, barLayout);
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    d3.json("samples.json").then(data => {
        renderCharts(newSample, data);
    });
}
