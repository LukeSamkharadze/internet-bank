const providers = [...document.getElementsByClassName("provider")];
const providerWrappers = [
    ...document.getElementsByClassName("provider-wrapper"),
];

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

    selectedProviderWrapper.classList.add("selected-provider");
}

function main() {
    addCommas();

    providerWrappers.forEach((providerWrapper) => {
        providerWrapper.addEventListener("click", () => {
            changeProvider(providerWrapper);
        });
    });
}

main();
