function createAllProjectCards(jsonData) {
    let projectsContainer = document.getElementById("projects-container");
    let containerToBeFilled = document.createElement("div");
    containerToBeFilled.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3");

    jsonData.projects.forEach(element => {
        //create general container
        let colContainer = document.createElement("div");
        colContainer.classList.add("col");

        let cardShadow = document.createElement("div");
        cardShadow.classList.add("card", "shadow-sm");

        //creating and appending image part
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        let imageElement = document.createElement("img");
        imageElement.style.width = "100%";
        imageElement.src = element["img-src"];
        imageElement.alt = element["img-alt"];

        imageContainer.appendChild(imageElement);
        cardShadow.appendChild(imageContainer);

        //creating and appending descriptions
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let cardTitle = document.createElement("h2");
        cardTitle.innerHTML = element["name"];
        cardTitle.classList.add("card-text");

        let badgeList = document.createElement("div");
        badgeList.classList.add("tag-list");

        element["tools"].forEach(tool => {
            let toolContainer = document.createElement("div");
            toolContainer.classList.add("badge");
            toolContainer.innerHTML = tool;

            badgeList.appendChild(toolContainer);
        });

        let restOfCard = document.createElement("div");
        restOfCard.classList.add("d-flex", "justify-content-between", "align-items-center");

        let projectDescriptionContainer = document.createElement("div");
        projectDescriptionContainer.classList.add("project-short-description");

        let projectDescriptionP = document.createElement("p");
        projectDescriptionP.classList.add("short-description-p");
        projectDescriptionP.innerHTML = element["desc"];

        projectDescriptionContainer.appendChild(projectDescriptionP);
        restOfCard.appendChild(projectDescriptionContainer);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(badgeList);
        cardBody.appendChild(restOfCard);

        cardShadow.appendChild(cardBody);

        colContainer.appendChild(cardShadow);

        containerToBeFilled.appendChild(colContainer);
    });

    projectsContainer.appendChild(containerToBeFilled);
}

const baseUrl = window.location.href.split('/').slice(0, -1).join('/'); // Get the base URL without the file name
const profileJsonUrl = `${baseUrl}/data/projects.json`; // Construct the profile.json URL

// Fetch the header data, then position the dot
fetch(profileJsonUrl)
    .then(response => response.json())
    .then(data => {
        createAllProjectCards(data);
    })
    .catch(error => console.error('Error fetching JSON:', error));