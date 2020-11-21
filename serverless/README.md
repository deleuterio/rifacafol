# rifas-serverless

## Deploy
Use the programmatic topic to configure your aws credentials:
- https://www.serverless.com/framework/docs/providers/aws/guide/credentials#setup-with-the-aws-cli

## Database
To create database on RDS use docker and then create the database.
1. Pull docker image: `docker pull postgres`
2. Connect to remote database: 
```docker
$ sudo docker run -it --rm postgres psql -h {{PG_HOST}} -U postgres
```
3. Create database: 
```sql
CREATE DATABASE rifacafol_dev;
CREATE DATABASE rifacafol;
```
4. Create table to manage raffle index:
```sql
\c rifacafol_dev
CREATE TABLE raffle (id SERIAL PRIMARY KEY, order_id text NOT NULL);

\c rifacafol
CREATE TABLE raffle (id SERIAL PRIMARY KEY, order_id text NOT NULL);
```
4. Create users to only SELECT and INSERT roles:
```sql
\c rifacafol_dev
CREATE ROLE rifacafol_dev WITH LOGIN PASSWORD 'XXX';
GRANT SELECT, INSERT ON raffle TO rifacafol_dev;
GRANT USAGE ON raffle_id_seq TO rifacafol_dev;

\c rifacafol
CREATE ROLE rifacafol WITH LOGIN PASSWORD 'XXX';
GRANT SELECT, INSERT ON raffle TO rifacafol;
```