# NPU

> [!NOTE]
> Not all the services were implemented, and the ones that were implemented are not fully functional.

### Architecture diagrams:

#### C4 Context Diagram
![NPU_Platform___System_Context-System_Context_diagram_for_NPU_Platform.png](architecture/NPU_Platform___System_Context-System_Context_diagram_for_NPU_Platform.png)

#### C4 Container Diagram
![c4container-Container_diagram_for_NPU_Platform.png](architecture/c4container-Container_diagram_for_NPU_Platform.png)


### Running the app

To test the app you can use a Postgres container:

```shell
docker run --name npu_db -e POSTGRES_DB=npu_db -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

Remember to set the environment variables in the `.env` files in the respective apps:

```
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/npu_db"
```

* ./apps/rating-service/.env
* ./apps/npu-service/.env
* ./apps/discovery-service/.env

Then you can run the APIs with:

```shell
nx run discovery-service:serve
nx run rating-service:serve
nx run npu-service:serve
```
