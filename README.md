# Word Cloud

[**WordCloud.online**](https://wordcloud.online) is a tool to create a word cloud online from your text and download the resulting image for free. The words of the text are lemmatized. You can select colors and fonts for the displayed words.

[![GitHub Super-Linter](https://github.com/leshkin/wordcloud.online/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)

### Word cloud for "1984, George Orwell, 1st chapter"

![Word cloud for 1984, George Orwell, 1st chapter](https://wordcloud.online/wordcloud-1984.png)

## Development

1. Run backend

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

2. Run frontend
   ```bash
   cd frontend
   npm run dev
   ```

## Run application in the development mode using Docker

1. Run

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

2. Open <http://localhost:8080>

## Install backend to virtual environment

1. Go to `backend` folder

2. Create virtual environment

   ```bash
   python3 -m venv env
   ```

3. Activate venv

   ```bash
   source env/bin/activate
   ```

4. Install packages

   ```bash
   pip install -r requirements.txt
   ```

### Build images

1. Build image for frontend
   ```bash
   cd frontend # from the project directory
   docker build -t 1eshkin/wordcloud-frontend:x.x.x .
   ```
2. Push frontend image to the Docker Hub
   ```bash
   docker push 1eshkin/wordcloud-frontend:x.x.x
   ```
3. Build image for backend
   ```bash
   cd backend # from the project directory
   docker build -t 1eshkin/wordcloud-backend:x.x.x .
   ```
4. Push backend image to the Docker Hub
   ```bash
   docker push 1eshkin/wordcloud-backend:x.x.x
   ```

### Deploy to Docker Swarm

1. Copy `docker-compose.yml` to the `wordcloud` folder on remote server

2. Deploy app to Docker Swarm
   ```bash
   cd wordcloud
   docker stack deploy --compose-file docker-compose.yml wordcloud
   ```

### Autodeploy with GitHub Actions

Add and push a new tag

```bash
git push origin v1.0.0
```
