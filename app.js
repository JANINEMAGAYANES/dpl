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
mongoose.connect("mongodb+srv://jan:arweave@cluster0-pdknn.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


app.use("/", transactionRoutes);


app.listen(3000, () => {
	console.log('server listening on port 3000');
});
