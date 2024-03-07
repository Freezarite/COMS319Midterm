function generateAboutMePage(jsonData) {
    var aboutMeContainer = document.getElementsByClassName("about-me-container")[0];

    var count = 1; // For swapping image and text orientation

    jsonData.parts.forEach((element, index) => { // Using index for position check

        let featuretteRow = document.createElement("div");
        featuretteRow.classList.add("row", "featurette");
        featuretteRow.style.marginBottom = "40px";

        let featuretteTextContainer = document.createElement("div");
        featuretteTextContainer.style.alignItems = "center";
        featuretteTextContainer.style.display = "flex";

        let featuretteImageContainer = document.createElement("div");

        if (count % 2 != 0) {
            featuretteTextContainer.classList.add("col-md-7", "order-md-2");
            featuretteImageContainer.classList.add("col-md-5", "order-md-1");
        } else {
            featuretteTextContainer.classList.add("col-md-7", "order-md-1");
            featuretteImageContainer.classList.add("col-md-5", "order-md-2");
        }

        count++;

        let textContainer = document.createElement("div");
        textContainer.classList.add("featurette-text-container");

        let textContainerTitle = document.createElement("h1");
        textContainerTitle.innerHTML = element["title"];
        textContainerTitle.style.setProperty('font-weight', 'bold', 'important');
        textContainerTitle.classList.add("featurette-heading", "fw-normal", "lh-1");

        let paragraph = document.createElement("p");
        paragraph.classList.add("lead");
        paragraph.innerHTML = "<br>" + element["desc"];

        textContainer.appendChild(textContainerTitle);
        textContainer.appendChild(paragraph);

        if (!(Object.keys(element.body).length === 0 && element.body.constructor === Object)) {
            let container = createTableInContainer(element.body.columns);
            textContainer.appendChild(container);
        }

        featuretteTextContainer.appendChild(textContainer);

        let image = document.createElement("img");
        image.src = element["image-src"];
        image.alt = element["image-alt"];
        image.width = 500;
        image.height = 500;

        featuretteImageContainer.appendChild(image);

        featuretteRow.appendChild(featuretteTextContainer);
        featuretteRow.appendChild(featuretteImageContainer);

        aboutMeContainer.appendChild(featuretteRow);

        // Append a divider after each featurette except the last one
        if (index < jsonData.parts.length - 1) {
            let divider = document.createElement("hr");
            divider.classList.add("featurette-divider");
            divider.style.marginBottom = "40px";
            aboutMeContainer.appendChild(divider); // Append the divider to the container, not the row
        }
    });
}

function createTableInContainer(tableData) {
    let container = document.createElement("div");
    container.classList.add("container");

    let row1 = document.createElement("div");
    row1.classList.add("row");

    tableData.forEach(column => {
        let colContainer = document.createElement("div");
        colContainer.classList.add("col");

        let paragraph = document.createElement("p");
        paragraph.classList.add("grid-header-p");
        paragraph.innerHTML = column[0];

        colContainer.appendChild(paragraph);
        row1.appendChild(colContainer);
    });

    container.appendChild(row1);

    let row2 = document.createElement("div");
    row2.classList.add("row");

    tableData.forEach(column => {
        let colContainer = document.createElement("div");
        colContainer.classList.add("col");

        let ul = document.createElement("ul");

        for(let i = 1; i < column.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = column[i];

            ul.appendChild(li);
        }

        colContainer.appendChild(ul);
        row2.appendChild(colContainer);
    })

    container.appendChild(row2);

    return container;
}



fetch('../data/about-me.json')
    .then(response => response.json())
    .then(data => {
        generateAboutMePage(data);
    })
    .catch(error => console.error('Error fetching JSON:', error));
