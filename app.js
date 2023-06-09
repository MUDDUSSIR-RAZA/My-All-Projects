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
  });

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

  const typeOptions = [
    ...new Set(repositories.map((obj) => obj.type).filter(Boolean)),
  ];

  typeOptions.forEach((options) => {
    const option = document.createElement("option");
    option.innerText = options;
    option.value = options;
    select.appendChild(option);
  });

  let showContainer = () => {
    container.style.display = "flex";
    allLinks.style.display = "none";
    notFound.style.display = "none";
  };
  let showAllLink = () => {
    container.style.display = "none";
    allLinks.style.display = "block";
    notFound.style.display = "none";
  };
  let showNotFound = () => {
    container.style.display = "none";
    allLinks.style.display = "none";
    notFound.style.display = "flex";
  };

  //This code sets the display of container, allLinks, and notFound elements to their initial values.
  let cross = () => {
    showContainer();
  };

  let addLinkDiv = (addLink) => {
    let aCode = document.createElement("a");
    aCode.innerHTML = `Code Link`;
    aCode.target = "blank";
    aCode.href = `https://github.com/muddussir-raza/${addLink}`;
    linksDiv.appendChild(aCode);
  };

  //This code takes a repository object and generates HTML for links to the corresponding GitHub code and web pages.
  let displayLink = (links) => {
    linksDiv.innerHTML = "";
    showAllLink();
    if (links.type === "Project codes" || links.type === "Practice codes") {
      addLinkDiv(links.link);
      let aDeploy = document.createElement("a");
      aDeploy.innerHTML = `Web Link`;
      aDeploy.target = "blank";
      aDeploy.href = `https://muddussir-raza.github.io/${links.link}`;
      linksDiv.appendChild(aDeploy);
    } else if (links.type === "Working") {
      showNotFound();
      notFound.innerHTML = `<h1>On Working!</h1>`;
    } else if (links.type === "without deploy") {
      addLinkDiv(links.link);
      let aDeploy = document.createElement("a");
      aDeploy.innerHTML = `<h3>Don't want to show</h3><br><h5>Due to some reasons</h5>`;
      linksDiv.appendChild(aDeploy);
    } else if (links.type === "Next JS Apps") {
      addLinkDiv(links.link);
      let aDeploy = document.createElement("a");
      aDeploy.innerHTML = `Web Link`;
      aDeploy.target = "blank";
      aDeploy.href = `${links.vercel}`;
      linksDiv.appendChild(aDeploy);
    } else {
      addLinkDiv(links.link);
    }
  };

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
      });
    } else {
      showNotFound();
      notFound.innerHTML = `<h1>Result Not Found!</h1>`;
    }
  };

  let filteredRepositories;

  //This code filters the "repositories" array based on the selected "type" option and the search input value.
  let filterRepositories = () => {
    showContainer();
    notFound.innerHTML = ``;

    filteredRepositories = [];
    filteredRepositories = repositories;

    if (select.value !== "all") {
      filteredRepositories = filteredRepositories.filter((repository) => {
        return repository.type.includes(select.value);
      });
    }
    if (input.value !== "") {
      filteredRepositories = filteredRepositories.filter((repository) => {
        return repository.name
          .toLowerCase()
          .includes(input.value.toLowerCase());
      });
    }
    displayResult(filteredRepositories);
  };

  //This code listens for the "Enter" keypress event and calls the filterRepositories() function when it occurs.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      filterRepositories();
    }
  });

  document.addEventListener("keyup", () => {
    if (input.value === "") {
      filterRepositories();
    }
  });

  // Define the input and datalist elements
  let datalist = document.querySelector("#searchSuggestions");
  // This function generates search suggestions based on the user's input
  let generateSearchSuggestions = (filteredRepositories) => {
    // Get the value of the input field and convert it to lowercase
    let searchValue = input.value.toLowerCase();
    // Filter the repositories array to get matching names
    let matchingNames = filteredRepositories.filter((repository) =>
      repository.name.toLowerCase().includes(searchValue)
    );
    datalist.innerHTML = "";
    // Add new suggestions based on the matchingNames array
    matchingNames.forEach((repository) => {
      let option = document.createElement("option");
      option.value = repository.name;
      datalist.appendChild(option);
    });
  };

  input.addEventListener("input", () => {
    generateSearchSuggestions(filteredRepositories);
  });

  //This code listens for changes on the select element and calls the filterRepositories() function.
  select.addEventListener("change", () => {
    input.value = "";
    filterRepositories();
  });

  btn.addEventListener("click", filterRepositories);
  x.addEventListener("click", cross);
  filterRepositories();
  input.value = "";
})();
