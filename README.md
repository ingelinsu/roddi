# Røddi

## Frontend


## Backend

### How to open the environment?

1. Install Anaconda if you don't have before
2. Open Anaconda prompt
3. Run the following command:
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
