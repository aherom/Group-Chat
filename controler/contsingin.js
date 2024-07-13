const bcrypt = require('bcrypt');
const user = require('../module/user');

exports.sigin = async  (req, res) => {
    console.log(req.body);
    const { name, phone, email, password } = req.body; 
    if (name.length > 0 && phone.length > 0 && email.length > 0 && password.length > 0) {

       const emailrecord = await user.findOne({where:{email:email}});
      if(!emailrecord){ 
       
         const phonerecord = await user.findOne({where:{phone:phone}})
           if(!phonerecord)
           {
              const hashpassword = await bcrypt.hash(password, 10);
              console.log(hashpassword);
              user.create({
                   name,phone,email,password: hashpassword
              }).then(() => {
                  res.status(201).send('User created successfully');
             }).catch((error) => {
                 res.status(500).send('Error creating user');
             });
           } else{ res.status(400).send('phone number all ready exist');}
      }
       else{ res.status(400).send('Email all ready exist');}
    } else {
        res.status(400).send('All fields are required');
    }
}