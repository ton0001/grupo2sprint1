const fs = require('fs');
const generateJWT = require('../../helpers/generateJWT');


const login = async (req, res)=>{

    const {email, password} = req.body;

    try {
        const dbUsers=fs.readFileSync('/Users/victoriacampiotti/Documents/grupo2sprint1/api/data/users.json', 'utf-8')
        const users=JSON.parse(dbUsers)


        const user = users.find(user => {
            return (user.email === email && user.password === password); 
            })

        if(!user){
            return res.status(400).json({
                ok:true,
                mgs: "User NOT found"
            })
        }

        const userLog = {
            id: user.id,
            name: user.name,
            age: user.age,
            email: email,
            role: user.role
         }

        const token = await generateJWT(userLog)

        res.status(200).json({
            ok:true,
            userLog,
            token,
            mgs: "Logeado"
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            mgs: "Error login"
        })

    }
}

module.exports={login}