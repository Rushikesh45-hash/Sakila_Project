import express from "express";
import http from "http";
import cors from "cors";
import connection from "./db.js";

const app = express();
const server = http.createServer(app);

app.use(cors());//we used here CORS to just allow frontend to send request 
app.use(express.json());


app.get("/api/country-addresses", (req, res) => {
    const sql = `
        SELECT
            country.country,
            COUNT(address.address_id) AS addresscount
        FROM
            country INNER JOIN city
            ON country.country_id = city.country_id
            INNER JOIN address
            ON city.city_id = address.city_id
        GROUP BY
            country.country
        ORDER BY
            addresscount;
    `;

    connection.execute(sql, (error, result) => {
        if (error) {
            console.log("Query failed:", error.message);
            res.status(500).json({
                message: "Failed to fetch country addresses"
            });
            return;
        }

        console.log(result);
        res.json(result);
        console.log("Country addresses fetched successfully");
    });
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});