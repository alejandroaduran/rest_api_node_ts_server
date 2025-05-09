import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "products",
                description: "API related to products",
            }
        ],
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API documentation for the project",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
    },
    apis: ["src/routes/*.ts"],
}
const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec