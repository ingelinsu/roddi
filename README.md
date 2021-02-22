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

### How to create a new environment manually
This seems to be necessary on Unix-based operatings systems
because some dependencies in `environment.yml` appears unavailable.
```sh
# You can use another name if you like.
conda create --name roddi
conda activate roddi

# Later versions of python lacks cvxopt
conda install python=3.8.5

# These channels contains libraries we need.
# You can omit this and use the -c flag, but
# this makes it automatically available.
conda config --add channels conda-forge
conda config --add channels anaconda

# Install all the libraries we need.
conda install django
conda install django-cors-headers
conda install djangorestframework
conda install django-extensions
conda install cvxopt
conda install numpy
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


### How to create database dumps
Open the sqlite client to your database file.
The command to open the client may differ on Windows.
```
sqlite3 db.sqlite3
```

Create an SQL dump to some file
```
sqlite> .output dump.sql
sqlite> .dump
```
Exit by typing `.exit` or using the shortcut Ctrl-D
Now you have an SQL-script called `dump.sql` in your folder.


### How to set up the database from a dump on Unix
```
sqlite3 db.sqlite3 < dump.sql
```

