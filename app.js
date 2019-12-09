var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Link = require("./models/link"),
    Duplicate = require("./models/duplicate"),
    Arweave = require('arweave/node')

    const instance = Arweave.init({
        host: 'arweave.net',
        port: 443,
        logging: true,
        protocol: 'https'
    });

    console.log(instance)
    
//REQUIRE ROUTES
var transactionRoutes    = require("./routes/transaction")

//mongoose.connect("mongodb://localhost/checker");
mongoose.connect("mogodb+srv://jan:arweave@cluster0-pdknn.mongodb.net/test?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


app.use("/", transactionRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

