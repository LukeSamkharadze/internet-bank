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
    //  tavidan yvelas order iqneba 1
    providerWrappers.forEach((providerWrapper) => {
        providerWrapper.style.order = "1";
    });
    text = text.toLowerCase();
    let maxcount = 0;
    let bestMatchIndex;
    let isCorrect = false; // tu bevri aso emtxveva mara 1 aso mainc ari ucxo, mashin ar vtvli.
    for (prov of providerCompanies) {
        const arrayOfProviders = prov[1]; // mapshi 1 indexze ari p tagebis array.
        arrayOfProviders.forEach((providerName) => {
            providerName = providerName.innerText.toLowerCase();
            let count = 0;
            if (providerName.includes(text)) {
                isCorrect = true;
            }
            for (let i = 0; i < text.length; i++) {
                if (text[i] == providerName[i]) {
                    count++;
                } else {
                    continue;
                }
            }
            if (count > maxcount) {
                maxcount = count;
                bestMatchIndex = [...prov[0]];
                bestMatchWord = providerName;
            }
        });
    }

    if (maxcount >= 1 && isCorrect) {
        console.log(bestMatchIndex);
        providerWrappers[bestMatchIndex].style.order = "-1";
    } else {
        providerWrappers.forEach((providerWrapper) => {
            providerWrapper.style.order = "1";
        });
    }
}

//  aq iwyeba dzveli kodi

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
