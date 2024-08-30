###  SHOPPER PROJECT (DESAFIO FULL STACK) ###
# BACKEND #
# Passos: 
    #1 - Clonar o repositório: https://github.com/coder-gaia/ShopperProject.git
    #2 - Instalar as dependencias necessárias via 'npm install'
    #3 - Executar os seguinte commando: docker run -p 5000:5000 --name backendshopper backendshopper
    #4 - Testar a url fornecida: https://probable-space-rotary-phone-vxr9x57pq652p755-5000.app.github.dev/
    
      #4.1 - Rotas para teste via postman:
      
          GET -  https://probable-space-rotary-phone-vxr9x57pq652p755-5000.app.github.dev/api/measures/{customer_code}/list
                    exemplo: https://probable-space-rotary-phone-vxr9x57pq652p755-5000.app.github.dev/api/measures/JAMES/list
                 ## Retorna a lista de leituras realizadas pelo cliente fornecido. ##
                 
          POST - https://probable-space-rotary-phone-vxr9x57pq652p755-5000.app.github.dev/api/measures/upload
                ## Insere uma leitura no banco de dados. ##
                Em 'image' deve-se fornecer uma imagem decodificada para base64.
                body: (json):
                    {
                          "image": "base64",
                          "customer_code": "string",
                          "measure_datetime": "datetime",
                          "measure_type": "WATER" ou "GAS"
                    }


          PATCH - https://probable-space-rotary-phone-vxr9x57pq652p755-5000.app.github.dev/api/measures/confirm
                ## Confirma uma leitura. ##
                body (json): 
                   {
                        "measure_uuid": "string",
                        "confirmed_value": integer
                  }
        ### TESTE VIA LOCALHOST ###
        #1 - Instalar as dependencias via 'npm install'
        #2 - Execute no terminal na pasta do projeto o comando: 'npm run start'
        #3 - Rotas no localhost:
            POST: http://localhost:5000/api/measures/upload
            PATCH: http://localhost:5000/api/measures/confirm
            GET: http://localhost:5000/api/measures/customer_code/list - exemeplo: http://localhost:5000/api/measures/JAMES/list
