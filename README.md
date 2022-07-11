### Installation

1. Clone o repositório e navegue até o diretório

2. Primeiro rode um container com mongodb
   ```sh
   docker run -d -p 27017:27017 --name some-mongo mongo
   ```
3. Crie a imagem docker da aplicação
```sh
   docker build . -t node/corelab-api
```

4. Rode um container da imagem da aplicação
    ```sh
   docker run -p 3333:3333 --link some-mongo:some-mongo node/corelab-api
   ```
   A aplicação deve estar rodando na porta 3333
