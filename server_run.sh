cd backend
touch .env
echo "DB_CONN='mongodb://localhost:27017' PORT=8081"
npm install
npm start