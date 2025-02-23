
### Go-live
rsync -arvgot --exclude="README*" --exclude=".env" --exclude=".git" --exclude="node_modules" --exclude=".keystone" --exclude=".next" --exclude=".idea" tasks/ root@18.175.81.177:/var/www/tasks/
ssh root@18.175.81.177
cd /var/www/tasks/keystone-backend
cp ../../bookme/.env .
npx keystone build
pm2 start --name "task-manager keystone" "npx keystone start"
cd /var/www/tasks/nextjs-frontend
cp ../../bookme/nextjs-frontend/.env .
npm run build
pm2 start --name "task-manager nextjs" "npm run start"

### Setup Database
psql -U postgres -p 5432 -h localhost
CREATE DATABASE "task";
GRANT all privileges on database  task  to postgres;

### Admin user
herve: Ih4iudes98&^823j20(+)

### Backup database
pg_dump --host=localhost --port=5432 --username=postgres --dbname=task --format=plain --no-owner --no-privileges > task.sql
psql  --port=5432 --host=localhost  -U postgres
SET session_replication_role = 'replica';
\i task.sql
SET session_replication_role = 'origin';

### Reset database
psql  --port=5432 --host=localhost  -U postgres
DROP DATABASE "task";
CREATE DATABASE "task";

### Import database data only
pg_dump --host=localhost --port=5432 --username=postgres --dbname=task --data-only --no-owner --no-privileges > data.sql
psql --host=localhost --port=5432 --username=postgres -d task -c "SET session_replication_role = 'replica';"
psql --host=localhost --port=5432 --username=postgres -d task -f data.sql
psql --host=localhost --port=5432 --username=postgres -d task -c "SET session_replication_role = 'origin';"

