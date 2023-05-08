const express = require("express")
const mongoose = require("mongoose")
const app = express()
const UserModel = require("./models/collection1");
const cors = require('cors');
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://harshnp:abcd1234@cluster0.couujp9.mongodb.net/database?retryWrites=true&w=majority');

app.post('/insert', async (req, res) => {
    const Name = req.body.name;
    const Id = req.body.id;

    const user = new UserModel({ name: Name, id: Id });
    await user.save();
    res.send("Success");
});

app.get('/read', async (req, res) => {
    const re = await UserModel.find({});
    res.json(re);
})

app.put('/update', async (req, res) => {
    const newname = req.body.newname;
    const id = req.body._id;
    try {
        const a=await UserModel.findById(id);
        a.then(({ error, updated })=> {
            if(error){
                alert(error)
            }
            updated.name = newname;
            updated.save();
        }).catch(err){
            console.log(err);
        };

        // a.then(({err,up})=>{

        // })
        updated.save();
    }
    catch (Error) {
        console.log(Error);
    }
    res.send("Updated");
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
})
app.listen(3001, () => {
    console.log("HEHEHE SERVER IS RUNNING :}");
})

