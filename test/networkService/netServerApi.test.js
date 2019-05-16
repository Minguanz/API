const  request=require('supertest')
const  chaiExpect = require('chai').expect;  
const netServer='http://10.0.0.21:8080'

describe.skip('ARM---网络服务 ', ()=>{

    
    
    it(' 获取当前a p列表 8080 ',async ()=>{

        let res = await request(netServer).get('/net?action=aplist')
                        .expect(200)
                        // .end(function (err,res){
                        
                        // console.log('res2',res2.text,typeof(( res2.text)))
                        // chaiExpect(res2.text).to.be.an('string')         
                        // })
                     //   console.log('net-res',res.text)
                        chaiExpect(res.text).to.be.an('string')
         
    });


    it('获取当前a p列表 8080', function (done) {

                        request(netServer)
                        .get('/net?action=aplist')
                        .expect(200)
                        .end(function(err,res){
                         //  console.log( 'net-res222',res.text)
                           done()
                            
                        })
        
    });

    it('获取当前a p列表 8080', function (done) {

        request(netServer)
        .get('/net?action=aplist')
        .expect(200)
        .end(function(err,res){
           console.log( 'net-res222',res.text)
           done()
            
        })

   });

   it('获取当前a p列表 8080', function (done) {

      request(netServer)
      .get('/net?action=aplist')
      .expect(200)
      .end(function(err,res){
         console.log( 'net-res222',res.text)
         done()
        
      })

   });

   it('获取当前a p列表 8080', function (done) {

      request(netServer)
      .get('/net?action=aplist')
      .expect(200)
      .end(function(err,res){
         console.log( 'net-res222',res.text)
         done()
         
      })
         
   });

})