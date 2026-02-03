

const populate = async (value, currency) => {
    try {
        const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_cw1WDU9TL2RMf0z2dnwbpEzQx9o3KOFYqNvyssvC&base_currency=${currency}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data); 

        if (!data.data) {
            alert("API error. Check console.");
            return;
        }

        document.querySelector(".output").style.display = "block";

        let rows = "";
        for (let key in data.data) {
            rows += `
                <tr>
                    <td>${key}</td>
                    <td>${data.data[key].code}</td>
                    <td>${(data.data[key].value * value).toFixed(2)}</td>
                </tr>
            `;
        }

        document.querySelector("#table-body").innerHTML = rows;

    } catch (error) {
        console.error("Fetch error:", error);
        alert("Something went wronG.");
    }
};


document.querySelector(".btn").addEventListener("click", () => {
    const value = parseInt(document.querySelector("#num").value);
    const currency = document.querySelector("#currency-select").value;

    if (!value || !currency) {
        alert("Please enter amount and select currency");
        return;
    }

    populate(value, currency);
});
