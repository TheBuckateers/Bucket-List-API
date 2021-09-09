# Bucket-List-API

**Authors**
Mark Thanadabouth, Full-Stack Developer / Italy
Clarissa Pamonicutt, Full-Stack Developer / Japan
Willem Jacobs, Software Developer/ Iceland
Heather Bisgaard, Full Stack Software Engineer / Iceland

- **Version**: 1.0.0
- [**Deployed Site**](https://bucket-list-travel.netlify.app/)
- [**Backend Server**](https://bucket-list-travel-api.herokuapp.com/)

## Overview

Backend server for Bucketlist App - 301 Project
Handles all the API calls from the frontend site along with the database calls. Formats the data and returns it in nice packages.

## Getting Started

- Clone from repo. [Link to Repo](https://github.com/TheBuckateers/Bucket-List-API)
- `npm install` or `npm i` to install dependencies.
- `.env` file needed see sample.env for values.

## Architecture

- Node.JS
- Express
- dotenv
- cors
- Axios
- Mongo Atlas
- API - Country - http://restcountries.eu - No key required. Get all key info on countries. End points are: /country /country/code/:code (code being the 2 or 3 ISOAlpha Country Code) /country/full/:name /country/partial/:name /country/pics/:name
- API - Food - http://www.themealdb.com - Used to get recipes and pics of meals based on the region that is used from the Country API. Not 100% but has about 28 regions that work. No API key needed. Endpoints are /food /food/areas /food/areas/:area /food/categories /food/:id
- API - Travel Advisory - https://www.travel-advisory.info Used to get travel advisories published using the 2 or 3 digit ISOAlpha Country Code. No API Key needed. End points are: /advisory /advisory/:id
- API - Country Environment Information - http://api.airvisual.com API Key needed. Used to get Air Quality Index and weather information for the country. The paid API gives you lots more information. End point is: /enviro used lat & lon in the URL to get the nearest city to those locations that monitors.
- API - Photos for Country - http://www.unsplash.com - Key needed. Searches API for name of country and get 10 pictures returned. Not 100% but works OK. End point is: /country/pics/:name
- Mongo Atlas used to store the information of the country the user selected which includes the users email as a string, country object, country code, notes and the assigned ID number from mongdo. User can add a country to their bucket an view those countries. Can also delete. A GET, POST, and DELETE verbs are used. The GET is done by the email of the signed in user to the front end to display the list. The DELETE uses the record ID number to know which country to remove from the database. The POST is a regular post the object to the DB. A SEED and a CLEAR endpoint are also available but use with care. They were more for testing purposes.

**Endpoint Routes**
4 routes are available being /country /food /advisory /enviro

Within these routes you have:
/country to get a list of all countries. Returns an array of multiple objects.
/country/code/{country 2 or 3 digit iso Code} to show just 1 country by its code. Returns 1 object
/country/full/{full name of the country} to search for a country by the full name. Returns 1 object
/country/partial/{part of the country name} to find city by a partial name match. Returns array with 1 or more object.
/country/pics/{name of country} to get pics from unsplash that has a category of that country name specified.

/food will get you 1 random recipe. Returns an array with 1 object.
/food/areas returns a list of country areas. Returns an array of objects.
/food/areas/{area name} returns a list of recipes for that area. Areas are American, Italian, Mexican, etc.
/food/categories returns a list of food types Returns an array of objects.
/food/{recipe ID number} returns a specific recipe.

/advisory returns a all advisories for countries tracked. Returns on object with multiple objects.
/advisory/{country 2 or 3 digit ISO code} returns advisory for the country selected. Returns an object with the object searched for.

/enviro returns the environment data being air quality and weather for the nearest city from the given lat & lon provided in the url.

## Change Log

08.31.2021 (V1.0.0) - First release.

9.8.2021 (September 8, 2021) - Deployed to Heroku/Netlify and MongoDB Atlas URL saved in .env.

## Credit and Collaborations

No collaborations from others on this project.
