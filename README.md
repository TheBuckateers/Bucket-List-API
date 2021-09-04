# Bucket-List-API

**Authors**
Mark Thanadabouth, Full-Stack Developer / Italy
Clarissa Pamonicutt, Full-Stack Developer / Japan
Willem Jacobs, Software Developer/Astronaut / Iceland
Heather Bisgaard, Full Stack Software Engineer / Iceland

- **Version**: 1.0.0
- [**Deployed Site**](https://bucket-list-travel.netlify.app/)
- [**Backend Server**](https://bucket-list-travel-api.herokuapp.com/)

## Overview

Backend server for Bucketlist App - 301 Project

## Getting Started

- Clone from repo. [Link to Repo](https://github.com/Willem-Jacobs/can-do-books-api)
- `npm install` or `npm i` to install dependencies.
- `.env` file needed see sample.env for values.

## Architecture

- Node.JS
- Express
- dotenv
- cors
- Axios

**Endpoint Routes**
3 routes are available being /country /food /advisory /enviro

Within these routes you have:
/country to get a list of all countries. Returns an array of multiple objects.
/country/code/{country 2 digit iso Code} to show just 1 country by its code. Returns 1 object
/country/full/{full name of the country} to search for a country by the full name. Returns 1 object
/country/partial/{part of the country name} to find city by a partial name match. Returns array with 1 or more object.

/food will get you 1 random recipe. Returns an array with 1 object.
/food/areas returns a list of country areas. Returns an array of objects.
/food/categories returns a list of food types Returns an array of objects.

/advisory returns a all advisories for countries tracked. Returns on object with multiple objects. \*\*
/advisory/{country 2 digit ISO code} returns advisory for the country selected. Returns an object with the object searched for. \*\*

/enviro

## Change Log

08.31.2021 (V1.0.0) - First release.

9.2.2021 9:14pm - Deployed to Heroku/Netlify and MongoDB Atlas URL saved in .env.

## Credit and Collaborations

No collaborations from others on this project.

### Feature Basic setup of route endpoints

**Name of feature:** Endpoint creation

**Estimate of time needed to complete:** 2 hour

**Start time:** 05:00pm

**Finish time:** 07:00pm

**Actual time needed to complete:** 2 hours.
