import chai from 'chai';
import { expect, should} from 'chai';
import chaiHttp from 'chai-http';
import omit from 'object.omit';
import app from '../../../app';
import authroutes from './authroutes';
import dropTables  from '../../../database/droptables';
import createTables from '../../../database/createtables';

chai.use(chaiHttp);
const router = () => chai.request(app);



const user = {
  "firstName":"test",
  "lastName":"test1",
  "email":"test@gmail.com",
  "password":"testpassword",
  "address":"kigali"
};


describe('Authentication test case', () => {
    before(async() => {
       await createTables();  
      });

    after(async()=>{
       await dropTables();
    });


  it('allow a user sign up', (done) => {
      router()
      .post(authroutes.signup)
      .send(user)
      .end((error, response)=>{
          expect(response).to.have.status(201);
          done(error);
      })
   });

   it('should not allow a user sign up twice', (done) => {
      router()
      .post(authroutes.signup)
      .send(user)
      .end((error, response)=>{
          expect(response).to.have.status(409);
          done(error);
      })
   });

   it('should not allow empty fields on signup', (done) => {
      const emptyFields = omit(user, 'firstName');
      router()
      .post(authroutes.signup)
      .send(emptyFields)
      .end((error, response)=>{
          expect(response).to.have.status(400);
          done(error);
      })
   });

 it('allow a user to log in', (done) => {
     const loginUser = omit(user, ['firstName', 'lastName', 'address']);
     router().post(authroutes.login)
     .send(loginUser)
     .end((error, response) => {
       expect(response).to.have.status(200) 
       done(error);
     });
   });


   it('give 400 error when email is incorrect', (done) => {
       const incorrectEmail = omit(user, ['firstName', 'lastName', 'address', 'email']);
       incorrectEmail.email = 'mirrm4aina@gmail.com';
       router().post(authroutes.login)
       .send(incorrectEmail)
       .end((error, response)=>{
         expect(response).to.have.status(400) 
         done(error);
     });
   });


   it('give 400 error when password is incorrect', (done) =>{
     const incorrectPassword = omit(user, ['firstName', 'lastName', 'address']);
     incorrectPassword.password = 'incorrectpassword';
     router().post(authroutes.login)
     .send(incorrectPassword)
     .end((error, response)=>{
       expect(response).to.have.status(400)
       done(error);
     })
   }); 

   it('should not allow empty fields on login', (done) =>{
    const emptyFields = omit(user, ['firstName', 'lastName', 'address', 'email']);
    router().post(authroutes.login)
    .send(emptyFields)
    .end((error, response)=>{
      expect(response).to.have.status(400)
      done(error);
    })
  }); 

});
