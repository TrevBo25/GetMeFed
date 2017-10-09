

module.exports = {

    postFave(req, res) {
        const db = req.app.get('db')
        const {type, busid, name, img, notes} = req.body;
        db.check_favorite([name, req.user.auth_id])
        .then (response => {
            if(response.length != 0){
                res.send('already favorite')
            } else {
                db.post_favorite([req.user.auth_id, type, busid, name, img, notes])
                .then( response =>{
                    res.status(200)
                }).catch(err => console.log("err", err))
            }
        }).catch( err => console.log('err' , err))
    },

    getFaves(req, res) {
        const db = req.app.get('db')
        db.get_favorites([req.user.auth_id])
        .then( response => {
            res.status(200).send(response)
        }).catch(err => console.log("err", err))
    },

    getFavesRec(req, res) {
        const db = req.app.get('db')
        db.get_favorites_rec([req.user.auth_id])
        .then( response => {
            res.status(200).send(response)
        }).catch(err => console.log("err", err))
    },

    getFavesRes(req, res) {
        const db = req.app.get('db')
        db.get_favorites_res([req.user.auth_id])
        .then( response => {
            res.status(200).send(response)
        }).catch(err => console.log("err", err))
    },

    deleteFave(req, res) {
        const db = req.app.get('db')
        const {name} = req.body;
        db.delete_favorite([name, req.user.auth_id])
        .then(response => {
            res.status(200)
        }).catch( err => console.log('err', err))
    },
    
    editNote(req, res) {
        const db = req.app.get('db')
    }
}