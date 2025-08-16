# MinIO File Storage Module

This module provides file storage functionality using MinIO as the storage provider.

## Features

- **MinIO Integration**: Uses MinIO for scalable object storage
- **Automatic Bucket Management**: Creates and configures buckets automatically
- **Public Access**: Sets up public read access for uploaded files
- **Unique File Names**: Generates unique file names using ULID

## Configuration

The module is configured in `medusa-config.js` with the following environment variables:

- `MINIO_ENDPOINT`: MinIO server endpoint
- `MINIO_ACCESS_KEY`: MinIO access key
- `MINIO_SECRET_KEY`: MinIO secret key
- `MINIO_BUCKET`: Bucket name (optional, defaults to 'medusa-media')

## Usage

The module is automatically used by the file service when MinIO configuration is provided. Files are uploaded with public read access and unique identifiers.
