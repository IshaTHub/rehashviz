'use server';

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({summaryId}: {summaryId : string}) {
    try {
        const user = await currentUser();  //clerk user
        const sql = await getDbConnection();
        const userId = user?.id;  //user id from clerk
        if (!userId) {
            throw new Error("User not found");
        }
        //remove from db
        const result  = await sql`
            DELETE FROM pdf_summaries
            WHERE id = ${summaryId} AND user_id = ${userId}
            RETURNING id;`

        //revalidatePath , which deletes it from the nextjs cache
        if(result.length > 0) {
            revalidatePath(`/dashboard`);
            return {success: true};
        }
        return {success: false};
        
    } catch (error) {
        console.log("Error deleting summary:", error);
        return{success: false}
    }
}