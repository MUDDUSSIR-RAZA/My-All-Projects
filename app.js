(async function () {
    // Use the Fetch API to fetch a JSON file called "repository.json".
    const response = await fetch("repository.json");

    // Parse the response as JSON and assign it to the "repositories" variable.
    const repositories = await response.json();

    // Sort the "repositories" array using a comparator function that compares the "name" property of each object.
    repositories.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    })

    //This code initializes variables by selecting DOM elements with the corresponding class names.
    let select = document.querySelector(".select");
    let input = document.querySelector(".input");
    let btn = document.querySelector(".btn");
    let nameDivs = document.querySelector(".nameDivs");
    let container = document.querySelector(".container");
    let allLinks = document.querySelector(".allLinks");
    let linksDiv = document.querySelector(".links");
    let x = document.querySelector(".x");
    let notFound = document.querySelector(".notFound");

    const typeOptions = [...new Set(repositories.map(obj => obj.type).filter(Boolean))];

    typeOptions.forEach(options => {
        const option = document.createElement("option");
        option.innerText = options;
        option.value = options;
        select.appendChild(option);
    })

    //This code sets the display of container, allLinks, and notFound elements to their initial values.
    let cross = () => {
        container.style.display = "flex";
        allLinks.style.display = "none";
        notFound.style.display = "none";
    }

    //This code takes a repository object and generates HTML for links to the corresponding GitHub code and web pages.
    let displayLink = (links) => {
        linksDiv.innerHTML = "";
        container.style.display = "none";
        allLinks.style.display = "block";
        notFound.style.display = "none";
        if (links.type === "Project codes" || links.type === "Practice codes") {
            let aCode = document.createElement("a");
            aCode.innerHTML = `Code Link`;
            aCode.target = "blank";
            aCode.href = `https://github.com/muddussir-raza/${links.link}`;
            linksDiv.appendChild(aCode);

            let aDeploy = document.createElement("a");
            aDeploy.innerHTML = `Web Link`;
            aDeploy.target = "blank";
            aDeploy.href = `https://muddussir-raza.github.io/${links.link}`;
            linksDiv.appendChild(aDeploy);
        } else {
            let aCode = document.createElement("a");
            aCode.innerHTML = `Code Link`;
            aCode.target = "blank";
            aCode.href = `https://github.com/muddussir-raza/${links.link}`;
            linksDiv.appendChild(aCode);
        }
    }

    //This code takes an array of repository objects, generates HTML for each repository name.
    let displayResult = (fullData) => {
        nameDivs.innerHTML = "";
        if (fullData.length > 0) {
            fullData.forEach((data) => {
                let nameDiv = document.createElement("div");
                nameDiv.innerHTML = data.name;
                nameDiv.className = "name";
                nameDiv.addEventListener("click", () => displayLink(data));
                nameDivs.appendChild(nameDiv);
            })
        } else {
            container.style.display = "none";
            allLinks.style.display = "none";
            notFound.style.display = "flex";
        }
    }

    //This code filters the "repositories" array based on the selected "type" option and the search input value.
    let filterRepositories = () => {
        container.style.display = "flex";
        allLinks.style.display = "none";
        notFound.style.display = "none";

        let filteredRepositories = [];
        filteredRepositories = repositories;

        if (select.value !== "all") {
            filteredRepositories = filteredRepositories.filter(repository => {
                return repository.type.includes(select.value);
            })
        }
        if (input.value !== "") {
            filteredRepositories = filteredRepositories.filter(repository => {
                return repository.name.toLowerCase().includes(input.value.toLowerCase());
            });
        }

        displayResult(filteredRepositories);
    }

    //This code listens for the "Enter" keypress event and calls the filterRepositories() function when it occurs.
    let numPad = event => {
        if (event.key === "Enter") {
            filterRepositories();
        }
    }
    document.addEventListener("keydown", numPad);

    //Attaches event listeners to the select dropdown, button, and close icon and calls the filterRepositories function and clears the input field.
    select.addEventListener("change", filterRepositories);
    btn.addEventListener("click", filterRepositories);
    x.addEventListener("click", cross);
    filterRepositories();
    input.value = "";
})()
