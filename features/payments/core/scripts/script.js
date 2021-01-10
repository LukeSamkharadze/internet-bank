const providers = [...document.getElementsByClassName("provider")];

const providerWrappers = [
    ...document.getElementsByClassName("provider-wrapper"),
];
const payments = [...document.getElementsByClassName("payment")];

const searchInput = document.getElementById("find-provider-input");

const providerCompanies = new Map();

providerWrappers.forEach((providerWrapper) => {
    const names = providerWrapper.querySelectorAll("p");
    providerCompanies.set(providerWrapper.dataset.index, [...names]);
});

function search(text) {
    text = text.toLowerCase();
    for (prov of providerCompanies) {
        let index = prov[0];
        let listOfCompanies = prov[1];
        let count = 0;
        listOfCompanies.forEach((providerName) => {
            providerName = providerName.innerText.toLowerCase();
            if (providerName.indexOf(text) > -1) {
                providerWrappers[index].style.display = "";
                count++;
            }
        });
        if (!count) {
            providerWrappers[index].style.display = "none";
        }
    }
}

// adds commas after every provider copmany's name. (except last one)
function addCommas() {
    providers.forEach((provider) => {
        let providerNames = [...provider.querySelectorAll("p")];
        providerNames.forEach((p, index) => {
            if (providerNames.length != index + 1) {
                p.innerText += ",";
            }
        });
    });
}

// moving between providers.
function changeProvider(selectedProviderWrapper) {
    if (selectedProviderWrapper.classList.contains("selected-provider")) {
        return;
    }

    document
        .querySelector(".selected-provider")
        .classList.remove("selected-provider");

    document
        .querySelector(".current-payment")
        .classList.remove("current-payment");

    selectedProviderWrapper.classList.add("selected-provider");

    let index = selectedProviderWrapper.dataset.index;
    payments[index].classList.add("current-payment");
}

function main() {
    addCommas();

    providerWrappers.forEach((providerWrapper) => {
        providerWrapper.addEventListener("click", () => {
            changeProvider(providerWrapper);
        });
    });

    searchInput.addEventListener("keydown", () => {
        setTimeout(() => {
            search(searchInput.value);
        }, 0);
    });
}

main();
