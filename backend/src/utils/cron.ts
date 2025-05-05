import workerHistory from "../model/workerHistory";

export const cronJob = async () => {
    try {
        const now = new Date();

        await workerHistory.updateMany(
            { 'activities.start': { $lt: now } },
            {
                $set: {
                    'activities.$[elem].status': 'Active'
                }
            },
            {
                arrayFilters: [
                    { 'elem.start': { $lt: now }, 'elem.status': 'Pending' }
                ]
            }
        );

        await workerHistory.updateMany(
            { 'activities.end': { $lt: now } },
            {
                $set: {
                    'activities.$[elem].status': 'Returned'
                }
            },
            {
                arrayFilters: [
                    { 'elem.end': { $lt: now }, 'elem.status': 'Active' }
                ]
            }
        );

    } catch (error: any) {
        console.log(error.message)
    }
}