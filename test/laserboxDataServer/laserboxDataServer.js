const request = require('supertest')
const chaiEcept = require('chai').expect
const netServer = 'http://10.0.0.180:8080'
const fs = require('fs')


describe.skip('版本与升级服务',function(){

    describe('获取版本信息API',function(){

        it('/system@name{action}@value{version}',function(done){
            request(netServer)
            .get('/system?action=version')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.exist;
                chaiEcept(res.text).match(/''/)
                done()
            })
        });

        it('/system@name{action}@value{}',function(done){
            request(netServer)
            .get('/system?action=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.exist;
                chaiEcept(res.text).match(/'invalid request'/)
                done()
            })
        });

        it('/system@name{action}@value{AABBCC}',function(done){
            request(netServer)
            .get('/system?action=AABBCC')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.exist;
                chaiEcept(res.text).match(/'invalid request'/)
                done()
            })
        });
    



    });

    describe.only('获取校正文件MD5',function(){


        it('/system@name{action}@value{camera}',function(done){
            request(netServer)
            .get('/system?action=camera')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.be.a('string')
            })
        });

        it('/system@name{action}@value{}',function(done){
            request(netServer)
            .get('/system?action=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).match(/'invalid request'/)
            })
        });

        it('/system@name{action}@value{AABBCC}',function(done){
            request(netServer)
            .get('/system?action=AABBCC')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.exist;
                chaiEcept(res.text).match(/'invalid request'/)
                done()
            })
        });

        



    })

    describe('获取eth0 mac地址',function(){

        it('/system@name{action}@value{mac}',function(done){
            request(netServer)
            .get('/system?action=mac')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.equal('mac地址')//mac地址
                done()
            })
        });

        it('/system@name{action}@value{}',function(done){
            request(netServer)
            .get('/system?action=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.match(/''/)
                done()
            })
        });

        it('/system@name{action}@value{AAA}',function(done){
            request(netServer)
            .get('/system?action=AAA')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.match(/''/)
                done()
            })
        });
    });

    describe('设置设备名',function(){

        it('/system@name{action}@value{set_dev_name}@body{laserbox}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('laserbox')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.equal('laserbox')
                done()
            })
        });

        it('/system@name{action}@value{set_dev_name}@body{laserbox_01}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('laserbox_01')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.equal('laserbox_01')
                done()
            })
        });

        it('/system@name{action}@value{set_dev_name}@body{01_01}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('01_01')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.equal('01_01')
                done()
            })
        });

        it('/system@name{action}@value{set_dev_name}@body{激光宝盒——01}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('激光宝盒——01')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.equal('激光宝盒——01')
                done()
            })
        });

        it('/system@name{action}@value{set_dev_name}@body{}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('')//name 空
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(JSON.parse(res.text).result).to.equal('failed')
                done()
            })
        });

        it('/system@name{action}@value{set_dev_name}@body{@#￥%&~}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('@#￥%……&~')//name 空
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(JSON.parse(res.text).result).to.equal('failed')
                done()
            })
        });

        it('/system@name{action}@value{set_dev_name}@body{123456789}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('123456789')//name 空
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.equal('123456789')
                done()
            })
        });

        it('/system@name{action}@value{set_dev_name}@body{激光宝盒上位机软件}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('激光宝盒上位机软件')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.equal('激光宝盒上位机软件')
                done()
            })
        });
        
        it('/system@name{action}@value{set_dev_name}@body{激光宝盒上位机软件_abx_001}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('激光宝盒上位机软件_abx_001')//name 空
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.equal('激光宝盒上位机软件_abx_001')
                done()
            })
        });

        it('/system@name{action}@value{set_dev_name}@body{length>30}',function(done){
            request(netServer)
            .post('/system?action=set_dev_name')
            .send('laserbox_01aserbox_01aserbox_01aserbox_01')//name 空
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.equal('laserbox_01aserbox_01aserbox_01aserbox_01')
                done()
            })
        });
        

    });

    describe('获取设备名',function(){

        it('get/system@name{action}@value{get_dev_name}',function(done){
            request(netServer)
            .get('/system?action=get_dev_name')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.exist
                done()
            })
        });

        it('get/system@name{action}@value{}',function(done){
            request(netServer)
            .get('/system?action=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.match(/''/)
                done()
            })
        });

        it('get/system@name{action}@value{AABBCC}',function(done){
            request(netServer)
            .get('/system?action=AABBCC')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.match(/''/)
                done()

            })
        });

    })

    describe('获取当前连接数',function(){

        it('get/system@name{action}@value{get_conn_num}',function(done){
            request(netServer)
            .get('/system?action=get_conn_num')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.exist
                chaiEcept(res.text).to.be.a('num')
                done()
            })
        })

        it('get/system@name{action}@value{}',function(done){
            request(netServer)
            .get('/system?action=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.match(/'invaild required'/)
                done()
            })
        })

        it('get/system@name{action}@value{AADDF}',function(done){
            request(netServer)
            .get('/system?action=AADDF')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.match(/'invaild required'/)
                done()
            })
        });

    })

    describe('取消自动对焦API',function(){

        it('get/system@name{action}@value{cancelautofocus}',function(done){
            request(netServer)
            .get('/system?action=cancelautofocus')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(JSON.parse(res.text).result).to.equal('ok')
                done()

            })
        });

        it('get/system@name{action}@value{}',function(done){
            request(netServer)
            .get('/system?action=')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.match(/'invaild required'/)
                done()

            })
        });

        it('get/system@name{action}@value{CANCEL@#12}',function(done){
            request(netServer)
            .get('/system?action=CANCEL@#12')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.match(/'invaild required'/)
                done()
            })
        });
    });


    describe('获取打印次数API',function(){

        it('get/system@name{action}@value{get_task_number}',function(done){

            request(netServer)
            .get('/system?action=get_task_number')
            .expect(200)
            .end(function(err,res){
                if (err) return err
                chaiEcept(res.text).to.exist

                //console.log(typeof JSON.parse(res.text))
                chaiEcept(JSON.parse(res.text)).to.be.an('object')
                chaiEcept(JSON.parse(res.text)).to.include.keys('offline_finished_number',
                'offline_unfinished_number','online_finished_number','online_unfinished_number',
                'online_official_material_number','online_unofficial_material_number')
                
                //chaiEcept(JSON.parse(res.text)).to.be.an('object')
                done()
            
            })
        });

    })










})
/*
获取机器类型：8080 设备版本

 接口：get /getmachinetype
 参数：
 返回：normal(default)/education
*/
/*
工作时长
 工作状态：8080

 接口：get /peripherystatus?action=laserworktime
 返回：以秒为单位的激光工作总时长

任务数
获取打印任务次数：8080 

 接口：get /system
 参数：action=get_task_number
 返回：
offline_finished_number=x
offline_unfinished_number=x
online_finished_number=x
online_unfinished_number=x
online_official_material_number=x
online_unofficial_material_number=x

示例：http://localhost:8080/system?action=get_task_number

固件版本号：
获取版本信息：8080

 接口：get /system
 参数：action=version
 返回：版本信息
*/

