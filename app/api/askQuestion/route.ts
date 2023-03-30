import { NextApiRequest, NextApiResponse } from "next";


export async function GET(request: NextApiRequest, response: NextApiResponse) {
    console.log(request)
    return response.status(200).json({teste: "testado"});
}