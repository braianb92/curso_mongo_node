

const express = require("express")
const monbgodb = require("mongodb")

let cliente = monbgodb.MongoClient;
const servidor = express()

//Dejo la variable db inicializada
let db;

//Middleware para habilitar
servidor.use(express.json());


servidor.get("/",(req,res)=>{
    res.send("Pokedex")
})

//localhost:8000/pokemones
//localhost:8000/pokemones?tipo=hierba
servidor.get("/pokemones",(req,res)=>{
    if(req.query.tipo) {
        //Solo P de hierba
    }else{
        //Todos los P
        let pokemon_collection = db.collection("sample_pokemon");
        let pokemones = pokemon_collection.find({});
        pokemones.toArray((err,data)=>{
            res.json(data);
        })
        console.log(pokemones);
        res.send("funciona!");
    }
})

//localhost:8000/pokemones/1
servidor.get("/pokemones/:id",(req,res)=>{
    //req.params.id
})

servidor.post("/pokemones",(req,res)=>{
    //req.body.
})



cliente.connect("mongodb://localhost:27017",{
    useUnifiedTopology : true,
    useNewUrlParser: true},(err,data)=>{
    // data es la referencia al cliente conectado al daemon
    if(err) throw new Error(err);
    console.log("Base de datos!");
    
     db = data.db("SampleCollections");

    servidor.listen(8000,()=>{
        console.log("Servidor Web!")
    })
});