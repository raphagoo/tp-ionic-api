import mongoose from 'mongoose';
import { RaceSchema } from "../models/raceModel.js";
import { verifyJwt } from '../services/jwtVerification.js';
const Race = mongoose.model('Race', RaceSchema);

export const createRace = (req, res) => {
    if(verifyJwt(req) === true){
        let newRace = new Race(req.body);
        newRace.save((err, race) => {
            if(err) {
                res.status(400).send(err);
            } else {
                res.status(201).json(race);
            }
        })
    }
    else{
        res.sendStatus(403);
    }
};

export const listRaces = (req, res) => {
    Race.find({})
    .exec((err, races) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(races)
        }
    });
};

export const getRace = (req, res) => {
    Race.findById(req.params.id)
    .exec((err, race) => {
        if(err) {
            res.status(400).send(err);
        } else if(race == null) {
            res.sendStatus(404)
        } else {
            res.status(200).json(race)
        }
    });
};

export const updateRace = (req, res) => {
    Race.findOneAndUpdate({"_id": req.params.id}, req.body, {new: true, useFindAndModify: false})
    .exec((err, race) => {
        if(err) {
            res.status(400).send(err);
        } else {
            if(race == null) {
                res.sendStatus(404);
            }
            else {
                res.status(200).json(race);
            }
        }
    });
};

export const deleteRace = (req, res) => {
    Race.findOneAndDelete({"_id": req.params.id}, (err, race) => {
        if(err) {
            res.status(400).send(err);
        } else {
            if(race == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(204);
            }
        }
    });
};
