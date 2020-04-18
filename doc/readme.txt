Create production build:
========================
# Put environment variables into .env.development and .env.production
All variables need to be named REACT_APP_...

To simulate production on local machine:
# npm run build
# serve -s build

To deploy app to heroku:
# heroku create --buildpack https://github.com/mars/create-react-app-buildpack.git
Creating app... done, ⬢ shrouded-lowlands-77068
Setting buildpack to https://github.com/mars/create-react-app-buildpack.git... done
https://shrouded-lowlands-77068.herokuapp.com/ | https://git.heroku.com/shrouded-lowlands-77068.git

# git push heroku master
# heroku open