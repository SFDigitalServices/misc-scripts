import os, uuid
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

try:
    connect_str = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
    # Create the BlobServiceClient object which will be used to create a container client
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    # hardcoding not ideal but there you go
    str = 'uploads'
    container = blob_service_client.get_container_client(str)
    # Now get all the blobs from the container
    all_blobs = container.list_blobs()
    for blob in all_blobs:
        print(blob.name)
except Exception as ex:
    print('Exception:')
    print(ex)
