const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const http = require("http");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const createHttpError = require("http-errors");
const { AllRoutes } = require("./Routers/Router");
const UserAgent = require("express-useragent");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const cookie_Session = require("cookie-session"); // fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
// const passport = require("passport"); // fffffffffffffffffffffffffffffffffffffffffffffffffffff
// const passportSetup = require("./Http/Middleware/Passport")

module.exports = class Application{
    #app = express();
    #PORT;
    #DB_URL;
    constructor(PORT, DB_URL){
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication();
        this.initConfigRedis();
        this.conectedMongoDb();
        this.createServer();
        this.createRoute(); 
        this.errorHandler();
    }
    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: false}));
        this.#app.use(bodyParser.urlencoded({extended: true})); 
        this.#app.use(bodyParser.json());
        this.#app.use(express.static(path.join(__dirname, "..", "Public")));
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(UserAgent.express()); 

        // this.#app.use(cookie_Session({    // fffffffffffffffffffffffffffffffffffffffffffff
            // name: "session",
            // keys: ["cyberwolve"],
            // maxAge: 24*60*60*100,
        // }));
        // this.#app.use(passport.initialize());// ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        // this.#app.use(passport.session()); // fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup( 
            swaggerJSDoc({
                swaggerDefinition: {
                    openapi: "3.0.0",
                    info : {
                        title: "Shinko Website",
                        version: "2.0.0",
                        description: "خرید آنلاین محصولات و دوره های آموزشی _ Shinko"
                    },
                    servers : [{
                        url : `http://localhost:${this.#PORT}`
                    }],
                    components:{
                        securitySchemes:{
                            BearerAuth:{
                                type: "http",
                                scheme: "bearer",
                                bearerFormat: "JWT" 
                            }
                        }
                    },
                    security: [{BearerAuth: []}]
                },
                apis: ["./App/Routers/**/*.js"]
            }), 
            {explorer: true}
            )
        )

    }
    initConfigRedis(){
        require("./Utills/Init.Redis")
    }
    conectedMongoDb(){
        mongoose.set('strictQuery', 'false')
        mongoose.connect(this.#DB_URL, (error) => {
        if(!error) return console.log("Application is connected to mongoDb...");
        return console.log("Application is not connected to mongoDb...");
        })
    }
    createServer(){
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`server running in mode on prot ${process.env.BASEURL}:${this.#PORT}`);
        })
    }
    createRoute(){
        this.#app.use(AllRoutes)
    }
    errorHandler(){
        this.#app.use((req, res, next) =>{
            next(createHttpError.NotFound("آدرس صفحه مورد نظر یافت نشد"))
        })
        this.#app.use((error, req, res, next) => {
            const servererror = createHttpError.InternalServerError();
            const statusCode = error?.status || servererror.status ;
            const message = error?.message || servererror.message
            return res.status(statusCode).send({
                errors : {
                    statusCode,
                    message 
                }
            })
        })
    }
}