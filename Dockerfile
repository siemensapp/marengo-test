FROM node:10-alpine

ENV NODE_ROOT /usr/app/
RUN mkdir -p $NODE_ROOT
WORKDIR $NODE_ROOT
COPY . .

#RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json
RUN npm install -g @angular/cli
RUN npm install nyc

# RUN rm -rf ~/.npm
# # In the project folder:
# RUN rm -rf node_modules
# RUN rm -f package-lock.json

# Install all the packages

#RUN ng update @angular/core



#RUN npm rebuild node-sass
# Necesario para correr PWA
# RUN npm install http-server
# Paquetes propios de siemens marengo
RUN npm install ./src/assets/marengo-packages/auth0-angular-jwt-3.0.0.tgz
RUN npm install ./src/assets/marengo-packages/marengo-ng-14.0.1.tgz
RUN npm install ./src/assets/marengo-packages/fonts-3.1.0.tgz
RUN npm install ./src/assets/marengo-packages/marengo-icons-3.4.0.tgz
RUN npm install ./src/assets/marengo-packages/marengo-bootstrap-14.0.1.tgz
# RUN npm audit fix
# Problema de .builders[app-shell]
# RUN npm update
# Compilamos para produccion

# RUN ng build --prod

# CMD http-server -p 4200 -c-1 dist/marengo-test
# Corremos 
EXPOSE 4200
