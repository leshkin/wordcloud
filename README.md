# Word Cloud

Word Cloud allows you to build a word cloud online from any text and download the resulting image.

[![GitHub Super-Linter](https://github.com/leshkin/wordcloud.online/workflows/Super-Linter/badge.svg)](https://github.com/marketplace/actions/super-linter)

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
   docker build -t 1eshkin/textometr-frontend:x.x.x .
   ```
2. Push frontend image to the Docker Hub
   ```bash
   docker push 1eshkin/textometr-frontend:x.x.x
   ```
3. Build image for backend
   ```bash
   cd backend # from the project directory
   docker build -t 1eshkin/textometr-backend:x.x.x .
   ```
4. Push backend image to the Docker Hub
   ```bash
   docker push 1eshkin/textometr-backend:x.x.x
   ```

### Deploy to Docker Swarm

1. Copy `docker-compose.yml` to the `wordcloud` folder on remote server

2. Deploy app to Docker Swarm
   ```bash
   cd wordcloud
   docker stack deploy --compose-file docker-compose.yml wordcloud
   ```