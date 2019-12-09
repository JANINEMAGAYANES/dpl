var express = require("express");
var router  = express.Router();
var Duplicate = require("../models/duplicate");
var Link = require("../models/link");
var Arweave = require('arweave/node');
var b64UrlToString = require('arweave/node/lib/utils').b64UrlToString;

var instance = Arweave.init({
    host: 'arweave.net',
    port: 443,
    logging: true,
    protocol: 'https'
});

router.get("/", function(req, res){
    res.render("transaction/show", {message: ""}); 
 });

 router.post("/", async function(req, res){
      
          var link = req.body.link
               Duplicate.findOne({duplicateurl: link}, function(err, duplicate){
                if(duplicate){
                res.render("transaction/show", {duplicate: duplicate, message: "That link has been uploaded before"});    
                } else {
                    try {
                        const url = new URL(link);
                        const domain = url.hostname.startsWith('www.') ? url.hostname.substring(4) : url.hostname
                       
                         
                        Link.find({invalidurl: domain}, function(err, blacklisted){
                            if(err){
                                console.log(err);
                                res.render("transaction/show")
                            } else {
                                console.log(blacklisted);  if (blacklisted.length > 0) {
                                    res.render("transaction/show",{message:"The domain has copyright issues."} )
                                } else {
                                    
                                  var newDuplicate= {duplicateurl: url}
                                  Duplicate.create(newDuplicate, function(err, newlyCreated){
                                    if(err){
                                        console.log(err);
                                    } else {
                                      
                                        res.render("transaction/show",{message:"The URL may be valid"});
                                    }

                                  })
                                }
                            }
                        })  
                    } catch (error) {
                      
                        res.render("transaction/show", {message: "The URL is not valid."});
                    }
                }
            })
        
    });
    


module.exports = router;
