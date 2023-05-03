(async function () {
    const response = await fetch("repository.json");
    const repositories = await response.json();

    let select = document.querySelector(".select");
    let input = document.querySelector(".input");
    let btn = document.querySelector(".btn");
    let nameDivs = document.querySelector(".nameDivs");
    let container = document.querySelector(".container");
    let allLinks = document.querySelector(".allLinks");
    let linksDiv = document.querySelector(".links");
    let x = document.querySelector(".x");

    const typeOptions = [...new Set(repositories.map(obj => obj.type).filter(Boolean))];

    typeOptions.forEach(options => {
        const option = document.createElement("option");
        option.innerText = options;
        option.value = options;
        select.appendChild(option);
    })

    let cross = () => {
        container.style.display = "flex";
        allLinks.style.display = "none";
    }

    let displayLink = (links) => {
        linksDiv.innerHTML = "";
        container.style.display = "none";
        allLinks.style.display = "block";
        if (links.type === "Project codes" || links.type === "Practice codes") {
            let aCode = document.createElement("a");
            aCode.innerHTML = `Code Link`;
            aCode.target = "blank";
            aCode.href = `https://github.com/muddussir-raza/${links.link}`;
            linksDiv.appendChild(aCode);
            
            let aDeploy = document.createElement("a");
            aDeploy.innerHTML = `Deploy Link`;
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

    let displayResult = (fullData) => {
        nameDivs.innerHTML = "";
        fullData.forEach((data) => {
            let nameDiv = document.createElement("div");
            nameDiv.innerHTML = data.name;
            nameDiv.className = "name";
            nameDiv.addEventListener("click", () => displayLink(data));
            nameDivs.appendChild(nameDiv);
        })
    }

    let filterRepositories = () => {
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

    select.addEventListener("change", filterRepositories);
    btn.addEventListener("click", filterRepositories);
    x.addEventListener("click", cross);
    filterRepositories();
    input.value = "";
})()
