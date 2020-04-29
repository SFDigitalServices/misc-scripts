quick n dirty python reader for azure storage.

Currently hardcoded to only read `uploads` folder.

in order to use this, the environment variable `AZURE_STORAGE_CONNECTION_STRING` must be set.

Install Pipenv
> $ brew install pipenv

Install python dependencies
> $ pipenv install

Spawn virtualenv shell
> $ pipenv shell

Run it
> (azure-reader) $ python azure-reader.py
