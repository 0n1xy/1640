import { Request, Response } from "express";

import submissionModel from "../models/submissionModel";
import facultyModel from "../models/facultyModel";
import contributionsModel from "../models/contributionsModel";



export const displayReport = async (req: Request, res: Response) => {
    try {
        const contributionID  = contributionsModel.findOne(req.params);

        if (!contributionID) {
            return res.status(400).json({ message: "Contribution ID is required." });
        }

        const id = req.params.contributionID;
        console.log(id)
        const facultySubmissions = await submissionModel.aggregate([
            {
                $match: { contributionID: id }
            },
            {
                $group: {
                    _id: "$facultyID",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "faculties",
                    localField: "_id",
                    foreignField: "_id",
                    as: "faculty"
                }
            },
            {
                $unwind: "$faculty"
            },
            {
                $project: {
                    _id: 0,
                    facultyName: "$faculty.facultyName",
                    submissionCount: "$count"
                }
            },
            {
                $group: {
                    _id: null,
                    totalSubmissions: { $sum: "$submissionCount" },
                    facultyData: { $push: "$$ROOT" }
                }
            }
        ]);

        if (facultySubmissions.length > 0) {
            const data = facultySubmissions[0].facultyData;
            
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ message: "No data found for the specified contribution ID." });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};