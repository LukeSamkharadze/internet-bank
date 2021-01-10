const providers = [...document.getElementsByClassName("provider")];
const providerWrappers = [
    ...document.getElementsByClassName("provider-wrapper"),
];
const payments = [...document.getElementsByClassName("payment")];

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
}

main();
