# Happy Homes API

## Overview

PT. Happy Homes take home test API

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Documentation](#documentation)

## Installation

```bash
git clone https://github.com/tajulsubqi/TimeSheetManagement-HappyHomes-Fullstack_test.git
cd server
npm install
```

## Usage

```bash
npm start
```

## Documentation

### Base URL

localhost

### GET Endpoint

#### 1. /api/v1/users

Used to get User profile information (Require Authorization token)

#### 2. /api/v1/activities

Used to get a list of activities (No Authorization token required)

#### 3. /api/v1/projects

Used to get a list of projects (Require Authorization token)

### POST Endpoint

#### 1. /api/v1/user

request body :

```bash
{
  "name": "John Doe",
  "hourlyRate": 25000
}
```

#### 2. /api/v1/activity

Used to top up the balance of the User (Require Authorization token)

request body :

```bash
{
 {
  "activityTitle": "Design Meeting",
  "startDate": "2023-06-08",
  "endDate": "2023-06-08",
  "startTime": "10:00",
  "endTime": "11:00",
  "userId": 1,
  "projectId": 1
}
}
```

#### 4. /api/v1/project

Used to carry out transactions from available services (Require Authorization token)

request body :

```bash
{
    "projectName" : "UI/UX Design",
}
```

### PUT Endpoint

#### 1. /api/activity/:id

Used to update User profile data (Require Authorization token)

request body :

```bash
{
  "activityTitle": "Design Meeting update",
  "startDate": "2023-06-08",
  "endDate": "2023-06-08",
  "startTime": "10:00",
  "endTime": "11:00",
  "userId": 1,
  "projectId": 1
}
```

#### 2. /api/project/:id

Used to update / upload User profile image (Require Authorization token)

```bash
{
    "projectName" : "UI/UX Design update",
}
```
