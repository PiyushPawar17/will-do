import mongoose from 'mongoose';

import type { ConnectionStates } from 'mongoose';

const connection = {} as { isConnected: ConnectionStates }; /* Creating connection object*/

export async function dbConnect() {
	/* Check if we have connection to our databse*/
	if (connection.isConnected) {
		return;
	}

	/* Connecting to our database */
	const db = await mongoose.connect(process.env.MONGODB_URI as string);

	connection.isConnected = db.connections[0].readyState;
}
