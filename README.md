<p align="center">
    <img width="150" src="./client/public/sociol_logo.png">
</p>

<h1 align="center">Sociol</h1>

<div align="center">
Analysts for your Social Media</br></br>
</div>

## 📂 Technologies Used

### Frontend

- [NextJS]()
- [Redux](https://github.com/reduxjs/redux)
- [Jest](https://github.com/facebook/jest)
- [Enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme)

### Backend

- [Django](https://github.com/django/django)
- [MongoDB]()

## ✅ Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### 📍 Prerequisites

What things you need to install the software and how to install them

- Install [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- Install [Node.js/npm](https://nodejs.org/en/download/)
- Install [python3/pip3](https://www.python.org/downloads/) (Version >= 3.6)
- Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
- Install [MongoDB Compass](https://docs.mongodb.com/compass/master/install) (Recommended)

### ⚒️ Installation

```
# Clone this repository
git clone https://github.com/CS161-SJSU/social-analytics

# Go into the repository
cd social-analytics
```

### 💻 Client Start-up

```
# Go into client folder
cd client

# Install client dependencies
yarn install or npm install

# Setup Environment Variables

# Create a .env file in the client folder
# Place your SPOTIFY, TWIITER, GOOGLE CLIENT/SECRET ID in the file

# Start client on localhost:3000
yarn dev or npm run dev
```

### ⌨️ Server Start-up

```
# Create virtual environment (recommend) using conda/virtualenv
conda create --name your_env_name

# Start virtual env
source activate your_env_name
```
--- For Windows
Create the virtual environment named "env":
python -m venv env 

Add the path to the git ignore file (optional):
echo env/ >> .gitignore

Activate the virtual env:
.\env\Scripts\activate

```
# Setup Environment Variables

# Go into server folder
cd server

# Create a .env file in the same directory where settings.py resides
# Place your SPOTIFY, TWIITER, GOOGLE CLIENT/SECRET ID in the file
```

```
# Install server packages from requirements.txt
pip3 install -r requirements.txt or python -m pip3 install -r requirements.txt

# Create new migrations
python3 manage.py makemigrations or Python manage.py makemigrations (Windows)

# Apply new migrations
python3 manage.py migrate

# Start server on localhost:8000
python3 manage.py runserver
```

## ⚙️ Testing

```
# Test server using Django unittest
cd server
python3 manage.py test
```

```
# Test client using Jest and Enzyme
cd client
npm test
```

## ⭐️ Team

👩🏻‍💻 **Trinity Nguyen** - [trinwin](https://github.com/trinwin) (Project Lead + Frontend Lead)

👨🏻‍💻 **Cagan Sevencan** - [cagansevencan](https://github.com/orgs/CS161-SJSU/people/cagansevencan) (Frontend Developer)

👩🏻‍💻 **Julia Chin** - [juliachin123](https://github.com/orgs/CS161-SJSU/people/juliachin123) (Backend Developer)

👨🏻‍💻 **Eric Wu** - [ericwu12345](https://github.com/orgs/CS161-SJSU/people/ericwu12345) (Backend Developer)

👨🏻‍💻 **Toan Dao** - [toandaosjsu](https://github.com/orgs/CS161-SJSU/people/toandaosjsu) (Backend Developer)

See also the list of [contributors](https://github.com/CS161-SJSU/social-analytics/graphs/contributors) who participated in this project.
