const request = require('supertest')
const chaiExpect = require('chai').expect;
const fs = require('fs')
const netServer = 'http://10.0.0.180:8080'
//加工服务

describe.skip('加工服务：8080 ',function(){

    describe('发送单条指令', () =>{
        

        it('发送正确指令',function (done) {
            request(netServer)
            .post('/cnc/cmd?cmd=G1 X200 Y40')
            //.send({cmd:'G1 X200 Y40'})
            .expect(200)
            .end(function (err, res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            })
        });

        it('发送指令为空{cmd}',function (done) {
            request(netServer)
            .post('/cnc/cmd?cmd=')
            //.send({cmd:''})
            .expect(200)
            .end(function (err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('failed')
                done()
            })
        });

        it('发送错误指令{@#！123}',function (done) {
            request(netServer)
            .post('/cnc/cmd?cmd=@#！123')
            //.send({cmd:'@#！123'})
            .expect(200)
            .end(function (err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            })
        });

        it('发送超出画布大小的指令{cmd=G1 X10000 Y500}',function (done) {
            request(netServer)
            .post('/cnc/cmd?cmd=G1 X10000 Y500')
            //.send({cmd:'G1 X10000 Y500'})
            .expect(200)
            .end(function (err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            })
        });

        it('发送G0的指令',function (done) {
            request(netServer)
            .post('/cnc/cmd?cmd=G0 X10000 Y500')
            .expect(200)
            .end(function (err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            })
        });

        it('发送坐标为0的指令{cmd=G1 X0 Y0}',function (done) {
            request(netServer)
            .post('/cnc/cmd?cmd=G1 X0 Y0')
            //.send({cmd:'G1 X0 Y0'})
            .expect(200)
            .end(function (err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            })
        });

        it('发送坐标为负数的指令cmd=G1 X-10 Y-10',function (done) {
            request(netServer)
            .post('/cnc/cmd?cmd=G1 X-10 Y-10')
            //G1 X-10 Y-10.send({cmd:'G1 X-10 Y-10'})
            .expect(200)
            .end(function (err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            })
        });
    });

    describe('加工服务', () =>{
        describe('发送文件API',function(){
            let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
            let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
            //console.log(re.size)
            
            
            
            
            it('发送不压缩文件/data@name{action,zip}@value{upload,false}',function(done){
                //let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //console.log(re.size)
                request(netServer)
                .post('/cnc/data?action=upload&&zip=false')
                .set("Content-Type",'application/octet-stream')
                .set('Content-Length',re.size)
                .send(rs)
                .expect(200)
                .end((err,res)=>{
                    chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                    //console.log(res.text)
                    done()
                })
            });

            it('发送压缩文件/data@name{action,zip}@value{upload,true}',function(done){
                //let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //console.log(re.size)
                let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
                let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
                //console.log(re.size)
                request(netServer)
                .post('/cnc/data?action=upload&&zip=true')
                .set("Content-Type",'application/octet-stream')
                .set('Content-Length',re.size)
                .send(rs)
                .expect(200)
                .end((err,res)=>{
                    chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                    //console.log(res.text)
                    done()
                })
            });

            it('发送空文件/data@name{action,zip}@value{upload,false}',function(done){
                //let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //console.log(re.size)
                let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/data2.txt')
                let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/data2.txt')
               // console.log(re.size)
                request(netServer)
                .post('/cnc/data?action=upload&&zip=false')
                .set("Content-Type",'application/octet-stream')
                .set('Content-Length',re.size)
                .send(rs)
                .expect(200)
                .end((err,res)=>{
                    chaiExpect(JSON.parse(res.text).result).to.equal('failed')
                    //console.log(res.text)
                    done()
                })
            });

            it('发送不压缩文件/data@name{action,zip}@value{upload,true}',function(done){
                //let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //console.log(re.size)
                let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //console.log(re.size)
                request(netServer)
                .post('/cnc/data?action=upload&&zip=true')
                .set("Content-Type",'application/octet-stream')
                .set('Content-Length',re.size)
                .send(rs)
                .expect(200)
                .end((err,res)=>{
                    chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                    //console.log(res.text)
                    done()
                })
            });

            it('发送压缩文件/data@name{action,zip}@value{upload,false}',function(done){
                //let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/data1.txt')
                //console.log(re.size)
                let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
                let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
                //console.log(re.size)
                request(netServer)
                .post('/cnc/data?action=upload&&zip=false')
                .set("Content-Type",'application/octet-stream')
                .set('Content-Length',re.size)
                .send(rs)
                .expect(200)
                .end((err,res)=>{
                    chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                    //console.log(res.text)
                    done()
                })
            });



        });
        






    });

    describe('开始API', () =>{
        
        it("开始/data@name{action}@value{start}",function(done){
            request(netServer)
            .post("/cnc/data?action=start")
            //.send({action:"start"})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            })
        });

        it("开始/data@name{action}@value{}",function(done){
            request(netServer)
            .post("/cnc/data?action=")
            //.send({action:"start"})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(res.text).to.be.equal('invalid request')
                done()
            })
        });

        it("开始/data@name{action}@value{@1#W}",function(done){
            request(netServer)
            .post("/cnc/data?action=@1#W")
            //.send({action:"start"})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('failed')
                done()
            })
        });

    
    });

    describe('暂停API', () =>{
        
        it("暂停/data@name{action}@value{pause}",function(done){
            request(netServer)
            .post("/cnc/data?action=pause")
            //.send({action:"pause"})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            })
        });

        it("暂停/data@name{action}@value{} ",function(done){
            request(netServer)
            .post("/cnc/data?action=")
            //.send({action:"pause"})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                //console.log(res.text)
                chaiExpect(res.text).to.be.equal('invalid request')
                done()
            })
        });

        it("暂停/data@name{action}@value{@#QW!} ",function(done){
            request(netServer)
            .post("/cnc/data?action=@#QW!")
            //.send({action:"pause"})
            //.attach()
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('failed')
                done()
            })
        });
    });

    describe('停止API', () =>{

        it("/data@name{action}@value{stop}",function(done){
            request(netServer)
            .post("/cnc/data?action=stop")
            //.send({action:"stop"})
            //.attach()
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            })
        });

        it("停止/data@name{action}@value{} ",function(done){
            request(netServer)
            .post("/cnc/data?action=")
            //.send({action:"stop"})
            //.attach()
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(res.text).to.be.equal('invalid request')
                done()
            })
        });

        it("停止/data@name{action}@value{@#123} ",function(done){
            request(netServer)
            .post("/cnc/data?action=@#123")
            //.send({action:"stop"})
            //.attach()
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('failed')
                done()
            })
        });
    });


    describe('加工进度 API',function(){
//
        it('/data@name{query}@value{progress}&',function(done){
            request(netServer)
            .get('/cnc/data?query=progress')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                //console.log(res,res.type,res.text)
                chaiExpect(JSON.parse(res.text).progress).to.be.an('string')
                done()
            });

        });

        it('/data@name{query}@value{}',function(done){
            request(netServer)
            .get('/cnc/data?query=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('invalid request')
                done()
            });

        });

        it('/data@name{query}@value{AABBCC}',function(done){
            request(netServer)
            .get('/cnc/data?query=AABBCC')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('failed')
                done()
            });

        });





    });

    describe('设置官方材料API ',function(){

        it('/data@name{official_material}@value{1}',function(done){
            request(netServer)
            .get('/cnc/data?official_material=1')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                done()
            });
        });
        it('/data@name{official_material}@value{0}',function(done){
            request(netServer)
            .get('/cnc/data?official_material=0')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                done()
            });
        });

        it('/data@name{official_material}@value{2}',function(done){
            request(netServer)
            .get('/cnc/data?official_material=2')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('invalid request')
                done()
            });
        });

        it('/data@name{official_material}@value{-1}',function(done){
            request(netServer)
            .get('/cnc/data?official_material=-1')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('invalid request')
                done()
            });
        });

        it('/data@name{official_material}@value{aaa}',function(done){
            request(netServer)
            .get('/cnc/data?official_material=aaa')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('invalid request')
                done()
            });
        });

        it('/data@name{official_material}@value{0.1}',function(done){
            request(netServer)
            .get('/cnc/data?official_material=0.1')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('invalid request')
                done()
            });
        });


        




    });


    describe('文件上传API',function(){

        it('/file@{action}@value{upload}@{filename}@value{a}',function(done){
            let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            request(netServer)
            .post('/file?action=upload&filename=a')
            .set("Content-Type",'application/octet-stream')
            .set('Content-Length',re.size)
            .send(rs)
            .expect(200)
            .end((err,res)=>{
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                //console.log(res.text)
                done()
            });

        });

        it('/file@{action}@value{}@{filename}@value{a}',function(done){
            let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            request(netServer)
            .post('/file?action=&filename=a')
            .set("Content-Type",'application/octet-stream')
            .set('Content-Length',re.size)
            .send(rs)
            .expect(200)
            .end((err,res)=>{
                chaiExpect(JSON.parse(res.text).result).to.equal('failed')
                //console.log(res.text)
                done()
            });

        });

        it('/file@{action}@value{AAbbCC}@{filename}@value{a}',function(done){
            let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            request(netServer)
            .post('/file?action=AAbbCC&filename=a')
            .set("Content-Type",'application/octet-stream')
            .set('Content-Length',re.size)
            .send(rs)
            .expect(200)
            .end((err,res)=>{
                chaiExpect(JSON.parse(res.text).result).to.equal('failed')
                //console.log(res.text)
                done()
            });

        });

        it('/file@{action}@value{upload}@{filename}@value{}',function(done){
            let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            request(netServer)
            .post('/file?action=upload&filename=')
            .set("Content-Type",'application/octet-stream')
            .set('Content-Length',re.size)
            .send(rs)
            .expect(200)
            .end((err,res)=>{
                chaiExpect(JSON.parse(res.text).result).to.equal('failed')
                //console.log(res.text)
                done()
            });

        });

        it('/file@{action}@value{upload}@{filename}@value{@#$!}',function(done){
            let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            request(netServer)
            .post('/file?action=upload&filename=@#$!')
            .set("Content-Type",'application/octet-stream')
            .set('Content-Length',re.size)
            .send(rs)
            .expect(200)
            .end((err,res)=>{
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                //console.log(res.text)
                done()
            });

        });


        it('/file@{action}@value{upload}@{filename}@value{a}@no sendfile',function(done){
            let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            request(netServer)
            .post('/file?action=upload&filename=@#$!')
            .set("Content-Type",'application/octet-stream')
            .set('Content-Length',re.size)
            //.send(rs)
            .expect(200)
            .end((err,res)=>{
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                //console.log(res.text)
                done()
            });

        });

        
        




    });

    describe.skip('文件下载api',function(){
            let rs = fs.readFileSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            let re = fs.statSync('D:/apitest/LaserboxApiTest-master/data/total.zip')
            request(netServer)
            .post('/file?action=upload&filename=a')
            .set("Content-Type",'application/octet-stream')
            .set('Content-Length',re.size)
            .send(rs)
        //需要知道服务器上有的文件名称

        it('文件下载/file@action{download}@filename{a}not existfile',function(done){
            
            request(netServer)

            .get('/file?action=download&filename=a')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                done()

            });
        });


        it('文件下载/file@action{download}@filename{}not existfile',function(done){
            
            request(netServer)
            .get('/file?action=download&filename=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('failed')
                done()

            });
        });













    });

    describe("机器模式API",function(){
        it('设置模式/mode@name{mode}@value{badge}',function(done){
            request(netServer)
            .get('/mode?mode=badge')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                done()
            });
        });

        it('设置模式/mode@name{mode}@value{normal}',function(done){
            request(netServer)
            .get('/mode?mode=normal')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                done()
            });
        });

        it('设置模式/mode@name{mode}@value{}',function(done){
            request(netServer)
            .get('/mode?mode=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('failed')
                done()
            });
        });

        it('设置模式/mode@name{mode}@value{AABBCC}',function(done){
            request(netServer)
            .get('/mode?mode=AABBCC')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('failed')
                done()
            });
        });

        it('获取模式/getmode',function(done){
            request(netServer)
            .get('/getmode')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.exist
                done()
            });

        });

        it('获取机器类型/getmachinetype',function(done){
            request(netServer)
            .get('/getmachinetype')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('MLP-XNSM-DDSX-PPLV-DXF0')
                done()
            });

        });



    });

    describe('设置机器类型API',function(){

        it('/setmachinetype@type{normal}@pwd=',function(done){
            request(netServer)
            .get('/setmachinetype?type=normal&pwd=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('pwd empty')
                done()
            });
        });

        it('/setmachinetype@type{normal}@pwd=31位',function(done){
            request(netServer)
            .get('/setmachinetype?type=normal&pwd=7e24225bba49cb5edd4cbb1bd2ddb7e')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('pwd length error')
                done()
            });
        });

        it('/setmachinetype@type{normal}@pwd=32位',function(done){
            request(netServer)
            .get('/setmachinetype?type=normal&pwd=7e24225bba49cb5edd4cbb1bd2ddb7ef')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                done()
            });
        });

        it('/setmachinetype@type{normal}@pwd=33位',function(done){
            request(netServer)
            .get('/setmachinetype?type=normal&pwd=7e24225bba49cb5edd4cbb1bd2ddb7eff')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                done()
            });
        });

        it('/setmachinetype@type{education}@pwd=32位',function(done){
            request(netServer)
            .get('/setmachinetype?type=education&pwd=7e24225bba49cb5edd4cbb1bd2ddb7ef')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(JSON.parse(res.text).result).to.equal('ok')
                done()
            });
        });
        it('/setmachinetype@type{}@pwd=32位',function(done){
            request(netServer)
            .get('/setmachinetype?type=&pwd=7e24225bba49cb5edd4cbb1bd2ddb7ef')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('invalid request')
                done()
            });
        });
        
        it('/setmachinetype@type{AAbbCC}@pwd=32位',function(done){
            request(netServer)
            .get('/setmachinetype?type=AAbbCC&pwd=7e24225bba49cb5edd4cbb1bd2ddb7ef')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExpect(res.text).to.equal('invalid request')
                done()
            });
        });



    })













})