const loadbtn = document.getElementById("loadbtn");
const normaltable = document.getElementById("normaltable");
const numbertable = document.getElementById("numbertable");
const tables = document.getElementById("tables");

loadbtn.addEventListener("click", function () {
    // console.log("Load button clicked");
    normaltable.innerHTML = "";
    numbertable.innerHTML = "";

    fetch("http://localhost:5000/api/country-addresses")
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .then(data => {
            const countrydata = data;
            const size = countrydata.length;

            for (let i = 0; i < size; i++) {
                const country = countrydata[i].country;
                const addresscount = countrydata[i].addresscount;
                // Table 1
                const normalrow = document.createElement("tr");//here we just create row inside table (empty row)
                const countrycell = document.createElement("td");//here also same we create table data but empty at next line with textContent we fill that
                countrycell.textContent = country;
                const addresscell = document.createElement("td");
                addresscell.textContent = addresscount;

                normalrow.appendChild(countrycell);//here we append first table data in that new created row
                normalrow.appendChild(addresscell);

                // Table 2
                const numberedrow = document.createElement("tr");
                const numbercell = document.createElement("td");
                numbercell.textContent = i + 1;
                const numberedcountrycell = document.createElement("td");
                numberedcountrycell.textContent = country;
                const numberedaddresscell = document.createElement("td");
                numberedaddresscell.textContent = addresscount;

                numberedrow.appendChild(numbercell);
                numberedrow.appendChild(numberedcountrycell);
                numberedrow.appendChild(numberedaddresscell);

                // Apply alternating colors
                if ((i + 1) % 2 === 0) {
                    normalrow.classList.add("even-row");//here we just add class to that row which we created above and in css we have defined that class with background color
                    numberedrow.classList.add("even-row");
                } else {
                    normalrow.classList.add("odd-row");
                    numberedrow.classList.add("odd-row");
                }

                normaltable.appendChild(normalrow);
                numbertable.appendChild(numberedrow);
            }

            //remove the hidden class from the tables container to make it visible
            tables.hidden = false;
        })
        .catch(error => {
            console.log("Error:", error);
        });
});
