function getPlots(id) {

    // Get samples data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then (sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
    
        // Get the top 10 otu IDs and reverse them
        var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        
        // Format the otu IDs for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
        
        // Get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        
        // Create bar plot data variable
        var data = [trace];

        // Create layout variable for the plots
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // Create the bar plot
        Plotly.newPlot("bar", data, layout);
        
        // Set bubble plot data
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        // Set bubble plot layout
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // Create bubble plot data variable 
        var data1 = [trace1];

        // Create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
    
    });
}  

// Data function
function getDemoInfo(id) {
    
    // Get samples data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
        
        // Get demographic panel metadata
        var metadata = data.metadata;

        console.log(metadata)

        // Filter by ID
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        
        // Select the demographic panel
        var demographicInfo = d3.select("#sample-metadata");
        
        // Reset the demographic panel for new data
        demographicInfo.html("");

        // Get the demographic data for a specific ID and append it to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// Change event function
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// Initialization function
function init() {
    
    // Select the dropdown menu 
    var dropdown = d3.select("#selDataset");

    // Get samples data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
        console.log(data)

        // Append data to the drop down menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Get plot and demographic panel data
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();