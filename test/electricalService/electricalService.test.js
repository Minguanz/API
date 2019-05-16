const request = require('supertest')
const chaiExcept = require('chai').expect
const netService = 'http://10.0.0.180:8080'

describe.skip('电气服务API done',function(){

    describe('LED API done',function(){

        it('/lightness@{brightness}@value{0}',function(done){

            request(netService)
            .get('cnc/light?brightness=0')
            //.send({brightness:0})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            });

        });

        it('/lightness@{brightness}@value{100}',function(done){

            request(netService)
            .get('cnc/light?brightness=100')
            //.send({brightness:0})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            });

        });

        it('/lightness@{brightness}@value{101}',function(done){

            request(netService)
            .get('cnc/light?brightness=101')
            //.send({brightness:0})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            });

        });
        it('/lightness@{brightness}@value{-1}',function(done){

            request(netService)
            .get('cnc/light?brightness=-1')
            //.send({brightness:0})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            });

        });

        it('/lightness@{brightness}@value{30}',function(done){

            request(netService)
            .get('cnc/light?brightness=30')
            //.send({brightness:0})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            });

        });

        it('/lightness@{brightness}@value{1.1}',function(done){

            request(netService)
            .get('cnc/light?brightness=1.1')
            //.send({brightness:0})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            });

        });

        it('/lightness@{brightness}@value{AABBCC}',function(done){

            request(netService)
            .get('cnc/light?brightness=AABBCC')
            //.send({brightness:0})
            .expect(200)
            .end(function(err,res) {
                if (err) return err
                // console.log('body2',res.text,res.buffered)
                chaiExpect(JSON.parse(res.text).result).to.be.equal('ok')
                done()
            });

        });



    });

    describe('排气扇API',function(){

        it('/fan@{speed}@value{0}',function(done){
            request(netService)
            .get('/cnc/fan?speed=0')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(JSON.parse(res.text).result).to.equal('ok');
                done()
            });
        });

        it('/fan@{speed}@value{100}',function(done){
            request(netService)
            .get('/cnc/fan?speed=100')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(JSON.parse(res.text).result).to.equal('ok');
                done()
            });
        });

        it('/fan@{speed}@value{101}',function(done){
            request(netService)
            .get('/cnc/fan?speed=101')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(JSON.parse(res.text).result).to.equal('ok');
                done()
            });
        });

        it('/fan@{speed}@value{-1}',function(done){
            request(netService)
            .get('/cnc/fan?speed=-1')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(JSON.parse(res.text).result).to.equal('ok');
                done()
            });
        });
        it('/fan@{speed}@value{30}',function(done){
            request(netService)
            .get('/cnc/fan?speed=30')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(JSON.parse(res.text).result).to.equal('ok');
                done()
            });
        });

        it('/fan@{speed}@value{1.1}',function(done){
            request(netService)
            .get('/cnc/fan?speed=1.1')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(JSON.parse(res.text).result).to.equal('ok');
                done()
            });
        });

        it('/fan@{speed}@value{aabbcc}',function(done){
            request(netService)
            .get('/cnc/fan?speed=aabbcc')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(JSON.parse(res.text).result).to.equal('ok');
                done()
            });
        });
    });

    describe('工作状态API',function(){

        it('/status@{status}',function(done){
            request(netService)
            .get('/cnc/status')
            .end(function(err,res){
                if (err) return err
                chaiExcept(JSON.parse(res.text).CPU_TEMP).to.be.an(Number)
                chaiExcept(JSON.parse(res.text).WATER_TEMP).to.be.an(Number)
                chaiExcept(JSON.parse(res.text).CPU_TEMP).to.be.an(String)
                done()

            });
        });




    });

    describe('/peripherystatus API',function(){

        it('/peripherystatus@name{action}@value{waterline}',function(done){
            request(netService)
            .get('/peripherystatus?action=waterline')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(res.text).to.equal('normal')
            })

        })

        it('/peripherystatus@name{action}@value{laserworktime}',function(done){
            request(netService)
            .get('/peripherystatus?action=laserworktime')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(res.text).to.be.an(Number)
            })

        })

        it('/peripherystatus@name{action}@value{}',function(done){
            request(netService)
            .get('/peripherystatus?action=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(res.text).to.equal('invalid request')
            })

        })


        it('/peripherystatus@name{action}@value{AABBCC}',function(done){
            request(netService)
            .get('/peripherystatus?action=AABBCC')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiExcept(res.text).to.equal('invalid request')
            })

        })







    })





});