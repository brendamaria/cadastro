# cadastro
## Linux
Iniciar imagem docker mssql:

`docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourPassword" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest`

encontrada no site: https://hub.docker.com/_/microsoft-mssql-server

editar parâmetro DefualtConnection:  
Exemplo:  
  `"DefualtConnection":"Server=localhost;Database=CadastroDB;User=sa;Password=yourPassword;TrustServerCertificate=True"`
  
## Windows
Iniciar SQL Server Management Studio e editar parâmetro DefualtConnection:  
Exemplo:  
  `"DefualtConnection":"Server=yourConnection;Database=CadastroDB;Trusted_Connection=True;MultipleActiveResultSets=true;Integrated Security=true;TrustServerCertificate=True"`
