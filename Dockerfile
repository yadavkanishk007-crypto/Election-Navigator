FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY data/ /usr/share/nginx/html/data/
COPY screenshots/ /usr/share/nginx/html/screenshots/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
