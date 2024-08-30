# SHOPPER PROJECT (DESAFIO FULL STACK) #
## BACKEND ##
### Passos: ###
1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/coder-gaia/ShopperProject.git
2. Instalar as dependências necessárias
    ```bash
    npm installl
3. Executar o container docker:
   ```bash
   docker run -p 5000:5000 --name backendshopper backendshopper
   
4. Testar a url fornecida:
   ```bash
   https://probable-space-rotary-phone-vxr9x57pq652p755-5000.app.github.dev
   
5. Rotas para teste via postman:
    - (GET) Listar leituras:
    - ```plaintext
      https://probable-space-rotary-phone-vxr9x57pq652p755-5000.app.github.dev/api/measures/{customer_code}/list     
    - (POST) Insere uma leitura no banco de dados:
      ```json
      https://probable-space-rotary-phone-vxr9x57pq652p755-5000.app.github.dev/api/measures/upload
      
   - Descrição: Insere uma leitura no banco de dados. Em image deve-se fornecer uma imagem decodificada para base64.
        
    - Body (JSON):
         ```json
      {
          "image": "base64",
          "customer_code": "string",
          "measure_datetime": "datetime",
          "measure_type": "WATER" ou "GAS"
      }

   - (PATCH) Confirmar leitura:
     ```plaintext
     https://probable-space-rotary-phone-vxr9x57pq652p755-5000.app.github.dev/api/measures/confirm
   - Body (json):
       ```json
        {
         "measure_uuid": "string",
         "confirmed_value": integer
        }
       
### TESTE VIA LOCALHOST ###

1. Instalar as dependências necessárias
    ```bash
    npm installl
    
 2. Executar o servidor local:
    ```bash
    npm run start
    
 3. Rotas no localhost:
    - (GET) Listar leituras:
      ```json
      http://localhost:5000/api/measures/customer_code/list

    - (POST) Insere uma leitura no banco de dados:
      ```json
      http://localhost:5000/api/measures/upload
    - Descrição: Insere uma leitura no banco de dados. Em image deve-se fornecer uma imagem decodificada para base64.
      Body (JSON):
        ```json
      {
        "image": "base64",
        "customer_code": "string",
        "measure_datetime": "datetime",
        "measure_type": "WATER" ou "GAS"
      }

    - (PATCH) Confirmar leitura:
    - ```plaintext
      http://localhost:5000/api/measures/confirm
    - Body (json):
        ```json
      {
        "measure_uuid": "string",
        "confirmed_value": integer
      }
