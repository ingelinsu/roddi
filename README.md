# Røddi

## Frontend

### How to start the react environment?
1. Install Node.js from: https://nodejs.org/en/
2. Navigate to the `frontend/react-app` folder using the `cd` and `dir` commands
3. Run the following commands:
```
npm install
npm start
```
Note: If webpage does not open automatically, go to http://localhost:3000

## Backend

### How to create the environment?
1. Install Anaconda if you haven't before
2. Open Anaconda prompt
3. Navigate to the `backend` folder using the `cd` and `dir` commands
4. Run the following command:
```
conda env create -f environment.yml
```


### How to open the environment?

1. Open Anaconda prompt
2. Run the following command:
```
conda activate roddi
```

### How to create a admin user?

1. Open Anaconda prompt and activate the environment
2. Navigate to the `backend` folder using the `cd` and `dir` commands
3. Run the following command:
```
python manage.py createsuperuser
```


### How to set up the backend server?

1. Open Anaconda prompt and activate the environment
2. Navigate to the `backend` folder using the `cd` and `dir` commands
3. Run the following command:
```
python manage.py runserver
```
4. Open http://localhost:8000/ or http://localhost:8000/admin


### How to check if my backend code runs?

1. Open Anaconda prompt and activate the environment
2. Navigate to the `backend` folder using the `cd` and `dir` commands
3. Run the following three commands. If any errors or issues appear, they must be solved before continuing.
```
python manage.py makemigrations roddi
python manage.py migrate roddi
python manage.py runserver
```
4. Open http://localhost:8000/ or http://localhost:8000/admin
