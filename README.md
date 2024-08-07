# Project Title

## Overview

My App is used for looking at flow rate and water level of river at guage site.

### Problem

HydroMap is a website people can look into flow rate of river at specific site that also showing preciptation, air temperature, and water level. People can look for guage site by specific site name or by river and the website will give suggest guage site. Also, people can upload their own data with specific intruction of content in the file and create their own flow guage site that can share to people. In addition, this website should also able to predict flow rate for the upcoming time based on previous year data. All the results will be showing to user in a graph with people's choice.

### User Profile

environment monitor people and worker:

    -check previous year flow rate, water level, air temperature and preciptation at specific guage site.
    -create/upload their own guage file/graph and able to share to other people.
    -predict flow rate for a specific site based on previous year, so that user can based on the prediction to decide if they are going to the site to collect data or not.

### Features

- As a user, I want to find a flow rate of a specific site by entering the site name and date
- As a user, I want to look at results as a graph instead of numbers
- As a user, I want to able to find guage sites from a specific river so that I can choose one of the guage site to invest.
- As a user, I want to able to predict when should I go sampling the site based on previous year flow rate data to minimize the time I go out for nothing.
- As a logged in user, I want to able to create my own guaging site following instruction and able to share with my other workers.
- As a logged in user, I want to be able to see all the site I checked.

## Implementation

### Tech Stack

- React
- MySQL
- Express
  -Retool?(convert csv file to json file)

- Client libraries:

  - react
  - react-router
  - axios
    -JWT/Auth for storing users

- Server libraries:
  - knex
  - express
  - Auth? for storing users

### APIs

NO external API. The data I will using will from https://rivers.alberta.ca/ or https://wateroffice.ec.gc.ca/search/historical_e.html and https://acis.alberta.ca/township-data-viewer.jsp or https://acis.alberta.ca/weather-data-viewer.jsp

### Sitemap

-home page
-register
-login
-find a river
-find a site
-upload page
-predict page
-result page

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

user: id, email, password

site: id, site name, station ID, longitude, latitude, flow rate, water level, air temperature, preciptation

creating new guage site: id, user_id, site_id, site name, station ID, longitude, latitude, flow rate, water level, air temperature, preciptation

### Endpoints

**GET /sites**

- Get /sites

Parameters:
-user type in a site name

Response:

```
[
    {
        "id": 1,
        "name": "Oldman River near Lethbridge",
        "station_id": "05AD007",
    },
    ...
]
```

**GET /sites/:siteID/flowRates**
**GET /rivers/:riverId/sites**
**POST /users/register**

- Add a user account

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/sites/:siteID**
**PUT /users/sites/:siteID/flowRates**

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

## Roadmap

- Create client

  - react project with routes

- Create server
  - express project with routing
- create a json data file for two sites with one week data

- Create migrations

- Create seeds with sample json data

- Deploy client and server projects so all commits will be reflected in production

- Feature: find a site

  - show a site user typed in
  - Store given location in sessionStorage
  - Create Get /sites endpoint

- Feature: View site flow rate by selected date range

  - Create GET /sites/:siteId

- Feature: find a river

  - show all sites on the river for selection
  - Store given location in sessionStorage
  - Create Get /rivers/:riverId/sites endpoint

- Feature: Home page

- Feature: Create account

  - Implement register page + form
  - Create POST /users/register endpoint

- Feature: Login

  - Implement login page + form
  - Create POST /users/login endpoint

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in local storage, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves

Expand to more guage sites and rivers
Making prediction better based on more variables
