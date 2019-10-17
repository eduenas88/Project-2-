// Read CSV Data
d3.csv("data/AustinDC.csv").then(function(data) {
    console.log(data);

    let dataSet = data.map(i => {
        return Object.values(i);
    });

    console.log(dataSet);

    $(document).ready(function() {
        $('#example').DataTable( {
            data: dataSet,
            columns: [
                { title: "Animal ID"},
                { title: "Name"},
                { title: "DateTime"},
                { title: "Date of Birth"},
                { title: "Outcome Type"},
                { title: "Outcome Subtype"},
                { title: "Animal Type"},
                { title: "Sex upon Outcome"},
                { title: "Age upon Outcome"},
                { title: "Breed"},
                { title: "Color"}
            ]
        } );
    } );
});


