const request = require('supertest')
const chaiExpect = require('chai').expect;
const ArmServer = 'http://10.0.0.180:8329'
const netServer = 'http://10.0.0.180:8080'

const fs = require('fs')


describe.skip(' ARM---摄像头服务', function () {

    // before(()=>console.info("ARM---摄像头服务用例集开始"))
    // after(()=>console.info("ARM---摄像头服务用例集结束"))
    // beforeEach(()=>console.info("在本区块的每个测试用例之前执行"))
    // afterEach(()=>console.info("在本区块的每个测试用例之后执行"))

    //beforeEach(()=>console.info("在本区块的每个测试用例之前执行2222"))

    describe('拍摄 API', () => {

        before(() => console.info("ARM---摄像头服务用例集开始"))
        after(() => console.info("ARM---摄像头服务用例集结束"))

        it(' 拍摄 /snap@name {stream} @value {"0"} @required{ true } @paramType{ String }', function (done) {

            request(ArmServer)
                .get('/snap?stream=0')
                //.set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return err
                    //   console.log(typeof( res.body),'bode1',res.headers.Connection)
                    chaiExpect(res.body).to.exist
                    done();
                });

        });

        it(' 拍摄 /snap@name {stream} @value {"1"} @required{ true} @paramType{ String }', function (done) {
            //  this.timeout(8000)
            const a = 1

            request(ArmServer)
                .get(`/snap?stream={a}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return err
                    // console.log('body2',res.text,res.buffered)
                    chaiExpect(res.body).to.exist
                    done()

                })
        })


        it(' 拍摄 /snap@name {stream} @value {!@#$//&*()} @required{ true} @paramType{ String }', function (done) {
            //  this.timeout(8000)
            const a = '!@#$//&*()'

            request(ArmServer)
                .get(`/snap?stream={a}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return err
                    // console.log('body2',res.text,res.buffered)
                    chaiExpect(res.body).to.exist
                    done()

                })
        })

        it(' 拍摄 /snap@name {stream} @value {"9999999"} @required{ true} @paramType{ String }', function (done) {
            //  this.timeout(8000)
            const a = '9999999'

            request(ArmServer)
                .get(`/snap?stream={a}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return err
                    // console.log('body2',res.text,res.buffered)
                    chaiExpect(res.body).to.exist
                    done()

                })
        })

        it(' 拍摄 /snap@name {stream} @value {010} @required{ true} @paramType{ number }', function (done) {
            //  this.timeout(8000)
            const a = 010

            request(ArmServer)
                .get(`/snap?stream={a}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return err
                    // console.log('body2',res.text,res.buffered)
                    chaiExpect(res.body).to.exist
                    done()

                })

        })


        it(' 拍摄 /snap@name {stream} @value {9999999} @required{ true} @paramType{ number }', function (done) {
            //  this.timeout(8000)
            const a = 9999999

            request(ArmServer)
                .get(`/snap?stream={a}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return err
                    // console.log('body2',res.text,res.buffered)
                    chaiExpect(res.body).to.exist
                    done()

                })
        });

    });


    describe('曝光设置 API', () => {


        it('曝光参数设置 @name{exp}@value {0}@required{ true}', (done) => {
            request(ArmServer)
                .get('/camera?exp=0')
                .expect(200)
                .end((err, res) => {
                    //  console.log('res3',)
                    chaiExpect(res.headers.server).to.be.equal('MJPG-Streamer/0.2')
                    chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                    done()

                })

        });

        it('曝光参数设置 @name{-1} exp', (done) => {
            request(ArmServer)
                .get('/camera?exp=-1')
                .expect(200)
                .end((err, res) => {
                    //  console.log('res3',)
                    chaiExpect(res.headers.server).to.be.equal('MJPG-Streamer/0.2')
                    chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                    done()

                })

        });

        it('曝光参数设置 @name{exp}@value{50}@required{ true} ', (done) => {
            request(ArmServer)
                .get('/camera?exp=50')
                .expect(200)
                .end((err, res) => {
                    //  console.log('res3',)
                    chaiExpect(res.headers.server).to.be.equal('MJPG-Streamer/0.2')
                    chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                    done()
                })
        });

        it('曝光参数设置 @name{exp}@value{100}@required{ true}', (done) => {
            request(ArmServer)
                .get('/camera?exp=100')
                .expect(200)
                .end((err, res) => {
                    //  console.log('res3',)
                    chaiExpect(res.headers.server).to.be.equal('MJPG-Streamer/0.2')
                    chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                    done()

                })

        });

        it('曝光参数设置 @name{101} exp', (done) => {
            request(ArmServer)
                .get('/camera?exp=101')
                .expect(200)
                .end((err, res) => {
                    //  console.log('res3',)
                    chaiExpect(res.headers.server).to.be.equal('MJPG-Streamer/0.2')
                    chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                    done()
                })
        });


    });


    describe('曝光获取 API', () => {

        it(' 获取曝光模式、曝光值 @name{action}@value{exp}  ',  (done) => {

            request(ArmServer).get('/camera?action=exp')
                .expect(200)
                .end(function (err,res){                          
                     // console.log('res',res.text,typeof(( res.text)))
                 chaiExpect(res.text).to.be.an('string')     
                // chaiExpect(JSON.parse( res.text)).to.equal({ mode: 'manual',exp: '101' })
                chaiExpect(JSON.parse(res.text)).to.have.property('mode','manual')  
                chaiExpect(JSON.parse(res.text)).to.have.property('exp','101')     


                 done()                          
            })
                

        });


        it('获取曝光模式、曝光值 @name{action}@value{null}', (done) => {

            request(ArmServer)
            .get('/camera?action=')
            .expect(200)
            .end((err,res)=>{
                
                chaiExpect(res.text).to.be.an('string')
                chaiExpect(res.text).to.be.equal('invalid request')

                done()

            })
            
        });

        it('获取曝光模式、曝光值 @name{action}@value{@!#$%^&*()}', (done) => {

            request(ArmServer)
            .get('/camera?action=@!#$%^&*()}')
            .expect(200)
            .end((err,res)=>{
                //console.log('ss',res.text)
                
                chaiExpect(res.text).to.be.an('string')
                chaiExpect(res.text).to.be.equal('invalid request')

                done()

            })
            
        });


        it('获取曝光模式、曝光值 @name{action}@value{exp}', (done) => {

            request(ArmServer)
            .get('/camera?action= exp')
            .expect(200)
            .end((err,res)=>{
                //console.log('ss2',res.text)
                
                chaiExpect(res.text).to.be.an('string')
                chaiExpect(res.text).to.be.equal('invalid request')

                done()

            })
            
        });



    });


    describe('RCUT设置 ', () => {

        it('RCUT设置 @name{ircut}@value{0}', (done) => {

            request(ArmServer)
            .get('/camera?ircut=0')
            .expect(200)
            .end((err,res)=>{

              //  console.log('xxx',JSON.parse( res.text),'yyyy',Object.prototype.toString.call( res.text))

            chaiExpect(JSON.parse( res.text).result).to.equal('ok')
                done()
            })
        });


        it('RCUT设置 @name{ircut}@value{1}', (done) => {

            request(ArmServer)
            .get('/camera?ircut=1')
            .expect(200)
            .end((err,res)=>{

              //  console.log('xxx',JSON.parse( res.text),'yyyy',Object.prototype.toString.call( res.text))

            chaiExpect(JSON.parse( res.text).result).to.equal('ok')
                done()
            })
        });



        it('RCUT设置 @name{ircut}@value{AabBcC}', (done) => {

            request(ArmServer)
            .get('/camera?ircut=AabBcC')
            .expect(200)
            .end((err,res)=>{

                //console.log('xxx',JSON.parse( res.text),'yyyy',Object.prototype.toString.call( res.text))

            chaiExpect(JSON.parse( res.text).result).to.equal('ok')
                done()
            })
        });


        it('RCUT设置 @name{ircut}@value{1.1}', (done) => {

            request(ArmServer)
            .get('/camera?ircut=1.1')
            .expect(200)
            .end((err,res)=>{

             //   console.log('xxx',JSON.parse( res),'yyyy',Object.prototype.toString.call( res))

            chaiExpect(JSON.parse( res.text).result).to.equal('ok')
                done()
            })
        });

        it('RCUT设置 @name{ircut}@value{-1}', (done) => {

            request(ArmServer)
            .get('/camera?ircut=-1')
            .expect(200)
            .end((err,res)=>{

              //  console.log('xxx',JSON.parse( res),'yyyy',Object.prototype.toString.call( res))

            chaiExpect(JSON.parse( res.text).result).to.equal('ok')
                done()
            })
        });

        
    });



    describe(' 摄像头测距 err---{"error":"failed"}', () => {


        it('摄像头测距 @name{focus}@value{x,y,width,height}', (done) => {

            request(ArmServer)
            .get('/camera?focus=50.02,50.02,200,200')
            .expect(200)
            .end((err,res)=>{

                //console.log('res',res)

                done()

            })
            
        });
        


        
    });


    describe.skip('预览 --err TypeError: this._parser.write is not a function', () => {


        it('预览', () => {

            request(ArmServer)
            .get('/live')
            .expect(200)
            .end((err,res)=>{
                //console.log(`res:${res}`)
            })

            
        });
        
    });


   
    

})









// describe('测试index.js',()=> {
//     before(()=>console.info("在本区块的所有测试用例之前执行"))

//     after(()=>console.info("在本区块的所有测试用例之后执行"))

//     beforeEach(()=>console.info("在本区块的每个测试用例之前执行"))

//     afterEach(()=>console.info("在本区块的每个测试用例之后执行"))

//     describe('测试addNum函数', ()=> {
//       it('两数相加结果为两个数字的和', ()=> {
//         assert.equal(addNum(1,2),3)
//       })
//     })
//   })