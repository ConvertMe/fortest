pm2 del test
git reset --hard
git pull origin main
git checkout main
npm i
npm run prod
pm2 logs