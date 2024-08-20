# Project Title

## Overview

My App is used for looking at flow rate and water level of river at guage site.

### Problem

HydroMap is a website people can look into flow rate of river at specific site that also showing preciptation, air temperature, and water level. People can look for guage site by specific site name or by river and the website will give suggest guage site. Also, people can upload their own data with specific intruction of content in the file and create their own flow guage site that can share to people. In addition, this website should also able to predict flow rate for the upcoming time based on previous year data. All the results will be showing to user in a graph with people's choice.

### User Profile

Environment monitor people and worker:

    -check previous year flow rate, water level, air temperature and preciptation at specific guage site without setting up account.
    -create/upload their own guage file/graph and able to share to other people (need to signup an account for use upload function).

### Features

- As a user, I want to find a flow rate of a specific site by entering the site name and date
- As a user, I want to look at results as a graph instead of numbers
- As a user, I want to able to find guage sites from a specific river so that I can choose one of the guage site to invest.
- As a logged in user, I want to able to create my own guaging site following instruction and able to share with my other workers.
- As a logged in user, I want to be able to see all the sites I saved.

## Implementation

### Tech Stack

- React
- MySQL2
- Express
- node

- Client libraries:

  - react
  - react-router
  - axios
    -JWT/Auth for storing users
    -chart.js
    -export-from-json
    -html2canvas
    -jspdf

- Server libraries:
  - knex
  - express
  - Auth for storing users
  - csvtojson
  - multer
  - path

### APIs

- NO external API. The data used in the web are from https://wateroffice.ec.gc.ca/search/historical_e.html and https://climate.weather.gc.ca/historical_data/search_historic_data_e.html

### Sitemap

#### Home page

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/homePage.png)

#### Signup

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/signup.png)

#### Login

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/login.png)

#### Profile

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/profile-without-upload.png)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/profile-after-upload.png)

- Profile page would have user specific site listed here. For a new user would have nothing listed as showing in the first screenshot, after uploaded sites, would have listed as second screenshot.

#### Find by river (non-user specfic and user specfic)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/find-by-river.png)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/without-user-find-river.png)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/user-specfic-find-river.png)

- User has both default data and uploded data for their search while non-user only has default data for use.

#### Find a site (non-user specfic and user specfic)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/find-by-site.png)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/without-user-find-site.png)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/user-specfic-find-sites.png)

- User has both default data and uploded data for their search while non-user only has default data for use.

#### Selected by river page

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/select-by-river.png)

#### Selected by site page

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/search.png)

- User can enter start date and end date for the site and choose the data they want to see.

#### Result page for drscharge only and all data

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/discharge-results-chart.png)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/alldata-results-chart.png)

The figure and data can be downloaded. The result page also would have average, min and max of parameter be selected for the peroid of time.

#### Upload page (user specfic)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/upload.png)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/upload2.png)

### Help section in upload page

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/help.png)

- Click help button on upload page would give guide of how csv file is structured and where to enter what.

#### Predict page (still in building)

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/predict-in-building.png)

- Potential want to have prediction working based on previous year discharge and weather data. Still working on it and will be nice to have in future.

### Mockups

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/mockup-1.png)
![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/mockup-2.png)
![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/mockup-3.png)
![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/mockup-4.png)
![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/mockup-5.png)

### Data

![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/proposal-image/sql-diagram.png)

### Endpoints

**GET /sites and GET /users/:userName/sites**

- Get /sites and GET /users/:userName/sites

Parameters:

- user click find by a site
- logined user click find by a site (need send token to the back end for authorization)

Response:

```
[
  {
    "id": 1,
    "site_name": "LETHBRIDGE NORTHERN IRRIGATION DISTRICT CANAL ABOVE OLDMAN FLUME",
    "site_id": "05AB019",
    "river": "Oldman",
    "city_id": 3033875,
    "user_id": null
  },
    ...
]
```

**GET /rivers and GET /users/:userName/rivers**

- Get /rivers and GET /users/:userName/rivers

Parameters:

- user click find by river
- logined user click find by river (need send token to the back end for authorization)

Response:

```
[
  {
    "id": 1,
    "site_name": "LETHBRIDGE NORTHERN IRRIGATION DISTRICT CANAL ABOVE OLDMAN FLUME",
    "site_id": "05AB019",
    "river": "Oldman",
    "city_id": 3033875,
    "user_id": null
  },
    ...
]
```

**GET /rivers/:riverName and GET /users/:userName/rivers/:riverName**

- Get /rivers/:riverName and GET /users/:userName/rivers/:riverName

Parameters:
-user click a certain river, and the river related site will pull to front.

- logined user to the same thing (need send token to the back end for authorization)
  Response:

```
[
  {
    "id": 1,
    "site_name": "LETHBRIDGE NORTHERN IRRIGATION DISTRICT CANAL ABOVE OLDMAN FLUME",
    "site_id": "05AB019",
    "river": "Oldman",
    "city_id": 3033875,
    "user_id": null
  },
  {
    "id": 2,
    "site_name": "OLDMAN RIVER NEAR LETHBRIDGE",
    "site_id": "05AD007",
    "river": "Oldman",
    "city_id": 3033875,
    "user_id": null
  }
]
```

**GET /sites/:siteId/flowRates || /sites/:siteId/allData || /users/:userName/sites/:siteId/flowRates || /users/:userName/sites/:siteId/allData**

- GET /sites/:siteId/flowRates || /sites/:siteId/allData || /users/:userName/sites/:siteId/flowRates || /users/:userName/sites/:siteId/allData

Parameters:

- Once User select a sites, all data would be pull front to find date range for the site for user to enter.
- logined user to the same thing (need send token to the back end for authorization)

**POST /sites/:siteId/flowRates/selectedDate || /sites/:siteId/allData/selectedDate || /users/:userName/sites/:siteId/flowRates/selectedDate || /users/:userName/sites/:siteId/allData/selectedDate**

- POST /sites/:siteId/flowRates/selectedDate || /sites/:siteId/allData/selectedDate || /users/:userName/sites/:siteId/flowRates/selectedDate || /users/:userName/sites/:siteId/allData/selectedDate

Parameters:

- User entered start and end date, the data for selected date and data type will pull to front.
- logined user to the same thing (need send token to the back end for authorization)
- post /sites/:siteId/allData/selectedDate:

{
"startDate": "2021-06-06",
"endDate":"2021-06-08"
}

Response:

```
[
  {
    "station_id": "05AB019",
    "discharge_date": "2021-06-06T06:00:00.000Z",
    "discharge": "32.40",
    "water_level": "1.564",
    "site_name": "LETHBRIDGE NORTHERN IRRIGATION DISTRICT CANAL ABOVE OLDMAN FLUME",
    "ave_temperature": "11.3",
    "total_preciptation": "0.2"
  },
  {
    "station_id": "05AB019",
    "discharge_date": "2021-06-07T06:00:00.000Z",
    "discharge": "31.70",
    "water_level": "1.543",
    "site_name": "LETHBRIDGE NORTHERN IRRIGATION DISTRICT CANAL ABOVE OLDMAN FLUME",
    "ave_temperature": "10.3",
    "total_preciptation": "0.0"
  },
  {
    "station_id": "05AB019",
    "discharge_date": "2021-06-08T06:00:00.000Z",
    "discharge": "31.50",
    "water_level": "1.538",
    "site_name": "LETHBRIDGE NORTHERN IRRIGATION DISTRICT CANAL ABOVE OLDMAN FLUME",
    "ave_temperature": "8.9",
    "total_preciptation": "1.8"
  }
]
```

**POST /users/:userName/upload**

- POST /users/:userName/upload

Parameters:

- User need to upload 2 files (discharge and weather files) and enter siteName, stationId, riverName, city, climateId to upload and insert into database with user specfic. Required token for authorization.

- example of discharge csv file structured
  ![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/discharge-csv-example.png)

- example of weather csv file structured
  ![Image](https://github.com/Xingzi-Jackie-Zhou/capstone/blob/main/src/assest/images/weather-csv-example.png)

**POST /users/signup**

- Add a user account

Parameters:

- username: User's provoded username and has to be unique
- name: User's name
- email: User's email
- password: User's provided password
- comfirmed password: has to match password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:

- username: User's provoded username
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**GET /users/:userName/profile**

- Get user's profile
- Has a list of sites user uploaded (authentication required and route used by GET /users/:userName/profile/sites)

### Auth

- Authentication:1. signup and login
- Authorization: After user logined, The profile page, upload page/function, and use of user-specific sites can be authorized if token is send to back for authorization.

## Roadmap

- Create client-side

- Create server-side

- express project with routing

- Create migrations

- Create seeds with sample json data

- Feature: Home page

- Feature: find a river

  - show all sites on the river for selection
  - Create Get /rivers/:riverName/sites endpoint

- Feature: find a site

  - show a site user selected in
  - Create Get /sites/:siteID endpoint

- Feature: View site flow rate or all data by selected date range

  - creat POST /sites/:siteId/flowRates/selectedDate || /sites/:siteId/allData/selectedDate

- Feature: Create account

  - Implement signup page and store in database
  - Create POST /users/signup endpoint

- Feature: Login

  - Implement login page + form
  - Create POST /users/login endpoint

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in local storage, include JWT on axios calls
  - Create Get user's profile, upload site (post /users/:userName/upload), and uploaded site list
  - Update code to non-user specific and user specfic to all pages that uses data from database

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Predict flow rate for a specific site based on previous year, so that user can based on the prediction to decide if they are going to the site to collect data or not.
- Expand to more guage sites and rivers
- Make user able to edit and delete the sites they upload.
- Solve more potential comflicts for example if user upload the site overlap with default database.
