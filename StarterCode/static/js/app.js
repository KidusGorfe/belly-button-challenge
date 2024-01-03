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

    // Render the initial charts and metadata for the first sample
    const firstSample = data.names[0];
    renderCharts(firstSample, data);
    renderMetadata(firstSample, data);
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

    // Bubble chart
    var bubbleData = [{
        x: selectedSample.otu_ids,
        y: selectedSample.sample_values,
        text: selectedSample.otu_labels,
        mode: 'markers',
        marker: {
            size: selectedSample.sample_values,
            color: selectedSample.otu_ids,
            colorscale: "Earth"
        }
    }];

    var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" },
        margin: { t: 30 },
        hovermode: "closest"
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
}

function renderMetadata(sample, data) {
    var metadata = data.metadata.filter(meta => meta.id == sample)[0];
    var metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html(""); // Clear any existing metadata

    Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    d3.json("samples.json").then(data => {
        renderCharts(newSample, data);
        renderMetadata(newSample, data);
    });
}
